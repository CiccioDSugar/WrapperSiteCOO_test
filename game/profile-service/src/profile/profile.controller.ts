import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import type { AuthenticatedRequest } from '@game/auth-shared';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  @Get()
  getProfile(@Req() req: AuthenticatedRequest) {
    return {
      message: 'Profile service OK',
      user: req.user,
    };
  }
}
