import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments/room';

export default {
  Query: {
    seeRooms: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      return prisma
        .rooms({ where: { participants_some: { id: user.id } } })
        .$fragment(ROOM_FRAGMENT);
    },
  },
};
