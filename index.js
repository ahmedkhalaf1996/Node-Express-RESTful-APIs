const config = require('config');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);  if env not set give you undefiends
// console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
// Configration

console.log('Application Name: ' + config.get('name'));
console.log('Mail Serve: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') === 'development'){
	app.use(morgan('tiny'));
	//console.log('Morgan enabled...');
    debug('Morgan enebled'); // console.log()
}

app.use(logger);




// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));


