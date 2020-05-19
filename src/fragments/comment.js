export const COMMENT_FRAGMENT = `
  fragment CommentWithUser on Comment {
    id
    text
    user {
      id
      avatar
      username
    }
  }
`;
