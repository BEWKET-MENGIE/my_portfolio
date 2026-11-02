import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; email: string; message: string }) {
    return this.prisma.contactMessage.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      },
      select: { id: true, createdAt: true },
    });
  }

  async list() {
    const [messages, unreadCount] = await this.prisma.$transaction([
      this.prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      this.prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    return { messages, unreadCount };
  }

  async markRead(id: string) {
    const result = await this.prisma.contactMessage.updateMany({
      where: { id },
      data: { isRead: true },
    });
    if (!result.count) throw new NotFoundException("Message not found.");
    return { success: true };
  }

  async delete(id: string) {
    try {
      await this.prisma.contactMessage.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException("Message not found.");
      }
      throw error;
    }
  }
}
