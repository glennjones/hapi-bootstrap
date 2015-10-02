var Hapi            = require('hapi'),
    Inert           = require('inert'),
    Vision          = require('vision'),
    Blipp           = require('blipp'),
    Pack            = require('./package'),
    Routes          = require('./lib/routes.js');


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
var goodOptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
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








