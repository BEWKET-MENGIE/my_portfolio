import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./login.dto";

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
}
