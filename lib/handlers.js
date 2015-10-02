var pack            = require('../package');

function index(request, reply) {
	reply.view('index.html', {
		title: pack.name,
		version: pack.version,
	});
}

exports.index = index;




