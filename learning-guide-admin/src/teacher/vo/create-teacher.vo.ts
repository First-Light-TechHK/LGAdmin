export class CreatedTeacherVo {
  id!: number;
  username!: string | null;
  nickname!: string | null;
  age!: number | null;
  status!: number | null;
  createTime!: Date | null;
  updateTime!: Date | null;
}

export class CreateTeacherVo {
  code!: number;
  data!: CreatedTeacherVo;
  msg!: string;
}
