import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { User } from './users/user.entity';
import { Profile } from './profiles/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ferdi', // Sesuaiin username sama passwordnya
      password: 'ferdi123',
      database: 'db_collab',
      autoLoadEntities: true,
      entities: [User, Profile],
      synchronize: true, // Hanya untuk development
    }),
    UsersModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
