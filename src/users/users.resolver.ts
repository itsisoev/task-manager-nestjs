import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('uuid', { type: () => ID }) uuid: string): Promise<User> {
    return this.usersService.findOneUser(uuid);
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('uuid', { type: () => ID }) uuid: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(uuid, input);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('uuid', { type: () => ID }) uuid: string): Promise<boolean> {
    return this.usersService.delete(uuid);
  }
}
