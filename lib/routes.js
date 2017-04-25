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
	},{
    method: 'PUT',
    path: '/v1/sum/add/{a}/{b}',
    config: {
        handler: function(request, reply) {
			const equals = request.params.a + request.params.b
			reply({'equals': equals})
		},
        description: 'Add',
        tags: ['api'],
        notes: ['Adds together two numbers and return the result. As an option you can have the result return as a binary number.'],
        validate: {
            params: {
                a: Joi.number()
                    .required()
                    .description('the first number'),

                b: Joi.number()
                    .required()
                    .description('the second number')
            }
        }

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