
// Default layout template
var React = require('react');

var Default = React.createClass({

  render: function() {

    return(
      <html>
      <head>

        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <title>Todo App</title>

      </head>
      <body style={{fontFamily: ['Varela Round', 'sans-serif']}}>
        <div id="root"></div>

        <div id="app"></div>
        <script src="http://localhost:8070/webpack-dev-server.js"></script>
        <script src="http://localhost:8070/built/bundle.js"></script>
      </body>
      </html>
    );
  }
});

module.exports = Default;
