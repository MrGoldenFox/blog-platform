export default function Input(props) {
	const {
		id,
		label,
		type = 'text',
		placeholder,
		autoComplete = 'off',
		required,
	} = props

	return (
		<div>
			<label htmlFor={id} className='pt-2 pb-1 block'>
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				required={required}
				className='border-1 border-black/20 block px-2 py-1 rounded-md outline-0 w-full'
			/>
		</div>
	)
}
