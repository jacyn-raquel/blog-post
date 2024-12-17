const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username must be given.']
	},
	comment: {
		type: String,
		required: [true, `Comments are required before sending.`]
	}
})

module.exports = mongoose.model('Comment', commentSchema);