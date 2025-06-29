import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postAction";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{
        id:string
    }>
};
const  DeletePost = async (props: Props) => {
    const postId = (await (props.params)).id
    const post = await fetchPostById(+postId)
    const formAction = async (formData: FormData) => {
        "use server";
        await deletePost(+postId);
        redirect("/user/posts");
    };

  return (
    <Card className="w-96 m-12 px-6 py-12">
        <CardHeader>
            <CardTitle className="flex justify-between items-center font-thin">
                <p className="text-red-500">Delete The Post</p>
                <ExclamationCircleIcon className="w-8 text-red"/>
            </CardTitle>
            <CardDescription>
                 <p>
                    This action cannot be undone. This will permanently delete your post
                    and remove its data from our servers.
                </p>
                <hr className="m-3"/>
                <p className="text-slate-400 font-bold">Title of the Post</p>
                <p>{post.title}</p>
            </CardDescription>
            <CardContent>
                <form action={formAction} className="flex justify-end gap-2">
                    <Button variant={"secondary"} asChild>
                        <Link href={"/user/posts"}>Cancel</Link>
                    </Button>
                    <SubmitButton variant={"destructive"}>Delete</SubmitButton>
                </form>
            </CardContent>
        </CardHeader>
    </Card>
  );
};

export default DeletePost;