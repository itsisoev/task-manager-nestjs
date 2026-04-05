import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Project {
  @Field(() => ID)
  uuid: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
