import { User } from 'src/user/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ default: 'anon' })
  first_name: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profile_picture?: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
