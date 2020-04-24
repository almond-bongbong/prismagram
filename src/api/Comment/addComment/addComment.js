import isAuthenticated from '../../../middlewares/isAuthenticated';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text, postId } = args;

      try {
        return await prisma.createComment({
          text,
          post: {
            connect: { id: postId },
          },
          user: {
            connect: { id: user.id },
          },
        });
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
