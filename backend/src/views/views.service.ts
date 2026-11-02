import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ViewsService {
  constructor(private readonly prisma: PrismaService) {}

  async count() {
    const counter = await this.prisma.viewCounter.findUnique({
      where: { id: 1 },
      select: { total: true },
    });
    return { total: Number(counter?.total ?? 0) };
  }

  async record() {
    const counter = await this.prisma.viewCounter.upsert({
      where: { id: 1 },
      create: { id: 1, total: 1 },
      update: { total: { increment: 1 } },
      select: { total: true },
    });
    return { total: Number(counter.total) };
  }
}
