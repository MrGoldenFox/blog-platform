export default function TextArea(props) {
	const {
		id,
		label,
		placeholder,
		rows = 6,
		autoComplete = 'off',
		required,
	} = props

	return (
		<div>
			<label htmlFor={id} className='pt-2 pb-1 block'>
				{label}
			</label>
			<textarea
				id={id}
				name={id}
				placeholder={placeholder}
				rows={rows}
				autoComplete={autoComplete}
				required={required}
				className='border-1 border-black/20 block px-2 py-1 rounded-md outline-0 w-full resize-none'
			/>
		</div>
	)
}
