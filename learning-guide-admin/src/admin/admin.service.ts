import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  findByUsernameWithPassword(username: string): Promise<Admin | null> {
    return this.adminRepository
      .createQueryBuilder('admin')
      .addSelect('admin.password')
      .where('admin.username = :username', { username })
      .getOne();
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find({ order: { id: 'ASC' } });
  }

  findById(id: number): Promise<Admin | null> {
    return this.adminRepository.findOneBy({ id });
  }
}
