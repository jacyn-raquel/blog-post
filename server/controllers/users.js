const bcrypt = require('bcrypt');
const User = require('../models/User');
const {errorHandler, createAccessToken} = require('../auth.js');

// 1) Register
module.exports.registerUser = (req,res) => {
	const {username, email, password} = req.body;

	if (!email.includes("@")){
		return res.status(400).json({
			message: "Email input is invalid!"
		})
	}

	if (password <= 8){
		return res.status(400).json({
			message: "Password input should be at least 8 alphanumeric characters."
		})
	}

	return User.findOne({username, email})
	.then(result => {
		console.log(result);
		if(result){
			return res.status(409).json({
				message: "Account already exists."
			})
		}

		const newUser = new User({
			username,
			email,
			password: bcrypt.hashSync(password, 10)
		})

		newUser.save()
		.then(savedUser => res.status(201).json({message: 'User Account successfully created.'}))
		.catch(error => errorHandler(error,req,res));
	})
}

// 2) Login
module.exports.loginUser = (req,res) => {
	const {email, password} = req.body;

	if(email.includes('@')){
		return User.findOne({email})
		.then(result => {
			if(!result){
				return res.status(404).json({
					message: "Account does not exist. Create one."
				})
			}

			const isPasswordCorrect = bcrypt.compareSync(password, result.password) ? res.status(200).json({access: createAccessToken(result)}) : res.status(401).json({message: `Incorrect email or password!`});
		})
		.catch(error => errorHandler(error, req, res));
	} 

	return res.status(400).json({
		message: `Invalid email format.`
	})
}
