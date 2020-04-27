import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT } from '../../../fragments/user';

export default {
  Query: {
    seeMyProfile: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const findUser = await prisma.user({ id: user.id });
      const findPosts = await prisma.user({ id: user.id }).posts();
      return { user: findUser, posts: findPosts };
    },
  },
};
