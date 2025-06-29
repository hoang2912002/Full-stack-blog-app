import { IsNumber } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(()=>Int)
  @IsNumber()
  postId: number
  // @Field()
  // @IsString()
  // title: string;
  // @Field()
  // @IsString()
  // content:string;
  // @Field({nullable:true})
  // @Optional()
  // @IsString()
  // thumbnail:string;

  // @Field(()=>[String])
  // @IsString({each:true})
  // //tức là mỗi data của tag bắt buộc phải là string
  // tags: string[]

  // @Field(()=>Boolean)
  // @IsBoolean()
  // published: boolean
}
