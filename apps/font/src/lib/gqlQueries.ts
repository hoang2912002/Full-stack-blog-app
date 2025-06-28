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

export const GET_COMMENT_BY_POST_ID = gql`
  query getPostComments($postId:Int!,$skip:Int,$take:Int) {
    getPostComments(postId: $postId,skip: $skip,take: $take) {
        id
        content
        createdAt
        author{
            name
            avatar
        }
    }
    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($input:CreateCommentInput!){
        createComment(createCommentInput:$input){
            id,
            content,
        }
    }
`;
export const POST_LIKES = gql`
  query PostLikeData($postId: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $postId)
  }
`;
export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId:Int!){
        likePost(postId:$postId)
    }
`;
export const UN_LIKE_POST_MUTATION = gql`
    mutation unLikePost($postId:Int!){
        unLikePost(postId:$postId)
    }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($skip: Int, $take: Int) {
    getUserPosts(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        likes
        comments
      }
    }
    userPostCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

