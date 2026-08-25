import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CourseListDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNum!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize!: number;
}
