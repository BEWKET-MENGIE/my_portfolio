import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UAParser } from "ua-parser-js";
import { PrismaService } from "../prisma/prisma.service";
import { TrackEventDto } from "./dto/track-event.dto";
import { TrackVisitDto } from "./dto/track-visit.dto";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async trackVisit(dto: TrackVisitDto, userAgent: string) {
    if (dto.page === "/admin" || dto.page.startsWith("/admin/")) {
      throw new BadRequestException("Admin pages cannot be tracked.");
    }

    const agent = new UAParser(userAgent).getResult();
    const source = this.getSource(dto.referrer);

    return this.prisma.$transaction(async (transaction) => {
      const visitor = await transaction.visitor.upsert({
        where: { visitorId: dto.visitorId },
        create: {
          visitorId: dto.visitorId,
          deviceType: agent.device.type ?? "desktop",
          browser: agent.browser.name ?? "Unknown",
          operatingSystem: agent.os.name ?? "Unknown",
        },
        update: {
          lastSeen: new Date(),
          deviceType: agent.device.type ?? "desktop",
          browser: agent.browser.name ?? "Unknown",
          operatingSystem: agent.os.name ?? "Unknown",
        },
        select: { id: true },
      });

      await transaction.pageView.create({
        data: {
          visitorId: visitor.id,
          page: dto.page,
          referrer: source === "Direct" ? null : source,
          source,
        },
      });

      const counter = await transaction.viewCounter.upsert({
        where: { id: 1 },
        create: { id: 1, total: 1 },
        update: { total: { increment: 1 } },
        select: { total: true },
      });

      return {
        totalViews: Number(counter.total),
        uniqueVisitors: await transaction.visitor.count(),
      };
    });
  }

  async trackEvent(dto: TrackEventDto) {
    const visitor = await this.prisma.visitor.findUnique({
      where: { visitorId: dto.visitorId },
      select: { id: true },
    });
    if (!visitor) throw new NotFoundException("Visitor not found.");

    await this.prisma.visitorEvent.create({
      data: { visitorId: visitor.id, eventName: dto.eventName, page: dto.page },
    });
    return { success: true };
  }

  async getPublicStats() {
    const [counter, uniqueVisitors] = await Promise.all([
      this.prisma.viewCounter.findUnique({
        where: { id: 1 },
        select: { total: true },
      }),
      this.prisma.visitor.count(),
    ]);
    return { totalViews: Number(counter?.total ?? 0), uniqueVisitors };
  }

  private getSource(referrer?: string) {
    if (!referrer) return "Direct";

    try {
      const url = new URL(referrer);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "Unknown";
      const ownHosts = (process.env.FRONTEND_ORIGIN ?? "").split(",").map((origin) => {
        try {
          return new URL(origin.trim()).hostname.toLowerCase();
        } catch {
          return "";
        }
      });
      return ownHosts.includes(url.hostname.toLowerCase())
        ? "Direct"
        : url.hostname.slice(0, 255);
    } catch {
      return "Unknown";
    }
  }
}
