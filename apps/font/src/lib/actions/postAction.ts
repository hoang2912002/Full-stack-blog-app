"use server"
import {print} from "graphql";
import { authFetchGraphQL, FetchGraphQL } from "../fetchGraphQL"
import { CREATE_POST_MUTATION, GET_POSTS, GET_POSTS_BY_ID, GET_USER_POSTS } from "../gqlQueries"
import { Post } from "../type/modelTypes";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../type/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";

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

export async function saveNewPost(
    state:PostFormState,
    formData:FormData
): Promise<PostFormState> {
    const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))
    if(!validatedFields.success){
        return {
            data: Object.fromEntries(formData.entries()),
            errors:validatedFields.error.flatten().fieldErrors
        }
    }
    //Todo:Upload Thumbnail to supbase
    const thumbnailUrl = ""

    const data = await authFetchGraphQL(print(CREATE_POST_MUTATION),{
        input: {
            ...validatedFields.data,
            thumbnail: thumbnailUrl,
        },
    })
    if(data) return {message:"Success! New Post Saved",ok:true};
    return {
        message:"Oops! Something when wrong",
        ok:false,
        data: Object.fromEntries(formData.entries()),
    }


}