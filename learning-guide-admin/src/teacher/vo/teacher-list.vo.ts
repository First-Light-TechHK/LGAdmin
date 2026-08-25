import { Teacher } from '../entities/teacher.entity';

export class TeacherListVo {
  code!: number;
  data!: Teacher[];
  msg!: string;
}
