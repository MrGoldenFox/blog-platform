import { Link } from 'react-router-dom'
import logo from '/assets/logo.svg'

export default function Header() {
	return (
		<header className='h-16 py-2 px-[5vw] w-full shadow-2xs flex items-center gap-1 justify-between'>
			<div className='flex items-center gap-1 h-16'>
				<img src={logo} alt='logo' className='h-full' />
				<p>Welcome</p>
			</div>
			<nav>
				<ul className='flex items-center'>
					<li>
						<Link to={'/'} className='px-2'>
							Home
						</Link>
					</li>
					<li>
						<Link to={'/create-post'} className='px-2'>
							Create new post
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
