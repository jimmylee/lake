var Hapi = require('hapi');
var Server = Hapi.createServer('localhost', 8001);

Server.route({
    method: 'GET',
    path: '/{any?}',
    config: {
        handler: {
            file: "build/index.html"
        }
    }
});

Server.route({
    method: 'GET',
    path: '/css/{param*}',
    handler: {
        directory: {
            path: 'build/css'
        }
    }
});

Server.route({
    method: 'GET',
    path: '/js/{param*}',
    handler: {
        directory: {
            path: 'build/js'
        }
    }
});

Server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'build/static'
        }
    }
});

// ==========================================================

Server.start(function () {

    console.log('[Lake] Hapi server started at: ' + Server.info.uri);

});