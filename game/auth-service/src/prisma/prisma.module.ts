import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes PrismaService injectable where
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
