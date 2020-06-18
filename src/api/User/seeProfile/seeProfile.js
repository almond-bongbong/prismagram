import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT } from '../../../fragments/user';

export default {
  Query: {
    seeProfile: async (_, args) => {
      const { username } = args;
      console.log(username);
      return prisma.user({ username });
    },
  },
};
