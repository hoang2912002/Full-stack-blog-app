'use client'
import { getPostComments } from "@/lib/actions/commentAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import {useQuery} from "@tanstack/react-query"
import { useState } from "react";
import CommentCard from "./commentCard";
import CommentPagination from "./commentPagination";
import CommentCardSkeleton from "./commentCardSkeleton";
import { SessionUser } from "@/lib/session";
import AddComment from "./addComment";
type Props = {
    postId: number,
    user?: SessionUser
};
const Comments = ({postId,user}: Props) => {
    const [page, setPage] = useState(1)
    //useQuery này dùng khi cần fetch data từ server (GET)
    //Cần tự động refetch khi thay đổi param
    // Dữ liệu cần cache theo key queryKey
    //Cần tự động refetch sau thời gian
    const {data, isLoading, refetch} = useQuery({
        //Nếu postId hoặc page thay đổi, query sẽ tự động được refetch.
        //Cách này giúp React Query cache theo từng bài viết và từng trang.
        queryKey: ["GET_POST_COMMENT",postId,page],
        queryFn: async () =>
            await getPostComments({
                postId,
                skip: (page - 1) * DEFAULT_PAGE_SIZE,
                take: DEFAULT_PAGE_SIZE,
            }),
    })
    const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
    return (
        <div className="p-2 rounded-md shadow-md">
            <h6 className="text-lg text-slate-700">Comment</h6>
            {!!user && <AddComment postId={postId} user={user} refetch={refetch}/>}
            <div className="flex flex-col gap-2">
                {data?.comments.map((comment)=>
                    <CommentCard comment={comment} key={comment.id}></CommentCard>
                )}
            </div>
            {
                isLoading 
                ? Array.from({length:12}).map((_,index)=>(
                    <CommentCardSkeleton key={index}/>
                ))
                : <CommentPagination 
                className="p-2" 
                totalPages={totalPages} 
                setCurrentPage={(p)=>setPage(p)} 
                currentPage={page}/>
            }
        </div>
    );
};

export default Comments;