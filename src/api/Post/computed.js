import { prisma } from '../../../generated/prisma-client';

export default {
  Post: {
    isLiked: async (parent, _, { request }) =>
      prisma.$exists.like({
        AND: [
          {
            post: { id: parent.id },
          },
          {
            user: { id: request.user.id },
          },
        ],
      }),
    likeCount: (parent) =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
