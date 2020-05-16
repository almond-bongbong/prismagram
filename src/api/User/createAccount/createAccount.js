import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, name = '', bio = '' } = args;

      const existUser = await prisma.$exists.user({
        OR: [{ username }, { email }],
      });
      if (existUser) throw new Error('This username / email is already taken');

      await prisma.createUser({ username, email, name, bio });
      return true;
    },
  },
};
