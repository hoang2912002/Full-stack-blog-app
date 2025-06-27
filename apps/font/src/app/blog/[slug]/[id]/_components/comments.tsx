'use client'
import { getPostComments } from "@/lib/actions/commentAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import {useQuery} from "@tanstack/react-query"
import { useState } from "react";
type Props = {
    postId: number,
};
const Comments = ({postId}: Props) => {
    const [page, setPage] = useState(0)
    const {data, isLoading} = useQuery({
        queryKey: ["GET_POST_COMMENT",postId,page],
        queryFn: async () => await getPostComments({postId,skip:page * 12,take: DEFAULT_PAGE_SIZE})
    })
  return (
    <div className="p-2 rounded-md shadow-md">
        <h6 className="text-lg text-slate-700">Comment</h6>
        {/* {data?.comments?.map((comment)=>comment.id)} */}
        {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div key={index}>Loading comment...</div>
            ))
            : data?.comments?.map((comment) => (
                <div key={comment.id} className="py-1 border-b">
                <div className="font-bold">{comment.author?.name || "Anonymous"}</div>
                <div>{comment.content}</div>
                </div>
            ))}

            {data?.comments.length === 0 && !isLoading && (
                <div className="text-slate-500">No comments yet</div>
            )}
    </div>
  );
};

export default Comments;