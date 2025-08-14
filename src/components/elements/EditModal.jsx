import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function EditModal({ post, open, onClose, onSave }) {
	if (!open) return null
	return createPortal(
		<EditDialog post={post} onClose={onClose} onSave={onSave} />,
		document.body
	)
}

function EditDialog({ post, onClose, onSave }) {
	const [title, setTitle] = useState(post?.title || '')
	const [author, setAuthor] = useState(post?.author || '')
	const [content, setContent] = useState(post?.content || '')
	const [saving, setSaving] = useState(false)
	const firstInputRef = useRef(null)

	useEffect(() => {
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		firstInputRef.current?.focus()
		const onKey = e => e.key === 'Escape' && onClose()
		window.addEventListener('keydown', onKey)
		return () => {
			document.body.style.overflow = prev
			window.removeEventListener('keydown', onKey)
		}
	}, [onClose])

	const submit = async e => {
		e.preventDefault()
		setSaving(true)
		await onSave({
			title: title.trim() || 'Untitled',
			author: author.trim(),
			content,
		})
		setSaving(false)
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
			onClick={onClose}
			role='dialog'
			aria-modal='true'
		>
			<form
				onClick={e => e.stopPropagation()}
				onSubmit={submit}
				className='w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl'
			>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-xl font-semibold text-slate-900'>Edit post</h2>
					<button
						type='button'
						onClick={onClose}
						className='rounded-full p-1 text-slate-500 hover:bg-slate-100'
						aria-label='Close'
					>
						<svg
							viewBox='0 0 24 24'
							className='h-5 w-5'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<path d='M18 6 6 18M6 6l12 12' />
						</svg>
					</button>
				</div>

				<label className='mb-2 block text-sm font-medium text-slate-700'>
					Title
				</label>
				<input
					ref={firstInputRef}
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='mb-4 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-400'
					placeholder='Post title'
				/>

				<label className='mb-2 block text-sm font-medium text-slate-700'>
					Author
				</label>
				<input
					value={author}
					onChange={e => setAuthor(e.target.value)}
					className='mb-4 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-400'
					placeholder='Your name'
				/>

				<label className='mb-2 block text-sm font-medium text-slate-700'>
					Content
				</label>
				<textarea
					value={content}
					onChange={e => setContent(e.target.value)}
					rows={8}
					className='mb-5 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-400 resize-none'
					placeholder='Write something…'
				/>

				<div className='flex items-center justify-end gap-2'>
					<button
						type='button'
						onClick={onClose}
						className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50'
						disabled={saving}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-violet-500 disabled:opacity-60'
						disabled={saving}
					>
						{saving ? (
							<>
								<span className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
								Saving...
							</>
						) : (
							<>
								<svg
									viewBox='0 0 24 24'
									className='h-5 w-5'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path d='M5 12l5 5L20 7' />
								</svg>
								Save
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	)
}
