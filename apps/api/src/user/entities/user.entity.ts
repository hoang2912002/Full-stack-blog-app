import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(()=> Int)
  id: number

  //mặc định của field là string nên ko cần callback
  @Field()
  name:string

  @Field()
  email:string

  @Field({nullable:true})
  bio?:string

  @Field({nullable:true})
  avatar?: string

  //Post ở đây là mqh nhiều nên để trong []
  //còn mqh 1 nhiều hoặc 1 vs 1 thì bỏ ngoặc
  @Field(type => [Post])
  posts: Post[]

  @Field(type => [Comment])
  comments: Comment[]

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date
}
