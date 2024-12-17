const {errorHandler} = require('../auth.js');
const Post = require('../models/Post');

// 1) Create Post
module.exports.createPost = (req, res) => {
	const {title, content, author} = req.body;

	return Post.findOne({title, content})
	.then(result => {
		console.log(result);
		if(result){
			return res.status(409).json({message: 'This post title and content already exist.'});
		}

		const newPost = new Post({
			title,
			content,
			author: req.user.username
		})

		return newPost.save()
		.then(result => res.status(200).json({message: "Post created successfully!", result: result}))
		.catch(error => errorHandler(error, req, res));
	})
	.catch(error => errorHandler(error, req, res));
}

// 2) Get Post
module.exports.getPost = (req, res) => {
	const username =req.user.username;

	return Post.find({author: username})
	.then(result => {
		if(result){
			return res.status(200).json({posts: result})
		}

		return res.status(404).json({message: `No posts found under this author.`});
	})
	.catch(error => errorHandler(error,req, res));
}

// 3) Update Blog Post
module.exports.updatePost = (req, res) => {
	const {title, content} = req.body;

	let updatedPost = {
			title,
			content
		}

	if(req.user || req.user.isAdmin){
		return Post.findByIdAndUpdate(req.params.postId, updatedPost, {new:true})
		.then(updatedPost => {
			if(updatedPost){
				return res.status(200).json({message: `Post updated successfully.`, updatedPost: updatedPost});
			}

			return res.status(404).json({message:`Post does not exist.`});
		})
		.catch(error => errorHandler(error, req, res));
	} 
	
	return res.status(403).json({message: `Forbidden!`});
}

// 4) Delete Post
module.exports.deletePost = (req, res) => {
	const {postId} = req.params;

	if(req.user || req.user.isAdmin){
		return Post.findByIdAndDelete(postId)
		.then(result => res.status(200).json({message: `Post deleted successfully.`}))
		.catch(error => errorHandler(error, req, res));
	}

	return res.status(403).json({message: `Forbidden!`});
	
}