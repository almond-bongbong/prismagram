import { generateSecret } from '../../../utils/secret';
import { prisma } from '../../../../generated/prisma-client';
import { sendSecretMail } from '../../../utils/mail';

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(request);

      try {
        await sendSecretMail(email, loginSecret);
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
