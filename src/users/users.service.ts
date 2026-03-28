import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneUser(uuid: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`Пользователь с UUID ${uuid} не найден`);
    }
    return user;
  }

  async createUser(input: CreateUserInput): Promise<UserEntity> {
    const user = this.usersRepository.create(input);
    return this.usersRepository.save(user);
  }

  async updateUser(uuid: string, input: UpdateUserInput): Promise<UserEntity> {
    const user = await this.findOneUser(uuid);
    Object.assign(user, input);
    return this.usersRepository.save(user);
  }

  async delete(uuid: string): Promise<boolean> {
    const user = await this.findOneUser(uuid);
    await this.usersRepository.remove(user);
    return true;
  }
}
