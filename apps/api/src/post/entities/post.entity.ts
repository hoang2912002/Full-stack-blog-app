import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(()=> Int)
  id: number

  //mặc định của field là string nên ko cần callback
  @Field()
  title:string

  @Field({nullable:true})
  slug?:string

  @Field({nullable:true})
  thumbnail?:string

  @Field()
  content: string

  @Field(type=>Boolean)
  published:boolean

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date

  @Field(type => User)
  author: User
  
  @Field(type => [Tag])
  tags: Tag[]

  @Field(() => [Comment])
  comments: Comment[];
}
