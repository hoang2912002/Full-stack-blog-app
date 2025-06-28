import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { tr } from '@faker-js/faker/.';

@Injectable()
export class PostService {
  constructor(private prisma:PrismaService){

  }
  async findAll(
  {
    skip=0,
    take=DEFAULT_PAGE_SIZE
  }:{
    skip?:number,
    take?:number
  }
  ) {
    return await this.prisma.post.findMany({
      skip,
      take
    });
  }
  async count(){
    return await this.prisma.post.count()
  }

  async findOne(id:number){
    return await this.prisma.post.findFirst({
      where:{
        id
      },
      //gọi relationship
      include:{
        author:true,
        tags:true
      }
    })
  }

  async getUserPosts({
    skip=0,
    take=DEFAULT_PAGE_SIZE,
    userId
  }:{
    skip:number,
    take:number,
    userId:number,
  }){
    return await this.prisma.post.findMany({
      where:{
        authorId:userId
      },
      select:{
        id:true,
        content:true,
        createdAt:true, 
        published:true,
        slug:true,
        title:true,
        thumbnail:true,
        //_count dùng để đếm số lượng theo mỗi bản ghi
        _count:{
          select:{
            comments:true,
            likes:true
          }
        }
      },
      skip,
      take
    })
  }

  userPostCount = async (userId:number) => {
    return await this.prisma.post.count({
      where:{
        authorId:userId
      }
    })
  }

  async createPost(
    {userId,createPostInput}:
    {userId:number,createPostInput:CreatePostInput}) 
  {
    return await this.prisma.post.create({
      data:{
        ...createPostInput,
        author:{
          connect:{
            id:userId
          }
        },
        tags:{
          //connectOrCreate dùng cho relationship n-n
          //kiểm tra xem nếu ko có tag đó thì thêm
          connectOrCreate:createPostInput.tags.map(tag=>({
            where:{name: tag},
            create:{
              name:tag
            }
          }))
        }
      }
    })
  }
}
