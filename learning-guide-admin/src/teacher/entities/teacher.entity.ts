import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_teacher' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  username!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  password!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nickname!: string | null;

  @Column({ type: 'int', nullable: true, default: 0 })
  age!: number | null;

  @Column({ type: 'tinyint', nullable: true, default: 0 })
  status!: number | null;

  @Column({ name: 'create_time', type: 'datetime', nullable: true })
  createTime!: Date | null;

  @Column({ name: 'update_time', type: 'datetime', nullable: true })
  updateTime!: Date | null;
}
