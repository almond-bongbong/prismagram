import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql'));
const allResolvers = fileLoader(path.join(__dirname, '/api/**/*.js'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;

// prisma login -k eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazk0N2x0OTR3aHlqMDg2MXBoNXR3eDRtIiwiaWF0IjoxNTg3MTI4OTYzLCJleHAiOjE1ODk3MjA5NjN9.nGhcLTHdMC4Pj94VdXViegOO3ciGdwqwZD8xcLV0Q_0
