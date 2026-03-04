import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    ProfileModule],
})
export class AppModule {}