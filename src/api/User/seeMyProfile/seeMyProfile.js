import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT } from '../../../fragments/user';

export default {
  Query: {
    seeMyProfile: (_, __, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      return prisma.user({ id: user.id });
    },
  },
};
