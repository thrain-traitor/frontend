import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User  Not Found');
    return user;
  }

  async updateProfile(
    id: number,
    profileData: Partial<Profile>,
  ): Promise<Profile> {
    const user = await this.findUser(id);
    const profile = user.profile;

    if (!profile) {
      throw new NotFoundException('Profile Not Found');
    }

    // Memperbarui properti profil dengan data baru
    Object.assign(profile, profileData);

    // Menyimpan perubahan ke database
    return await this.profileRepository.save(profile);
  }
}
