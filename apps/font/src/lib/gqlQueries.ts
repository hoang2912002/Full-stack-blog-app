import gql from "graphql-tag";
export const GET_POSTS = gql`
    query posts($skip:Float,$take:Float){
        posts(skip:$skip,take:$take) {
            id
            title
            thumbnail
            content
            createdAt
            slug
        }
        postCount
    }
`
//Int! là required nó
export const GET_POSTS_BY_ID = gql`
    query postById($id:Int!){
        postById(id:$id){
            id
            title
            thumbnail
            content
            createdAt
            author{
                name
            }
            tags{
                id
                name
            }
        }
    }
`