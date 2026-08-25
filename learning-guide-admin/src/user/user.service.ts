import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findPage(query: UserListQueryDto): Promise<User[]> {
    const { pageNum, pageSize } = query;
    return this.userRepository.find({
      order: { id: 'ASC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
  }
}
