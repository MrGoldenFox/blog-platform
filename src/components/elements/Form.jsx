import { useRef, useState } from 'react'
import { formFields } from '../../constants/Form'
import Field from '../ui/Field'

export default function Form() {
	const formRef = useRef(null)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		const form = formRef.current
		if (!form) return

		const fd = new FormData(form)
		const data = Object.fromEntries(fd.entries())

		const payload = {
			title: (data.name || '').trim() || 'Untitled',
			author: (data.author || '').trim() || 'Anonymous',
			content: (data.description || '').trim(),
		}

		try {
			setSubmitting(true)
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})
			if (!res.ok) throw new Error(await res.text())
			form.reset()
			alert('Success')
		} catch (err) {
			setError(err.message || 'Failed to create post')
			alert('catch error')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className='space-y-4 md:max-w-1/2 mx-auto bg-white p-4 rounded-md shadow-2xs'
		>
			{formFields.map(field => (
				<Field key={field.id} {...field} />
			))}

			{error && (
				<p className='rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-700'>
					{error}
				</p>
			)}

			<button
				type='submit'
				disabled={submitting}
				className='rounded-xl bg-violet-600 px-4 py-2 font-medium text-white disabled:opacity-60'
			>
				{submitting ? 'Saving…' : 'Submit'}
			</button>
		</form>
	)
}
