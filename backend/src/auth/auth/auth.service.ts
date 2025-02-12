import { Injectable } from '@nestjs/common';
import { HashCrypt } from 'src/helpers/HashCrypt';
import { JwtHelper } from 'src/helpers/JwtHelper';
import { User } from 'src/user/user/user.entity';
import { UserService } from 'src/user/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user: User | null = await this.userService.findByEmail(email);
    if (!user || !(await HashCrypt.comparePassword(password, user.password))) {
      throw new Error('Invalid Cerdentials');
    }
    const accessToken = this.jwtHelper.generateToken(user.id);
    return { accessToken };
  }
}
