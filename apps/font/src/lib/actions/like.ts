"use server"
import {print} from "graphql";
import { authFetchGraphQL } from "../fetchGraphQL"
import { LIKE_POST_MUTATION, POST_LIKES, UN_LIKE_POST_MUTATION } from "../gqlQueries";

export async function getPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES),{
    postId,
  });

  return {
    likeCount: data?.postLikesCount as number,
    userLikedPost: data?.userLikedPost as boolean,
  };
}

export async function likePost(postId:number) {
    const data = await authFetchGraphQL(print(LIKE_POST_MUTATION),{
        postId
    })
}
export async function unLikePost(postId:number) {
    const data = await authFetchGraphQL(print(UN_LIKE_POST_MUTATION),{
        postId
    })
}