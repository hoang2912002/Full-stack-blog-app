"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postAction";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const InterceptorDeletePostPage = (props: Props) => {
  const params = use(props.params);
  //Dùng use bởi vì render ở bên client component nên ko dùng đc async await
  //dùng use vì props.params là 1 promise cho nên dùng use để 
  // pause component rendering cho đến khi Promise hoàn tất  
  const postId = parseInt(params.id);
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Post!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href={"/user/posts"}>Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => deletePost(postId)} variant={"destructive"}>
              <a href="/user/posts?noCache=true">Delete</a>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;