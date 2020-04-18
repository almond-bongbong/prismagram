import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: (_, args) => {
      const { username, email, name = '', bio = '' } = args;
      return prisma.createUser({ username, email, name, bio });
    },
  },
};
