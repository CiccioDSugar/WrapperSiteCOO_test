import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    GameModule],
})
export class AppModule {}
