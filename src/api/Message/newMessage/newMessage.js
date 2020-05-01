import { prisma } from '../../../../generated/prisma-client';

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args) => {
        const { toId } = args;
        return prisma.$subscribe.message({
          AND: {
            mutation_in: 'CREATED',
            node: {
              to: {
                id: toId,
              },
            },
          },
        });
      },
      resolve: (payload) => payload.node,
    },
  },
};
