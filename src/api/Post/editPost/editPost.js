import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { id, caption, location } = args;
      const isExistPost = await prisma.$exists.post({
        id,
        user: { id: user.id },
        deletedAt: null,
      });

      if (isExistPost) {
        return prisma.updatePost({
          data: { caption, location },
          where: { id },
        });
      } else {
        throw Error("You can't do that");
      }
    },
  },
};
