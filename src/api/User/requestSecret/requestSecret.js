import { generateSecret } from '../../../libs/secret';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);

      try {
        await prisma.updateUser({
          data: { loginSecret },
          where: { email },
        });

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
