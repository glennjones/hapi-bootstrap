'use strict';
var Hapi        = require('hapi'),
	Joi 		= require('joi'),
	handlers    = require('../lib/handlers.js'),
	routes,


// adds the routes and validation for api
routes = [{
		method: 'GET',
		path: '/',
		config: {
			handler: handlers.index
		}
	}, {
		method: 'GET',
		path: '/{path*}',
		handler: {
			directory: {
				path: './public',
				listing: false,
				index: true
			}
		}
	}];

exports.routes = routes;