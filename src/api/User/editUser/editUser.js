import isAuthenticated from '../../../middlewares/isAuthenticated';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { username, email, name, bio, avatar } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, name, bio, avatar },
      });
    },
  },
};
