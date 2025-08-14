import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/containers/Header'
import CreatePost from './pages/CreatePost'
import Home from './pages/Home'

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className='px-[5vw] py-2 md:py-5'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}
