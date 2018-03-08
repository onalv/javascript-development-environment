import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
	res.json([
		{"id":1, "fistName":"Bob", "lastName":"Smith", "email":"bob@gmail.com"},
		{"id":2, "fistName":"Tammy", "lastName":"Norton", "email":"tammy@gmail.com"},
		{"id":3, "fistName":"Tina", "lastName":"Lee", "email":"tina@gmail.com"},
	]);
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on http://localhost:' + port);
		open('http://localhost:' + port);
	}
});