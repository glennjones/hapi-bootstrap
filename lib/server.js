const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Joi = require('joi');
const Blipp = require('blipp');

const Routes = require('./routes');
const SwaggerConfig = require('./config/swagger-config');
const NunjucksConfig = require('./config/nunjucks-config');
const { HOSTNAME, PORT, IS_DEV } = require('./config/config');

// Create the hapi server
const server = Hapi.server({
    host: HOSTNAME,
    port: PORT,
    debug: IS_DEV ? { request: ['error'] } : {},
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../public/'),
      },
    },
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true,
    },
  });
  


async function createServer() {

    server.validator(Joi);

    const hapiSwagger = await SwaggerConfig();
    await server.register(hapiSwagger);

    await server.register([Inert, Vision]);
    await server.register(Blipp);
    
    server.route(Routes);
    server.views(NunjucksConfig);

    return server;

};

module.exports = createServer;





