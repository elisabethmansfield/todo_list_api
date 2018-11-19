const argv = require('minimist')(process.argv.slice(2));
// Use localhost and port 3000 if Host and Port not provided.
const port = parseInt(argv.port || process.env.PORT || '3000', 10);
const host = argv.host || process.env.HOST || process.env.IP || "0.0.0.0"; 
const url = "http://" + host + ":" + port;

module.exports = {
    port, host, url
};