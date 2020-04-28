import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { id } = args;
      const isExistPost = await prisma.$exists.post({
        id,
        user: { id: user.id },
      });

      if (isExistPost) {
        await prisma.updatePost({
          data: { deletedAt: new Date() },
          where: { id },
        });
        return true;
      } else {
        return false;
      }
    },
  },
};
