import { IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class TrackVisitDto {
  @IsString()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  visitorId!: string;

  @IsString()
  @MaxLength(300)
  @Matches(/^\/(?!\/)[^\s?#]*$/)
  page!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  referrer?: string;
}