'use server'

import { redirect } from "next/navigation"; 
import { FetchGraphQL } from "../fetchGraphQL";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { SignInFormState, SignUpFormState } from "../type/formState";
import { signUpFormSchema } from "../zodSchemas/signUpFormSchema";
import {print} from "graphql";
import { signInFormSchema } from "../zodSchemas/signInFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";
export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = signUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  
  const data = await FetchGraphQL(print(CREATE_USER_MUTATION), {
    input: {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      name: validatedFields.data.name,
    },
  });
  if (data?.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };
  redirect("/auth/signin");
}

export async function signIn (state: SignInFormState,formData:FormData): Promise<SignInFormState> {
  const validatedFields = signInFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  const data = await FetchGraphQL(print(SIGN_IN_MUTATION), {
    input: {
      ...validatedFields.data
    },
  });
  if (data?.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };
  if(data){
    await createSession({
      user:{
        id:data.signIn.id,
        name:data.signIn.name,
        avatar:data.signIn.avatar,
      },
      accessToken:data.signIn.accessToken
    })
    revalidatePath("/")
    redirect("/");
  }

}