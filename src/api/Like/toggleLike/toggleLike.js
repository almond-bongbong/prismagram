import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { postId, isLike } = args;
      const { user } = request;
      const likeFindCondition = {
        AND: [{ user: { id: user.id } }, { post: { id: postId } }],
      };

      const existingLike = await prisma.$exists.like(likeFindCondition);

      try {
        if (existingLike) {
          await prisma.updateManyLikes({
            data: { deletedAt: isLike ? null : new Date() },
            where: likeFindCondition,
          });
        } else {
          await prisma.createLike({
            user: { connect: { id: user.id } },
            post: { connect: { id: postId } },
          });
        }

        return {
          result: isLike,
        };
      } catch (e) {
        console.error(e);
        return e;
      }
    },
  },
};
