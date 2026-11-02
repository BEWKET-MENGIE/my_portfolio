import { Controller, Get, Post } from "@nestjs/common";
import { ViewsService } from "./views.service";

@Controller("views")
export class ViewsController {
  constructor(private readonly views: ViewsService) {}

  @Get()
  count() {
    return this.views.count();
  }

  @Post()
  record() {
    return this.views.record();
  }
}
