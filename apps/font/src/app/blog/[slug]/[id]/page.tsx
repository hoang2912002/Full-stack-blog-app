import { fetchPostById } from "@/lib/actions/postAction";
import Image from "next/image";
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import Comments from "./_components/comments";
import { getSession } from "@/lib/session";
import Like from "./_components/like";
type Props = {
    //do đang dùng app redirectory lấy data từ url nên
    //cần phải khai báo ở trong params
    //để cho nestjs lấy data
    params:{
        id:string;
    }
};
const PostPage = async ({params}: Props) => {
    const postId = (await params).id
    const post = await fetchPostById(+postId)
    const session = await getSession()
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
  return (
    <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-slate-700">
           {post.title} 
        </h1>
        <p className="text-slate-500 text-sm mb-4">By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}</p>
        <div className="relative w-80 h-60">
            <Image className="rounded-md object-cover" src={post.thumbnail ?? '/no-image.png'} alt={post.title} fill/>
        </div>

        <div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.content)}} />
        <Like postId={post.id} user={session?.user}/>
        <Comments postId={post.id} user={session?.user}/>

    </main>
  );
};

export default PostPage;