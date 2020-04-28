import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { toId, message } = args;

      const findRooms = await prisma.rooms({
        where: { participants_every: { id_in: [user.id, toId] } },
      });

      let room = findRooms[0];

      if (!room) {
        room = await prisma.createRoom({
          participants: {
            connect: [{ id: user.id }, { id: toId }],
          },
        });
      }

      const newMessage = await prisma.createMessage({
        text: message,
        room: { connect: { id: room.id } },
        from: { connect: { id: user.id } },
        to: { connect: { id: toId } },
      });

      await prisma.updateRoom({
        where: { id: room.id },
        data: { messages: { connect: { id: newMessage.id } } },
      });

      return newMessage;
    },
  },
};
