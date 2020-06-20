import './env';
import { GraphQLServer } from 'graphql-yoga';
import path from 'path';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import isAuthenticated from './middlewares/isAuthenticated';
import { uploadController, uploadMiddleware } from './upload';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isAuthenticated: () => {
      isAuthenticated(request);
    },
  }),
});

console.log(process.env);

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);
server.express.get('/uploads/:file', (req, res) => {
  const pathDir = path.join(__dirname, `../uploads`, req.params.file);
  res.sendFile(pathDir);
});

server.start({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
