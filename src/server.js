let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());
app.use(require('./auth'));
app.use('/', require('./controllers/static'));
app.use('/api/sessions', require('./controllers/api/sessions'));
app.use('/api/users', require('./controllers/api/users'));


app.listen(8080, function () {
	console.log('Server is listening on: ', 8080);
});