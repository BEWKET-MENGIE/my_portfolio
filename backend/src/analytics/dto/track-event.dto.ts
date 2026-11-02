import { IsIn, IsOptional, IsString, Matches, MaxLength } from "class-validator";

const allowedEvents = [
  "project_click",
  "github_click",
  "linkedin_click",
  "contact_click",
  "contact_submit",
  "view_work_click",
] as const;

export class TrackEventDto {
  @IsString()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  visitorId!: string;

  @IsString()
  @IsIn(allowedEvents)
  eventName!: (typeof allowedEvents)[number];

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @Matches(/^\/(?!\/)[^\s?#]*$/)
  page?: string;
}