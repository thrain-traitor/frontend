import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Profile } from 'src/profiles/profile.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() userData: Partial<User>,
    @Body('profile') profileData: Partial<Profile>,
  ): Promise<User> {
    return this.usersService.create(userData, profileData);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, userData: Partial<User>): Promise<User> {
    return this.update(id, userData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
