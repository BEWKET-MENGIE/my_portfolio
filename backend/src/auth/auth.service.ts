import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./login.dto";
import { RegisterDto } from "./register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(credentials: LoginDto) {
    const email = credentials.email.trim().toLowerCase();
    const admin = await this.prisma.adminUser.findUnique({ where: { email } });

    if (!admin || !(await compare(credentials.password, admin.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    return {
      accessToken: await this.jwt.signAsync({ sub: admin.id, email: admin.email }),
      expiresIn: 28_800,
      email: admin.email,
    };
  }

  async register(credentials: RegisterDto) {
    const email = credentials.email.trim().toLowerCase();

    try {
      await this.prisma.adminUser.create({
        data: {
          email,
          passwordHash: await hash(credentials.password, 12),
        },
        select: { email: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "An admin account with that email already exists.",
        );
      }
      throw error;
    }

    return { success: true, email };
  }
}
