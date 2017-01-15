// Create a basic Hapi.js server
require('babel-register')({
  presets: ['es2015', 'react'],
});
var Hapi = require('hapi');
const RtDB = require('./plugins/sync/rtdb');
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";

// Basic Hapi.js connection stuff
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8090,
  routes: { cors: { origin: ['*'] } }
});

// Register the inert and vision Hapi plugins
// As of Hapi 9.x, these two plugins are no longer
// included in Hapi automatically
// https://github.com/hapijs/hapi/issues/2682
server.register([RtDB,{
  register: require('inert')
}, {
  register: require('vision')
}], function(err) {

  if (err) return console.error(err);

    // Add the React-rendering view engine
    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'app/views'
    });

    // Add a route to serve static assets (CSS, JS, IMG)
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'public',
          index: ['index.html']
        }
      }
    });

    // Add main app route
    server.route({
      method: 'GET',
      path: '/all',
      handler: {
        view: 'Main'
      }
    });

    server.route({
      method: 'GET',
      path: '/groups',
      handler: function (request, reply) {

          console.log('/groups ' );
          server.methods.db.findEntries(10, (err, result) => {

              if (err) {
                  return reply().code(500);
              }

              console.log('/groups ' + result);
              return reply(result);
          });
      }
    });

    //Create a new entry
    server.route({
        method: 'POST',
        path: '/group/create',
        handler: function (request, reply) {
          console.log('/group/create ' + request.payload.name);

            const entry = {
                createdAt: new Date(),
                id: request.payload.name,
                name: request.payload.name,
                status: request.payload.status
            };

            server.methods.db.saveEntry(entry, (err) => {

                if (err) {
                    return reply().code(500);
                }

                return reply().code(204);
            });
        }
    });
    server.start(function() {
      console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);
      server.table()[0].table.forEach((route) => console.log("Route = " + `${route.method} - ${route.path}`));
    });

});
