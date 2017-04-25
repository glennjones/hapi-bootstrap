'use strict';
require('dotenv').config();

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Routes = require('./lib/routes.js');


var server = new Hapi.Server();
server.connection({
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
    router: {
        stripTrailingSlash: true
    },
    routes: {cors: true}
});


// options for good reporting
const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
}

let swaggerOptions = {
    basePath: '/v1/',
    pathPrefixSize: 2,
};

// register plug-ins
server.register([
    Inert,
    Vision,
    Blipp,
    {
        register: require('good'),
        options: goodOptions
    },
    {
        register: HapiSwagger,
        options: swaggerOptions
    }
    ], function (err) {
        server.start(function(){
            console.log('Server running at:', server.info.uri);
        });
    });


// add routes
server.route(Routes.routes);

// add templates support with handlebars
server.views({
    path: 'templates',
    engines: { html: require('handlebars') },
    partialsPath: './templates/withPartials',
    helpersPath: './templates/helpers',
    isCached: false
})








