export const USER_FRAGMENT = `
  fragment UserParts on User {
    id
    avatar
    username
    email
    name
    bio
    posts {
      id
      caption
    }
  }
`;
