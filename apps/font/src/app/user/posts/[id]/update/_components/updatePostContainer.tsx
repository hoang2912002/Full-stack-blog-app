'use client'
import UpsertPostForm from "@/app/user/create-post/_components/upsertPostForm";
import { updatePost } from "@/lib/actions/postAction";
import { Post } from "@/lib/type/modelTypes";
import { useActionState } from "react";
type Props = {
  post: Post
}
const UpdatePostContainer = ({post}: Props) => {
    const [state,action] = useActionState(updatePost,{data:{
      postId:post.id,
      title: post.title,
      content: post.content,
      tags: post.tags?.map(tag=>tag.name).join(','),
      published: post.published ? "on" : undefined,
      previousThumbnailUrl: post.thumbnail ?? undefined,
      // thumbnail:null
    }})
  return (
    <UpsertPostForm state={state} formAction={action}/>
  );
};

export default UpdatePostContainer;