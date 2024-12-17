const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// activate dotenv
dotenv.config();

// CREATE ACCESS TOKEN
module.exports.createAccessToken = (user) => {
	const data = {
		id:user._id,
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, process.env.JWT_SECRET_KEY, {
		expiresIn: "12h"
	})
}

// VERIFY
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(token === undefined){
		return res.json({
			auth: "Failed. No token!"
		})
	}

	token = token.slice(7,token.length);

	console.log(token);

	jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decodedToken){
		if(err){
			return res.status(403).json({
				auth: "Failed!",
				message: err.message
			})
		}
		console.log(decodedToken);
		req.user = decodedToken;
		next();
	})
}

// VERIFY ADMIN
module.exports.verifyAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	} else {
		return res.status(403).json({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}

// ERROR HANDLING
module.exports.errorHandler = (err, req, res, next) => {
	console.error(err);

	const statusCode = err.status || 500;
	const errorMessage = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: err.code || 'SERVER_ERROR',
			details: err.details || null
		}
	})
}


