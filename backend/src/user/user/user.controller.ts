import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User | null> {
    return this.userService.update(id, userData);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
