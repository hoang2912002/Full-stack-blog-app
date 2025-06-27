'use client'
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentAction";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/type/modelTypes";
import { cn } from "@/lib/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    postId: number,
    user: SessionUser,
    className?: string,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<{
        comments: CommentEntity[];
        count: number;
    }, Error>>
};
const AddComment = ({postId,user,className,refetch}: Props) => {
    const [state, action] = useActionState(saveComment,undefined)
    const [openDialog,setOpenDialog] = useState(false)
    useEffect(() => {
        if (state?.ok) {
            setOpenDialog(false); // Đóng khi submit thành công
            toast.success("Comment posted successfully!");
            refetch()
        }
        else if (state?.ok === false) {
            toast.error("Failed to post comment.");
        }
    }, [state,refetch]);
    const handleOpenDialog = () => {
        setOpenDialog(prev => !prev)
    }
  return (
    <>
        <Button onClick={()=>handleOpenDialog()}>Leave Your Comment</Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <DialogTrigger asChild={openDialog}>
        </DialogTrigger> */}
        <DialogContent>
            <DialogTitle>Write Your Comment</DialogTitle>
            <form action={action} className={cn(className)}>
            <input hidden name="postId" defaultValue={postId} />
            <Label htmlFor="comment">Your Comment</Label>
            <div className="border-t border-x rounded-t-md">
                <Textarea
                className="border-none active:outline-none focus-visible:ring-0 shadow-none"
                name="content"
                />
                {!!state?.errors?.content && (
                <p className="text-red-500 animate-shake">
                    {state.errors.content}
                </p>
                )}
            </div>
            <p className="border rounded-b-md p-2">
                <span className="text-slate-400">Write as </span>
                <span className="text-slate-700">{user.name}</span>
            </p>
            <SubmitButton className="mt-2">Submit</SubmitButton>
            </form>
        </DialogContent>
        </Dialog>
    </>
  );
};

export default AddComment;