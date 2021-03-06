const jwt = require('jwt-simple');
const config = require('../config');

module.exports = function(req, res, next){
	if(req.headers['x-auth']){
		req.auth = jwt.decode(req.headers['x-auth'], config.secret);
	} else {
		req.auth = { permissions: null };
	}
	const allowedSites = allowedSitesForUser(req.auth);
	
	
	if(req.auth && !checkUserDataRequest(req, req.auth)) {
		res.sendStatus(400);
	} else if(!allowedSites.includes(req.url)) {
		console.log('Prem ', req.auth, ', url ', req.url, ', allowed ', allowedSites.includes(req.url));
		res.sendStatus(401);
	} else {
		if (!req.headers.email) {
			req.headers.email = req.auth.email;
		}
		next();
	}
}

function checkUserDataRequest(req, auth) {
	if(auth.permissions === 'user' && req.headers.email !== auth.email) {
		return false;
	} else {
		return true;
	}
}

function allowedSitesForUser(auth) {
	const allowed = [
		'/',
		'/styles.css',
		'/app.js',
		'/favicon.ico',
		'/login.html',
		'/register.html',
		'/api/users',
		'/api/sessions',
		'/home.html'
	];
	if(auth === undefined) {
		return allowed;
	} else if (auth.permissions === 'admin') {
		return allowed.concat([
			'/classes/classes.html',
			'/api/classes',
			'/classes/classesEdit.html',
			'/classes/showSpecial.html',
			'/api/showSpecial',
			'/classes/editSpecial.html',
			'/api/trainers',
			'/api/specialClasses',
			'/api/reservation',
			'/api/mydata',
			'/users/myinfo.html',
			'/users/editdata.html',
			'/api/editdata',
			'/users/listusers.html',
			'/api/listusers'
		]);
	} else if(auth.permissions === 'normal'){
		return allowed.concat([
			'/classes/classes.html',
			'/api/classes',
			'/classes/showSpecial.html',
			'/api/specialClasses',
			'/api/trainers',
			'/api/reservation',
			'/api/showSpecial',
			'/api/mydata',
			'/users/myinfo.html',
			'/users/editdata.html',
			'/api/editdata'
		]);
	} else {
		return allowed;
	}
}
