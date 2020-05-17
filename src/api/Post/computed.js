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
          {
            deletedAt: null,
          },
        ],
      }),
    likeCount: (parent) =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id }, deletedAt: null },
        })
        .aggregate()
        .count(),
    files: (parent) => prisma.post({ id: parent.id }).files(),
    comments: (parent) => prisma.post({ id: parent.id }).comments(),
    user: (parent) => prisma.post({ id: parent.id }).user(),
  },
};
