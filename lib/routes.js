const Joi = require('joi');

module.exports = [
	{
	  method: 'GET',
	  path: '/{param*}',
	  options: {
		description: 'Static file handler',
	  },
	  handler: {
		directory: {
		  path: '.',
		  redirectToSlash: true,
		  index: true,
		},
	  },
	},
	{
	  method: 'GET',
	  path: '/',
	  options: {
		description: 'Nunjucks templated homepage.',
	  },
	  handler: (request, h) => {
		return h.view('index', {
		  title: 'Home',
		  message: 'Hello World! How about the <a href="/about">about</a> page',
		});
	  },
	},
	{
		method: 'PUT',
		path: '/v1/sum/add/{a}/{b}',
		config: {
			handler: async (request, h) => {
				try {
				  const equals = request.params.a + request.params.b
		  
				  return h.response(equals);
				} catch (err) {
				  return h.response(err.message).code(500);
				}
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
	}
  ];
  


/*
// adds the routes and validation for api
let routes = [{
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


*/