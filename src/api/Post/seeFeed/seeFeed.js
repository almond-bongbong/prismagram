import { prisma } from '../../../../generated/prisma-client';
import { FULL_POST_FRAGMENT } from '../../../fragments/post';

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      const followingIds = [...following.map((u) => u.id), user.id];
      return prisma
        .posts({
          where: { user: { id_in: followingIds } },
          orderBy: 'createdAt_DESC',
        })
        .$fragment(FULL_POST_FRAGMENT);
    },
  },
};
