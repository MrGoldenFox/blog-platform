import { useRef, useState } from 'react'
import { formFields } from '../../constants/Form'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'

export default function Form() {
	const formRef = useRef(null)
	const [formKey, setFormKey] = useState(0)
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()

		const form = formRef.current
		if (!form) return

		const fd = new FormData(form)
		const data = Object.fromEntries(fd.entries())

		const payload = {
			title: data.name || 'Untitled',
			content: data.description,
			author: data.name || 'Anonymous',
		}

		try {
			setSubmitting(true)
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (!res.ok) {
				const txt = await res.text().catch(() => '')
				throw new Error(txt || `HTTP ${res.status}`)
			}

			const created = await res.json()

			form?.reset()
			setFormKey(k => k + 1)

			setTimeout(() => {
				alert('✅ Post created: ' + created.title)
			}, 0)
		} catch (err) {
			console.error(err)
			alert('❌ ' + err.message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<form
			ref={formRef}
			key={formKey}
			onSubmit={handleSubmit}
			autoComplete='off'
			className='
        mx-auto md:max-w-2xl
        my-6 rounded-2xl border border-slate-200
        bg-white/70 backdrop-blur p-6
        shadow-lg ring-1 ring-black/5
      '
		>
			<h2
				className='mb-4 text-2xl font-extrabold tracking-tight
                     bg-clip-text text-transparent
                     bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500'
			>
				Fill form
			</h2>

			<ul className='flex flex-col gap-4'>
				{formFields.map(field => {
					const Component = field.input ? Input : TextArea
					return (
						<li key={field.id}>
							<Component
								id={field.id}
								label={field.label}
								type={field.type}
								placeholder={field.placeholder}
								autoComplete='off'
								required
							/>
						</li>
					)
				})}
			</ul>

			<button
				type='submit'
				disabled={submitting}
				className={`
          mt-5 inline-flex items-center justify-center
          rounded-xl px-4 py-2.5 font-medium text-white
          bg-violet-600 shadow-md transition
          hover:bg-violet-500 focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-violet-400
          disabled:opacity-50 disabled:cursor-not-allowed
          ${submitting ? 'animate-pulse' : ''}
        `}
			>
				{submitting ? 'Saving…' : 'SUBMIT'}
			</button>
		</form>
	)
}
