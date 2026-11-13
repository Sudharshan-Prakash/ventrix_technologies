import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import routes from './routes.js'

const { MONGODB_URI, CLIENT_URL = 'http://localhost:5173', PORT = 5000 } = process.env
if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing. Check server/.env')
  process.exit(1)
}

const app = express()
app.set('trust proxy', 1) // Render sits behind a proxy; needed for correct rate limiting
app.use(helmet())

const allowed = CLIENT_URL.split(',').map((s) => s.trim())
app.use(cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin) ? cb(null, true) : cb(new Error('CORS'))),
}))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20, // 20 requests per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
}), routes)

app.use((err, _req, res, _next) => {
  if (err.name === 'MulterError')
    return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'Resume must be 2 MB or smaller.' : 'Invalid file upload.' })
  if (err.message === 'Only PDF files are allowed.') return res.status(400).json({ error: err.message })
  if (err.message === 'CORS') return res.status(403).json({ error: 'Origin not allowed.' })
  console.error(err)
  res.status(500).json({ error: 'Something went wrong. Please try again.' })
})

mongoose.connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`API running on port ${PORT}`)))
  .catch((err) => { console.error('MongoDB connection failed:', err.message); process.exit(1) })