
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return { status: 'ok', message: 'Portfolio API is running successfully' };
  }
}