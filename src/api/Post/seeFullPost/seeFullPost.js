import { prisma } from '../../../../generated/prisma-client';
import { FULL_POST_FRAGMENT } from '../../../fragments/post';

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const posts = await prisma
        .posts({
          where: { id: args.id, deletedAt: null },
        })
        .$fragment(FULL_POST_FRAGMENT);

      if (posts[0]) {
        return posts[0];
      } else {
        throw Error('Not found post');
      }
    },
  },
};
