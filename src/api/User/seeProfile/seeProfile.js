import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeProfile: async (_, args) => {
      const { username } = args;
      console.log(username);
      return prisma.user({ username });
    },
  },
};
