"use server"
import {print} from "graphql";
import { authFetchGraphQL, FetchGraphQL } from "../fetchGraphQL"
import { GET_POSTS, GET_POSTS_BY_ID, GET_USER_POSTS } from "../gqlQueries"
import { Post } from "../type/modelTypes";
import { transformTakeSkip } from "../helpers";

export const FetchPosts = async ({page,pageSize}:{page?:number,pageSize?:number}) => {
    const {skip,take} = transformTakeSkip({page,pageSize})
    const data = await FetchGraphQL(print(GET_POSTS),{skip,take})
    return {
       posts: data?.posts as Post[],
       totalPost:data?.postCount
    }
}

export const fetchPostById = async (id:number) => {
    const data = await FetchGraphQL(print(GET_POSTS_BY_ID),{id})
    return data.postById as Post
}

export const fetchUserPosts = async ({
    page,pageSize
}:{
    page:number,
    pageSize:number,
}) => {
    const { skip, take } = transformTakeSkip({ page, pageSize }) as { skip: number; take: number };
    const data = await authFetchGraphQL(print(GET_USER_POSTS), {
        take,
        skip,
    });
    return {
        posts: data?.getUserPosts as Post[],
        totalPost: data?.userPostCount as number
    }
}