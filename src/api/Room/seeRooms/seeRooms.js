import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRooms: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      return prisma.rooms({ where: { participants_some: { id: user.id } } });
    },
  },
};
