export const ROOM_FRAGMENT = `
  fragment RoomParts on Room {
    id
    participants {
      id
      avatar
      username
      email
      name
      bio
    }
    messages {
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
  } 
`;
