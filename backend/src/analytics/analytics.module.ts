import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AnalyticsAdminController } from "./analytics-admin.controller";
import { AnalyticsAdminService } from "./analytics-admin.service";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

@Module({
  imports: [PrismaModule],
  controllers: [AnalyticsController, AnalyticsAdminController],
  providers: [AnalyticsService, AnalyticsAdminService],
})
export class AnalyticsModule {}