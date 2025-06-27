"use server"
import {print} from "graphql";
import { FetchGraphQL } from "../fetchGraphQL"
import { GET_COMMENT_BY_POST_ID } from "../gqlQueries"
import { CommentEntity } from "../type/modelTypes";

export const getPostComments = async ({
    postId, 
    skip,
    take
}:{
    postId:number,
    skip?:number,
    take?:number
}) => {
    const data = await FetchGraphQL(print(GET_COMMENT_BY_POST_ID),{postId,skip,take})
    return {
       comments: data?.getPostComments as CommentEntity[],
       count:data?.postCommentCount as number
    }
}
