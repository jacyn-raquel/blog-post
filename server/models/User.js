const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username must be given.']
	},
	email: {
		type: String,
		required: [true, 'Email should be filled out.']
	},
	isAdmin : {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: [true, 'Password is a must.']
	}
})

module.exports = mongoose.model('User', userSchema);