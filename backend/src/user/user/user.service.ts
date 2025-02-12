import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Profile } from 'src/profile/profile/profile.entity';
import { HashCrypt } from 'src/helpers/HashCrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new Error('Password is required');
    }

    // Hash password
    const hashedPassword = await HashCrypt.hashPassword(userData.password);
    userData.password = hashedPassword;

    const user = this.userRepository.create(userData);
    const savedUser = this.userRepository.save(user);

    // Buat profile secara otomatis
    const profile = this.profileRepository.create({
      first_name: 'anon',
      user_id: (await savedUser).id,
    });

    // Hubungkan profile dengan user
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
