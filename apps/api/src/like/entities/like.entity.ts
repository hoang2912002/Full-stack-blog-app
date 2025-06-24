import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Like {
  @Field(()=> Int)
  id: number

  @Field(type =>Post)
  post: Post

  @Field(type => User)
  user: User

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date
}
