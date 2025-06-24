import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Tag {
  @Field(()=> Int)
  id: number

  //mặc định của field là string nên ko cần callback
  @Field()
  name:string

  @Field(type => [Post])
  posts: Post[]

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date
}
