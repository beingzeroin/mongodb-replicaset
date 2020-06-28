const express = require('express')
const app = express()
var activeConfig = require('./server/config/siteconfig').getActiveConfig();
var dbConnection = require('./server/database/connection');
const todoRouter = require('./server/routes/todoRouter');
var bodyParser = require('body-parser');


dbConnection.connect();
app.use(express.static(__dirname + '/public'));  
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use('/api/todos', todoRouter);

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/public/views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(activeConfig.WEB_PORT, () => console.log(`Example app listening on port ${activeConfig.WEB_PORT}!`))