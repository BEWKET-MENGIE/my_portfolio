import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ContactsService } from "./contacts.service";
import { CreateContactDto } from "./create-contact.dto";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contacts: ContactsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async create(@Body() body: CreateContactDto) {
    if (body.hp_confirm) return { success: true };
    const message = await this.contacts.create(body);
    return {
      success: true,
      message: "Message received successfully.",
      id: message.id,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.contacts.list();
  }

  @Patch(":id/read")
  @UseGuards(JwtAuthGuard)
  markRead(@Param("id") id: string) {
    return this.contacts.markRead(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: string) {
    return this.contacts.delete(id);
  }
}
