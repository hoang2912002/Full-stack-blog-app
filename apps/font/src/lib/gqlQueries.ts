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

export const CREATE_USER_MUTATION = gql`
    mutation createUser($input:CreateUserInput!){
        createUser(createUserInput:$input){
            id
        }
    }
`;

//Lưu ý $input: CreateUserInput! phải gán đúng dto ở BE
export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;