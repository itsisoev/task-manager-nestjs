import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class UsersResolver {
  private readonly users: User[] = [
    {
      uuid: uuidv4(),
      username: 'john_doe',
      email: 'john@example.com',
      fullName: 'John Doe',
      createdAt: new Date(),
    },
    {
      uuid: uuidv4(),
      username: 'jane_doe',
      email: 'jane@example.com',
      createdAt: new Date(),
    },
  ];

  @Query(() => [User], { name: 'users' })
  findAll(): User[] {
    return this.users;
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('uuid', { type: () => ID }) uuid: string): User | null {
    return this.users.find((u) => u.uuid === uuid) ?? null;
  }
}
