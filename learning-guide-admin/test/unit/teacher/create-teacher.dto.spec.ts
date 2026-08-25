import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTeacherDto } from '../../../src/teacher/dto/create-teacher.dto';

describe('CreateTeacherDto', () => {
  const validInput = {
    username: 'jack',
    password: '123',
    nickname: 'Jack',
    age: '28',
    status: '1',
  };

  it('transforms and accepts valid teacher input', async () => {
    const dto = plainToInstance(CreateTeacherDto, validInput);

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.age).toBe(28);
    expect(dto.status).toBe(1);
  });

  it.each([
    { ...validInput, username: '' },
    { ...validInput, password: '' },
    { ...validInput, age: '-1' },
    { ...validInput, age: '151' },
    { ...validInput, status: '2' },
  ])('rejects invalid teacher input: %o', async (input) => {
    const errors = await validate(plainToInstance(CreateTeacherDto, input));
    expect(errors.length).toBeGreaterThan(0);
  });
});
