import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Request } from "express";
import { AnalyticsService } from "./analytics.service";
import { TrackEventDto } from "./dto/track-event.dto";
import { TrackVisitDto } from "./dto/track-visit.dto";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post("track")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  track(@Body() body: TrackVisitDto, @Req() request: Request) {
    return this.analytics.trackVisit(body, request.headers["user-agent"] ?? "");
  }

  @Post("event")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  trackEvent(@Body() body: TrackEventDto) {
    return this.analytics.trackEvent(body);
  }

  @Get("public")
  publicStats() {
    return this.analytics.getPublicStats();
  }
}