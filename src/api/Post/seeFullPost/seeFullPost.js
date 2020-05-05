import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const posts = await prisma.posts({
        where: { id: args.id, deletedAt: null },
      });

      if (posts[0]) {
        return posts[0];
      } else {
        throw Error('Not found post');
      }
    },
  },
};
