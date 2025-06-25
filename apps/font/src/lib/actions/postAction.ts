"use server"
import {print} from "graphql";
import { FetchGraphQL } from "../fetchGraphQL"
import { GET_POSTS } from "../gqlQueries"
import { Post } from "../type/modelTypes";

export const FetchPosts = async () => {
    const data = await FetchGraphQL(print(GET_POSTS))
    return data.posts as Post[]
}