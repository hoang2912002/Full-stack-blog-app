"use server"
import {print} from "graphql";
import { authFetchGraphQL, FetchGraphQL } from "../fetchGraphQL"
import { CREATE_COMMENT_MUTATION, GET_COMMENT_BY_POST_ID } from "../gqlQueries"
import { CommentEntity } from "../type/modelTypes";
import { CreateCommentFormState } from "../type/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

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
export const saveComment  = async (
    state:CreateCommentFormState,
    formData:FormData,
): Promise<CreateCommentFormState> => {
    const validatedFields = CommentFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    if (!validatedFields.success)
        return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
        };
    const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
        input: {
        ...validatedFields.data
        },
    });
    if (data)
        return {
            message: "Success! Your comment saved!",
            ok: true,
            open: false,
        };

    return {
        message: "Oops! Something went wrong!",
        ok: false,
        open: true,
        data: Object.fromEntries(formData.entries()),
    };
      
}
