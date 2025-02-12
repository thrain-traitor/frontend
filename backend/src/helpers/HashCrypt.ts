import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashCrypt {
  private static readonly saltRounds: number = 10;

  // Fungsi untuk hash password
  static async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }

  // Fungsi untuk menyamakan password
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
