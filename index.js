'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const start = async () => {

    await server.register(require('vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        helpersPath: 'helpers',
        isCached: false
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
    
            return h.view('index', { title: 'My Test page' });
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();