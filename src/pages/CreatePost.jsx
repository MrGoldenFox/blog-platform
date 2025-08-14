import Form from '../components/elements/Form'

export default function CreatePost() {
	return (
		<div className='min-h-[calc(100vh-5rem)] px-4 py-10 bg-gradient-to-b from-violet-50 to-white rounded-4xl'>
			<h1 className='mb-6 text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500'>
				Create new post
			</h1>
			<Form />
		</div>
	)
}
