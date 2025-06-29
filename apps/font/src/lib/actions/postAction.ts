"use server"
import {print} from "graphql";
import { authFetchGraphQL, FetchGraphQL } from "../fetchGraphQL"
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POSTS, GET_POSTS_BY_ID, GET_USER_POSTS, UPDATE_POST_MUTATION } from "../gqlQueries"
import { Post } from "../type/modelTypes";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../type/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";
import { uploadThumbnail } from "../upload";

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
    page,pageSize,noCache
}:{
    page:number,
    pageSize:number,
    noCache?:boolean | null,
}) => {
    const { skip, take } = transformTakeSkip({ page, pageSize }) as { skip: number; take: number };
    const fetchOptions = noCache ? { cache: "no-store" } : {};
    const data = await authFetchGraphQL(print(GET_USER_POSTS), {
        take,
        skip,
        fetchOptions
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
    let thumbnailUrl = ""
    if(validatedFields.data.thumbnail){
        thumbnailUrl = await uploadThumbnail(validatedFields?.data?.thumbnail as File)
    }

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

export async function updatePost(
    state:PostFormState,
    formData: FormData
):Promise<PostFormState> {
    const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))
    if(!validatedFields.success){
        return {
            data: Object.fromEntries(formData.entries()),
            errors:validatedFields.error.flatten().fieldErrors
        }
    }
    //Todo: check if thumbnail has been changed
    const {thumbnail,...input} = validatedFields.data;
    let thumbnailUrl = state?.data?.previousThumbnailUrl?.trim() ? state?.data?.previousThumbnailUrl : ""
    if(thumbnail && thumbnail?.size > 0){
        thumbnailUrl = await uploadThumbnail(thumbnail as File)
    }
    const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION),{
        input: {
            ...input,
            ...(thumbnailUrl && {thumbnail:thumbnailUrl})
        },
    })

    if(data) return {message:"Success! The Post Updated",ok:true};
    return {
        message:"Oops! Something when wrong",
        ok:false,
        data: Object.fromEntries(formData.entries()),
    }
}

export async function deletePost(postId:number) {
    const data = await authFetchGraphQL(print(DELETE_POST_MUTATION),{postId})
    return data.deletePost
}