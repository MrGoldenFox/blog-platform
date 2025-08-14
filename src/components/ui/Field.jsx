export default function Field({ type, id, label, placeholder, input }) {
	return (
		<div className='space-y-1'>
			<label htmlFor={id} className='text-sm font-medium text-slate-700'>
				{label}
			</label>

			{type === 'textarea' ? (
				<textarea
					id={id}
					name={id}
					placeholder={placeholder}
					rows={8}
					className='w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-400 resize-none'
					required={false}
				/>
			) : (
				<input
					id={id}
					name={id}
					type={type}
					placeholder={placeholder}
					className='w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-violet-400'
					required={input}
				/>
			)}
		</div>
	)
}
