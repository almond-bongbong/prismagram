import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated();
      const { user } = request;
      const { caption, files } = args;
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } },
      });

      const fileFetches = files.map((f) =>
        prisma.createFile({ url: f, post: { connect: { id: post.id } } })
      );
      await Promise.all(fileFetches);

      return post;
    },
  },
};
