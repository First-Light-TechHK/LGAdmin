import { User } from '../entities/user.entity';

export class UserListVo {
  code!: number;
  data!: User[];
  msg!: string;
}
