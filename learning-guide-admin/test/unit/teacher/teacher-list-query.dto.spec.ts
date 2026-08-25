import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TeacherListQueryDto } from '../../../src/teacher/dto/teacher-list-query.dto';

describe('TeacherListQueryDto', () => {
  it('transforms valid query strings to numbers', async () => {
    const dto = plainToInstance(TeacherListQueryDto, {
      pageNum: '1',
      pageSize: '10',
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto).toEqual({ pageNum: 1, pageSize: 10 });
  });

  it.each([
    { pageNum: '0', pageSize: '10' },
    { pageNum: '1', pageSize: '0' },
    { pageNum: 'a', pageSize: '10' },
    { pageNum: '1.5', pageSize: '10' },
  ])('rejects invalid pagination: %o', async (input) => {
    const errors = await validate(plainToInstance(TeacherListQueryDto, input));
    expect(errors.length).toBeGreaterThan(0);
  });
});
