export async function getPosts() {
	const res = await fetch('/api/posts')
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function deletePost(id) {
	const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
	if (!res.ok) throw new Error(await res.text())
	return true
}

export async function updatePost(id, payload) {
	const res = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}
