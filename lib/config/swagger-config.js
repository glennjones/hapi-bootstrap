const HapiSwagger = require('hapi-swagger');
const Pkg = require('../../package.json');

module.exports = async () => {
  const swaggerOptions = {
    basePath: '/v1/',
    pathPrefixSize: 2,
    info: {
      title: `${Pkg.name} API Documentation`,
      version: Pkg.version,
    },
  };

  return { plugin: HapiSwagger, options: swaggerOptions };
};
