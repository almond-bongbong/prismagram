export const MESSAGE_FRAGMENT = `
  fragment MessageParts on Message {
    id
    text
    from {
      id
      username
      name
    }
    to {
      id 
      username
      name    
    }
  }
`;
