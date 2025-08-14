import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [err, setErr] = useState('')
	const [q, setQ] = useState('')

	const load = async () => {
		try {
			setLoading(true)
			setErr('')
			const res = await fetch('/api/posts')
			if (!res.ok) throw new Error(await res.text())
			const data = await res.json()
			setPosts(data)
		} catch (e) {
			setErr(e.message || 'Failed to load posts')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		load()
	}, [])

	const handleDelete = async id => {
		if (!confirm('Delete this post?')) return
		try {
			const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
			if (!res.ok) throw new Error(await res.text())
			setPosts(prev => prev.filter(p => p._id !== id))
		} catch (e) {
			alert('Delete failed: ' + (e.message || 'unknown error'))
		}
	}

	const filtered = useMemo(() => {
		const s = q.trim().toLowerCase()
		if (!s) return posts
		return posts.filter(
			p =>
				p.title?.toLowerCase().includes(s) ||
				p.author?.toLowerCase().includes(s) ||
				p.content?.toLowerCase().includes(s)
		)
	}, [q, posts])

	return (
		<div className='min-h-[calc(100vh-5rem)] bg-gradient-to-b from-violet-50 to-white rounded-4xl'>
			<div className='mx-auto max-w-5xl px-4 py-8'>
				{/* Header */}
				<div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h1 className='text-4xl font-extrabold tracking-tight text-slate-900'>
							Posts
						</h1>
						<p className='mt-1 text-slate-500'>
							Create, edit, and manage your blog posts.
						</p>
					</div>
					<div className='flex flex-col gap-3 sm:flex-row'>
						<div className='relative'>
							<input
								value={q}
								onChange={e => setQ(e.target.value)}
								placeholder='Search posts…'
								className='w-64 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 pl-9 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:shadow-md'
							/>
							<svg
								viewBox='0 0 24 24'
								className='pointer-events-none absolute left-2.5 top-2.5 h-5 w-5 text-slate-400'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='m21 21-4.3-4.3' />
								<circle cx='11' cy='11' r='7' />
							</svg>
						</div>
						<Link
							to='/create-post'
							className='inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-lg active:translate-y-0 w-34'
						>
							<svg
								viewBox='0 0 24 24'
								className='h-5 w-5'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='M12 5v14M5 12h14' />
							</svg>
							New post
						</Link>
					</div>
				</div>

				{loading ? (
					<SkeletonGrid />
				) : err ? (
					<p className='rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700'>
						{err}
					</p>
				) : filtered.length === 0 ? (
					<EmptyState query={q} />
				) : (
					<section className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						{filtered.map(p => (
							<article
								key={p._id}
								className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl'
							>
								{/* Accent bar */}
								<div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500' />

								<h3 className='mt-2 line-clamp-2 text-lg font-semibold text-slate-900'>
									{p.title}
								</h3>
								<p className='mt-1 text-sm text-slate-500'>
									by {p.author || 'Anonymous'}
								</p>
								<p className='mt-3 line-clamp-4 text-slate-700 whitespace-pre-wrap'>
									{p.content}
								</p>

								<div className='mt-4 flex gap-2'>
									<Link
										to={`/edit/${p._id}`}
										className='inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-500'
									>
										<svg
											viewBox='0 0 24 24'
											className='h-4 w-4'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
										>
											<path d='M12 20h9' />
											<path d='M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z' />
										</svg>
										Edit
									</Link>
									<button
										onClick={() => handleDelete(p._id)}
										className='inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-500'
									>
										<svg
											viewBox='0 0 24 24'
											className='h-4 w-4'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
										>
											<path d='M3 6h18' />
											<path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
											<path d='M10 11v6M14 11v6' />
											<path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
										</svg>
										Delete
									</button>
								</div>
							</article>
						))}
					</section>
				)}
			</div>
		</div>
	)
}

/* ---------- UI bits ---------- */

function SkeletonGrid() {
	return (
		<section className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className='h-44 animate-pulse rounded-2xl border border-slate-200 bg-white/70 p-4'
				>
					<div className='mb-3 h-4 w-1/3 rounded bg-slate-200' />
					<div className='mb-2 h-3 w-2/3 rounded bg-slate-200' />
					<div className='h-3 w-full rounded bg-slate-200' />
					<div className='mt-2 h-3 w-5/6 rounded bg-slate-200' />
					<div className='mt-5 flex gap-2'>
						<div className='h-8 w-16 rounded-full bg-slate-200' />
						<div className='h-8 w-16 rounded-full bg-slate-200' />
					</div>
				</div>
			))}
		</section>
	)
}

function EmptyState({ query }) {
	return (
		<div className='rounded-2xl border border-slate-200 bg-white/70 p-8 text-center'>
			<div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-700'>
				<svg
					viewBox='0 0 24 24'
					className='h-6 w-6'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
				>
					<path d='M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h6' />
					<path d='M15 3h6v6' />
					<path d='M10 14l5-5 5 5' />
				</svg>
			</div>
			<h3 className='text-lg font-semibold text-slate-900'>No posts found</h3>
			<p className='mt-1 text-slate-500'>
				{query
					? `No results for “${query}”.`
					: 'Start by creating your first post.'}
			</p>
			<div className='mt-4'>
				<Link
					to='/create-post'
					className='inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:bg-violet-500'
				>
					<svg
						viewBox='0 0 24 24'
						className='h-5 w-5'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<path d='M12 5v14M5 12h14' />
					</svg>
					Create post
				</Link>
			</div>
		</div>
	)
}
