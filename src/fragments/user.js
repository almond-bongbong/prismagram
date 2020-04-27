export const USER_FRAGMENT = `
  fragment UserParts on User {
    id
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
