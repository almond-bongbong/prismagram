import { prisma } from '../../../../generated/prisma-client';
import { COMMENT_FRAGMENT } from '../../../fragments/comment';

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { text, postId } = args;

      try {
        return prisma
          .createComment({
            text,
            post: {
              connect: { id: postId },
            },
            user: {
              connect: { id: user.id },
            },
          })
          .$fragment(COMMENT_FRAGMENT);
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
