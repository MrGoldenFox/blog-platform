import Post from '../models/Post.js'

export async function getPosts(req, res, next) {
	try {
		const posts = await Post.find().sort({ createdAt: -1 })
		res.json(posts)
	} catch (e) {
		next(e)
	}
}

export async function getPost(req, res, next) {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) return res.status(404).json({ message: 'Post not found' })
		res.json(post)
	} catch (e) {
		next(e)
	}
}

export async function createPost(req, res, next) {
	try {
		const { title, content, author, name, description } = req.body

		const finalTitle = title || name || 'Untitled'
		const finalContent = content || description
		const finalAuthor = author || name || 'Anonymous'

		if (!finalContent) {
			return res
				.status(400)
				.json({ message: 'content/description is required' })
		}

		const post = await Post.create({
			title: finalTitle,
			content: finalContent,
			author: finalAuthor,
		})

		res.status(201).json(post)
	} catch (e) {
		next(e)
	}
}

export async function updatePost(req, res, next) {
	try {
		const { title, content, author, name, description } = req.body

		const update = {
			...(title || name ? { title: title || name } : {}),
			...(content || description ? { content: content || description } : {}),
			...(author || name ? { author: author || name } : {}),
		}

		const post = await Post.findByIdAndUpdate(req.params.id, update, {
			new: true,
			runValidators: true,
		})
		if (!post) return res.status(404).json({ message: 'Post not found' })
		res.json(post)
	} catch (e) {
		next(e)
	}
}

export async function deletePost(req, res, next) {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)
		if (!post) return res.status(404).json({ message: 'Post not found' })
		res.status(204).send()
	} catch (e) {
		next(e)
	}
}
