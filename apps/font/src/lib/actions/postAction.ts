"use server"
import {print} from "graphql";
import { FetchGraphQL } from "../fetchGraphQL"
import { GET_POSTS, GET_POSTS_BY_ID } from "../gqlQueries"
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
    console.log(id)
    return data.postById as Post
}