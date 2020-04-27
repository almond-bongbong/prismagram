import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    isFollowing: async (parent, _, { request }) => {
      const me = request.user;
      return prisma.$exists.user({
        AND: [{ id: me.id }, { following_some: { id: parent.id } }],
      });
    },
    isSelf: (parent, _, { request }) => parent.id === request.user.id,
  },
};
