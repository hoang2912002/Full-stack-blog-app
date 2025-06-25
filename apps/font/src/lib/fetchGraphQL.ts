import { BACKEND_URL } from "./constants"

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