export default function PostCard({ post, onEdit, onDelete }) {
	return (
		<article className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl'>
			<div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500' />
			<h3 className='mt-2 line-clamp-2 text-lg font-semibold text-slate-900'>
				{post.title}
			</h3>
			<p className='mt-1 text-sm text-slate-500'>
				by {post.author || 'Anonymous'}
			</p>
			<p className='mt-3 line-clamp-4 text-slate-700 whitespace-pre-wrap'>
				{post.content}
			</p>
			<div className='mt-4 flex gap-2'>
				<button
					onClick={() => onEdit(post)}
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
				</button>
				<button
					onClick={() => onDelete(post._id)}
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

				{/* optional route-based edit too */}
				{/* <Link to={`/edit/${post._id}`} className="...">Edit</Link> */}
			</div>
		</article>
	)
}
