import cors from 'cors'
import 'dotenv/config.js'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/error.js'
import postRoutes from './routes/postRoutes.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
connectDB(process.env.MONGODB_URI)
	.then(() =>
		app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`))
	)
	.catch(err => {
		console.error('DB failed:', err.message)
		process.exit(1)
	})
