import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { authenticateJwt } from './passport';
import './passport';
import { prisma } from '../generated/prisma-client';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({ schema, context: prisma });

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
