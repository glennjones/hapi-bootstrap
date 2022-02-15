const Path = require('path');
const Nunjucks = require('nunjucks');
const { IS_DEV } = require('./config');
const Pkg = require('../../package.json');

module.exports = {
  engines: {
    njk: {
      compile: (src, options) => {
        const template = Nunjucks.compile(src, options.environment);
        return (context) => {
          return template.render(context);
        };
      },
      prepare: (options, next) => {
        options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
        return next();
      },
    },
  },
  relativeTo: Path.resolve(__dirname, '../../'),
  path: 'templates',
  isCached: !IS_DEV,

  // Provide all templates a global context of the project name & version
  context: {
    appName: Pkg.name,
    appVersion: Pkg.version,
  },
};