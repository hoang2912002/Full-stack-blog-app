import { BACKEND_URL } from "./constants"
import { getSession } from "./session";

export const FetchGraphQL = async (query:string,variables={}) => {
    const res = await fetch(`${BACKEND_URL}/graphql`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await res.json();
    if(result.error){
        console.log("GraphQL errors:", result.errors)
        throw new Error("Failed to fetch the data from GraphQL")
    }

    return result.data;
}

export const authFetchGraphQL = async (query:string,variables={}) => {
    const session = await getSession();
    const res = await fetch(`${BACKEND_URL}/graphql`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await res.json();
    if(result.error){
        console.log("GraphQL errors:", result.errors)
        throw new Error("Failed to fetch the data from GraphQL")
    }

    return result.data;
}