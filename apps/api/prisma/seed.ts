import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';
import { title } from "process";
import { max } from "rxjs";

const prisma = new PrismaClient()

function generateSlug(title:string):string{
    return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

async function main() {
    const users = Array.from({length: 10}).map(
        () => ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            bio: faker.lorem.sentence(),
            avatar: faker.image.avatar(),
            password: '123456'
        })
    );      

    await prisma.user.createMany({
        data: users
    })

    const posts = Array.from({length:400}).map(
        () => ({
            title: faker.lorem.sentence(),
            slug: generateSlug(faker.lorem.sentence()),
            content: faker.lorem.paragraphs(3),
            thumbnail: faker.image.urlLoremFlickr(),
            authorId: faker.number.int({min:1,max:10}),
            published: true,
        })
    )

    await Promise.all(posts.map(async(post)=> await prisma.post.create({
        data: {
            ...post,
            //trong quá trình tạo post đồng thời tạo 20 bản ghi liên kết vs post
            //làm như này ko cần phải khai báo foreign key ở comments
            comments:{
                createMany:{
                    data: Array.from({length:20}).map(()=>({
                        content: faker.lorem.sentence(),
                        authorId: faker.number.int({min:1,max:10}),
                    }))
                }
            }
        }
    })))

    console.log("Seeding Completed!")

}
main().then(()=>{
    //chạy xong đóng connect đến prisma
    //trả kết quả 0 success
    prisma.$disconnect();
    process.exit(0)
}).catch(e=>{
    prisma.$disconnect()
    console.log(e)
    process.exit(1)
})