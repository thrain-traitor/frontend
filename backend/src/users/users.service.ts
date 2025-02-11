import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Create user dengan profile
  async create(
    userData: Partial<User>,
    profileData: Partial<Profile>,
  ): Promise<User> {
    const profile = this.profileRepository.create(profileData);
    const savedProfile = await this.profileRepository.save(profile);

    const user = this.userRepository.create(userData);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  // Read All
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  // Find by id
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Upate
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.findOne(id); //Pastikan user ada
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  }

  // Delete
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Pastikan user ada
    await this.userRepository.delete(id);
  }
}
