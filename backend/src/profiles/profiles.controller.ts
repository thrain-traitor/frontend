import { Controller, Param, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.entity';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesServices: ProfilesService) {}

  @Put(':user_id')
  update(
    @Param('user_id') id: number,
    profileData: Partial<Profile>,
  ): Promise<Profile> {
    return this.update(id, profileData);
  }
}
