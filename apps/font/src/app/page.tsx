import Hero from "@/components/hero";
import Posts from "@/components/Posts";
import { FetchPosts } from "@/lib/actions/postAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
type DataType = {
  posts: any;
  totalPosts: number;
};
export default async function Home({searchParams}:Props) {
  const { page } = await searchParams;
  const {posts,totalPost} = await FetchPosts<DataType>({
    page: page ? +page : undefined, 
  })
  const session = await getSession();
  console.log({session})
  return (
    <main>
        <Hero/>
        <Posts 
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPost / DEFAULT_PAGE_SIZE)}  
        />
    </main>
  );
}
