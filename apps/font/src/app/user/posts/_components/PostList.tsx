import { Post } from "@/lib/type/modelTypes"
import PostListItem from "./PostListItem";
import Pagination from "@/components/pagination";

type Props = {
    posts: Post[];
    currentPage: number;
    totalPages: number;
}
const PostList = ({posts,currentPage,totalPages}:Props) => {
    return (
        <>
            <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
                <div className="col-span-3">Title</div>
                <div className="d">Date</div>
                <div className="d">Publised</div>
                <div className="d">Likes</div>
                <div className="d">Comments</div>
                <div className="d">Action</div>
            </div>
            {posts.map((post) => (
                <PostListItem post={post} key={post.id} />
            ))}
            <Pagination currentPage={currentPage} totalPages={totalPages} className="my-4" />
        </>
    )
}

export default PostList