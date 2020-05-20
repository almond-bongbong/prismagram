import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeProfile: async (_, args) => {
      const { username } = args;
      return prisma.user({ username });
    },
  },
};
