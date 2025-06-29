import { fetchPostById } from "@/lib/actions/postAction";
import UpdatePostContainer from "./_components/updatePostContainer";
type Props = {
    params:{
        id:string;
    }
}
const UpdatePost = async ({params}: Props) => {
    const postId = (await params).id
    const post = await fetchPostById(+postId)
    return (
        <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
        <h2 className="tex-lg text-center font-bold text-slate-700">Create a New Post</h2>
        <UpdatePostContainer post={post}/>
        </div>
    );
};

export default UpdatePost;