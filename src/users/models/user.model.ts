import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  uuid: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field()
  createdAt: Date;
}
