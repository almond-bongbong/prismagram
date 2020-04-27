import isAuthenticated from '../../../middlewares/isAuthenticated';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { postId } = args;
      const { user } = request;
      const likeFindCondition = {
        AND: [{ user: { id: user.id } }, { post: { id: postId } }],
      };

      try {
        const existingLike = await prisma.$exists.like(likeFindCondition);

        if (existingLike) {
          await prisma.deleteManyLikes(likeFindCondition);
        } else {
          await prisma.createLike({
            user: { connect: { id: user.id } },
            post: { connect: { id: postId } },
          });
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
