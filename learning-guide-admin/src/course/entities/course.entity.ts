import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Category } from './category.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'tb_course' })
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'teacher_id', type: 'int', nullable: true })
  teacherId!: number | null;

  @Column({ name: 'category_id', type: 'int', nullable: true })
  categoryId!: number | null;

  @Column({ name: 'subject_id', type: 'int', nullable: true })
  subjectId!: number | null;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  type!: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title!: string | null;

  @Column({ name: 'sub_title', type: 'varchar', length: 255, nullable: true })
  subTitle!: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover!: string | null;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  level!: number | null;

  @Column({ type: 'json', nullable: true })
  tags!: unknown;

  @Column({ type: 'int', nullable: true, default: 0 })
  lessons!: number | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  hours!: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  price!: string | null;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true, default: 1 })
  discount!: string | null;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  status!: number | null;

  @Column({ name: 'create_time', type: 'datetime', nullable: true })
  createTime!: Date | null;

  @Column({ name: 'update_time', type: 'datetime', nullable: true })
  updateTime!: Date | null;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher | null;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;

  @ManyToOne(() => Subject, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject!: Subject | null;
}
