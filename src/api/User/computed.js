import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    posts: (parent) =>
      prisma.posts({ where: { user: { id: parent.id }, deletedAt: null } }),
    isFollowing: (parent, _, { request }) => {
      const me = request.user;
      if (!me) return false;

      return prisma.$exists.user({
        AND: [{ id: me.id }, { following_some: { id: parent.id } }],
      });
    },
    isSelf: (parent, _, { request }) => parent.id === request.user?.id,
    postsCount: (parent) =>
      prisma
        .postsConnection({ where: { user: { id: parent.id } } })
        .aggregate()
        .count(),
    followingCount: (parent) =>
      prisma
        .usersConnection({ where: { followers_some: { id: parent.id } } })
        .aggregate()
        .count(),
    followersCount: (parent) =>
      prisma
        .usersConnection({ where: { following_some: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
