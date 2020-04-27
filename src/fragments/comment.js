export const COMMENT_WITH_USER = `
  fragment CommentWithUser on Comment {
    id
    text
    user {
      id
      username
    }
  }
`;
