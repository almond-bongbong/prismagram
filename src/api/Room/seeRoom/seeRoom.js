import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments/room';
import { MESSAGE_FRAGMENT } from '../../../fragments/message';

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { roomId } = args;
      const canSee = await prisma.$exists.room({
        AND: [{ participants_some: { id: user.id } }, { id: roomId }],
      });

      if (canSee) {
        return prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't see this");
      }
    },
  },
};
