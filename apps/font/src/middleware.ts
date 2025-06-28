import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request: NextRequest) {
    const session = await getSession()
    if(!session || !session.user)
    return NextResponse.redirect(new URL('/auth/signin',request.url))
}
//Đây là cách để khai báo các đường dẫn nào bắt buộc phải đăng nhập mới được vào
export const config = {
    matcher:"/user/:path*"
}