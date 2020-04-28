export const FULL_POST_FRAGMENT = `
  fragment PostParts on Post {
    id
    caption
    location
    createdAt
    updatedAt
    deletedAt
    files {
      id
      url
    }
    user {
      id
      username
    }
    comments {
      id
      text
      user {
        username
      }
    }
  }
`;
