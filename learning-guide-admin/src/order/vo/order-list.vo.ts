export class OrderListItemVo {
  id!: number;
  orderNo!: string | null;
  userId!: number | null;
  userName!: string | null;
  nickName!: string | null;
  courseId!: number | null;
  courseTitle!: string | null;
  pricePaid!: number;
  payStatus!: number | null;
  createTime!: Date | null;
  updateTime!: Date | null;
}

export class OrderListVo {
  code!: number;
  data!: OrderListItemVo[];
  msg!: string;
  total!: number;
}
