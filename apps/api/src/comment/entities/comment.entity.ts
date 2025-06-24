import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(()=> Int)
  id: number

  //mặc định của field là string nên ko cần callback
  @Field()
  content:string

  @Field(type => Post)
  post: Post

  @Field(type => User)
  author: User

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date
}
