import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'tb_orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'order_no', type: 'varchar', length: 100, nullable: true })
  orderNo!: string | null;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId!: number | null;

  @Column({ name: 'course_id', type: 'int', nullable: true })
  courseId!: number | null;

  @Column({ name: 'price_paid', type: 'decimal', precision: 10, scale: 2, nullable: true })
  pricePaid!: string | null;

  @Column({ name: 'pay_status', type: 'tinyint', nullable: true, default: 0 })
  payStatus!: number | null;

  @Column({ name: 'create_time', type: 'datetime', nullable: true })
  createTime!: Date | null;

  @Column({ name: 'update_time', type: 'datetime', nullable: true })
  updateTime!: Date | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;

  @ManyToOne(() => Course, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  course!: Course | null;
}
