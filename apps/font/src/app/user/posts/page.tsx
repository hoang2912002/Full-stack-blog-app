import { fetchUserPosts } from "@/lib/actions/postAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import NoPost from "./_components/NoPost";
import PostList from "./_components/PostList";

type Props = {
  searchParams: Promise<{[key: string]:string | string[] | undefined}>
};
const UserPostPage = async (props: Props) => {
  const {page} = await props.searchParams
  const {posts,totalPost} = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE
  })
  return (
    <div className="">
      { (!posts || posts.length <=0) ? 
          <NoPost/> : 
          <PostList
            posts={posts}
            totalPages={Math.ceil(totalPost / DEFAULT_PAGE_SIZE)}
            currentPage={page ? +page : 1}
          />      }
    </div>
  );
};

export default UserPostPage;