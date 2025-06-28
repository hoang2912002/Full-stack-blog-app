import { z } from "zod";

export const PostFormSchema = z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(20),
    //là chuỗi, ít nhất 1 ký tự
    //refine() thêm điều kiện, cắt chuỗi bằng dấu "," tạo ra mảng tag với điều kiện là ko data rỗng
    tags: z.string().min(1)
    .refine(value=>value.split(",").every(tag=>tag.trim() !==""))
    .transform(value=>value.split(",")),
    thumbnail: z.instanceof(File).optional(),
    //published khi mà được tick thì sẽ truyền value đi bằng "on"
    //transform là biến đổi với điều kiện là value === "on" trả về true
    published: z.string().transform(value=>value === 'on')
})

// db, 