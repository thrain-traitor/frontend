import { Module } from '@nestjs/common';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
