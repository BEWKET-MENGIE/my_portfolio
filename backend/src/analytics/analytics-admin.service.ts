import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

const allowedPeriods = [7, 30, 90, 365];

@Injectable()
export class AnalyticsAdminService {
  constructor(private readonly prisma: PrismaService) {}

  private getDays(value?: string) {
    const days = Number(value ?? 30);
    return allowedPeriods.includes(days) ? days : 30;
  }

  async getOverview(value?: string) {
    const days = this.getDays(value);
    const currentStart = this.startOfUtcDay(new Date(), days - 1);
    const previousStart = new Date(currentStart);
    previousStart.setUTCDate(previousStart.getUTCDate() - days);

    const [counter, totalVisitors, periodViews, previousViews, distinctVisitors] =
      await Promise.all([
        this.prisma.viewCounter.findUnique({ where: { id: 1 }, select: { total: true } }),
        this.prisma.visitor.count(),
        this.prisma.pageView.count({ where: { createdAt: { gte: currentStart } } }),
        this.prisma.pageView.count({ where: { createdAt: { gte: previousStart, lt: currentStart } } }),
        this.prisma.pageView.groupBy({
          by: ["visitorId"],
          where: { createdAt: { gte: currentStart } },
        }),
      ]);

    return {
      totalViews: Number(counter?.total ?? 0),
      totalVisitors,
      periodViews,
      periodVisitors: distinctVisitors.length,
      growth: previousViews === 0
        ? 0
        : Number((((periodViews - previousViews) / previousViews) * 100).toFixed(2)),
      periodDays: days,
    };
  }

  async getVisitors(value?: string) {
    const days = this.getDays(value);
    const start = this.startOfUtcDay(new Date(), days - 1);
    const rows = await this.prisma.$queryRaw<
      { date: Date; views: bigint; visitors: bigint }[]
    >`
      SELECT
        DATE_TRUNC('day', "createdAt" AT TIME ZONE 'UTC') AS date,
        COUNT(*) AS views,
        COUNT(DISTINCT "visitorId") AS visitors
      FROM "PageView"
      WHERE "createdAt" >= ${start}
      GROUP BY DATE_TRUNC('day', "createdAt" AT TIME ZONE 'UTC')
      ORDER BY date ASC
    `;

    const byDate = new Map(rows.map((row) => [row.date.toISOString().slice(0, 10), row]));
    return Array.from({ length: days }, (_, offset) => {
      const date = new Date(start);
      date.setUTCDate(date.getUTCDate() + offset);
      const key = date.toISOString().slice(0, 10);
      const row = byDate.get(key);
      return { date: key, views: Number(row?.views ?? 0), visitors: Number(row?.visitors ?? 0) };
    });
  }

  async getTopPages() {
    const rows = await this.prisma.pageView.groupBy({
      by: ["page"],
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
      take: 10,
    });
    return rows.map((row) => ({ page: row.page, views: row._count.page }));
  }

  async getDevices() {
    const rows = await this.prisma.visitor.groupBy({
      by: ["deviceType"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });
    return rows.map((row) => ({ name: row.deviceType ?? "Unknown", visitors: row._count.id }));
  }

  async getBrowsers() {
    const rows = await this.prisma.visitor.groupBy({
      by: ["browser"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });
    return rows.map((row) => ({ name: row.browser ?? "Unknown", visitors: row._count.id }));
  }

  async getCountries() {
    const rows = await this.prisma.visitor.groupBy({
      by: ["country"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });
    return rows.map((row) => ({ name: row.country ?? "Unknown", visitors: row._count.id }));
  }

  async getSources() {
    const rows = await this.prisma.pageView.groupBy({
      by: ["source"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    });
    return rows.map((row) => ({ name: row.source, views: row._count.id }));
  }

  getRecentVisits() {
    return this.prisma.pageView.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      select: {
        page: true,
        source: true,
        createdAt: true,
        visitor: { select: { country: true, deviceType: true, browser: true } },
      },
    });
  }

  private startOfUtcDay(date: Date, daysAgo: number) {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);
    start.setUTCDate(start.getUTCDate() - daysAgo);
    return start;
  }
}
