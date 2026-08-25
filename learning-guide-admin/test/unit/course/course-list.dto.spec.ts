import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CourseListDto } from '../../../src/course/dto/course-list.dto';

describe('CourseListDto', () => {
  it('transforms valid pagination strings to numbers', async () => {
    const dto = plainToInstance(CourseListDto, {
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
    const errors = await validate(plainToInstance(CourseListDto, input));
    expect(errors.length).toBeGreaterThan(0);
  });
});
