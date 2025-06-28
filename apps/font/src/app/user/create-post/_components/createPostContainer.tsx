'use client'
import { saveNewPost } from "@/lib/actions/postAction";
import { PropsWithChildren, useActionState } from "react";
import UpsertPostForm from "./upsertPostForm";

type Props = PropsWithChildren;
const CreatePostContainer = (props: Props) => {
    const [state,action] = useActionState(saveNewPost,undefined)
  return (
    <UpsertPostForm state={state} formAction={action}/>
  );
};

export default CreatePostContainer;