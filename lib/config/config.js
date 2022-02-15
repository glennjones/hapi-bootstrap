const Joi = require('joi');
const Dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  // read the local .env file into environment vars
  // othwise it these configs need to be provide in the production environment
  Dotenv.config();
}

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('test', 'development', 'production').default('development').required(),
    HOSTNAME: Joi.string()
      .ip()
      .default('0.0.0.0')
      .when('$platform', {
        is: 'win32',
        then: Joi.string().default('127.0.0.1'),
      }),
    PORT: Joi.number().port().default(3000),
    LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
    IS_DEV: Joi.boolean()
      .default(true)
      .when('NODE_ENV', {
        is: 'production',
        then: Joi.bool().default(false),
      }),
    // expand your project config here
  })
  .unknown()
  .required();

let config = {};


const { value, error, warning } = schema.validate(process.env, {
  context: { platform: process.platform },
});

if (warning) {
  console.warn(warning);
}

if (error) {
  console.error('Fault in env configuration: ', error.details);
  process.exit(1);
} else {
  config = value;
}


module.exports = config;
