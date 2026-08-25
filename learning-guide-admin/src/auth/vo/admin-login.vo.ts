export class AdminLoginDataVo {
  id!: number;
  username!: string;
  nickname!: string | null;
  token!: string;
}

export class AdminLoginVo {
  code!: number;
  data!: AdminLoginDataVo;
  msg!: string;
}
