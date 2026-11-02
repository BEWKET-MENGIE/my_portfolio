import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AnalyticsAdminService } from "./analytics-admin.service";

@Controller("analytics/admin")
@UseGuards(JwtAuthGuard)
export class AnalyticsAdminController {
  constructor(private readonly analytics: AnalyticsAdminService) {}

  @Get("overview")
  overview(@Query("days") days?: string) {
    return this.analytics.getOverview(days);
  }

  @Get("visitors")
  visitors(@Query("days") days?: string) {
    return this.analytics.getVisitors(days);
  }

  @Get("pages")
  pages() {
    return this.analytics.getTopPages();
  }

  @Get("devices")
  devices() {
    return this.analytics.getDevices();
  }

  @Get("browsers")
  browsers() {
    return this.analytics.getBrowsers();
  }

  @Get("countries")
  countries() {
    return this.analytics.getCountries();
  }

  @Get("sources")
  sources() {
    return this.analytics.getSources();
  }

  @Get("recent")
  recent() {
    return this.analytics.getRecentVisits();
  }
}