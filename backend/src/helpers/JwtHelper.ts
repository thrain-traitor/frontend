import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelper {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: number): string {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }
}
