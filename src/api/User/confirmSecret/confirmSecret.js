import { prisma } from '../../../../generated/prisma-client';
import { generateJwt } from '../../../utils/jwt';

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });

      if (user.loginSecret === secret) {
        return generateJwt(user.id);
      } else {
        throw Error('Wrong email/secret combination');
      }
    },
  },
};
