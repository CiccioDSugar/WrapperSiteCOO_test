
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(username: string, email: string, passwordHash: string) {
    const hashed = await bcrypt.hash(passwordHash, 10);

    return this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashed,
      },
    });
  }

  async invalidateRefreshTokens(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    });
  }

  async markEmailVerified(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updatePassword(userId: number, hashed: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashed },
    });
  }

  async findByProvider(provider: string, oauthId: string) {
    return this.prisma.user.findFirst({
      where: { provider, oauthId },
    });
  }

  async linkProvider(userId: number, provider: string, oauthId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { provider, oauthId, emailVerified: true },
    });
  }

  async createOAuthUser( email: string, username: string, oauthId: string, provider: string ) {
    return this.prisma.user.create({
      data: {
        email,
        username,
        oauthId,
        provider,
        emailVerified: true,
      },
    });
  }

  async setup2fa(userId: number, secret: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret, twoFactorEnabled: false },
    });
  }

  async enable2fa(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true },
    });
  }

  async disable2fa(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });
  }
}
