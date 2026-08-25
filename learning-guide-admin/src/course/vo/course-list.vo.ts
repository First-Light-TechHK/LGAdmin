export class CourseListItemVo {
  id!: number;
  teacherId!: number | null;
  teacherName!: string | null;
  categoryId!: number | null;
  categoryName!: string | null;
  subjectId!: number | null;
  subjectName!: string | null;
  type!: number | null;
  title!: string | null;
  description!: string | null;
  cover!: string | null;
  level!: number | null;
  tags!: unknown;
  lessons!: number | null;
  hours!: number | null;
  price!: number;
  discount!: number;
  status!: number | null;
  createTime!: Date | null;
  updateTime!: Date | null;
}

export class CourseListVo {
  code!: number;
  data!: CourseListItemVo[];
  msg!: string;
  total!: number;
}
