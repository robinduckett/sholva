require('./kree/bootstrap');

var connect = require('connect');

connect.createServer(
    connect.logger()
  , connect.static('./webroot')
).listen(8083);