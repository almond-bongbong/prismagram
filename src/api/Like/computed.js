import { prisma } from '../../../generated/prisma-client';

export default {
  ToggleLikeResponse: {
    likeCount: (parent) =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id }, deletedAt: null },
        })
        .aggregate()
        .count(),
  },
};
