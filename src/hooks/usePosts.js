import { useEffect, useState } from 'react'
import { deletePost, getPosts, updatePost } from '../lib/api'

export function usePosts() {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const load = async () => {
		try {
			setLoading(true)
			setError('')
			const data = await getPosts()
			setPosts(data)
		} catch (e) {
			setError(e.message || 'Failed to load posts')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		load()
	}, [])

	const remove = async id => {
		await deletePost(id)
		setPosts(prev => prev.filter(p => p._id !== id))
	}

	const save = async (id, payload) => {
		const updated = await updatePost(id, payload)
		setPosts(prev => prev.map(p => (p._id === id ? updated : p)))
		return updated
	}

	return { posts, loading, error, load, remove, save, setPosts }
}
