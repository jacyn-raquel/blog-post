const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, `Title is required.`]
	},
	content: {
		type: String,
		required: [true, `Content is needed.`]
	},
	author: {
		type: String,
		required: [true, `Author info. is required.`]
	},
	creationDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Post', postSchema);