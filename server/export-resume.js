import 'dotenv/config'
import mongoose from 'mongoose'
import fs from 'node:fs'
import { Application } from './models.js'

await mongoose.connect(process.env.MONGODB_URI)
fs.mkdirSync('resumes', { recursive: true })

const apps = await Application.find().select('+resume.data')
for (const a of apps) {
  const safe = `${a.fullName}_${a.role}`.replace(/[^\w-]+/g, '_')
  const file = `resumes/${safe}_${a._id}.pdf`
  fs.writeFileSync(file, a.resume.data)
  console.log('Saved', file)
}
console.log(`Done: ${apps.length} resume(s)`)
await mongoose.disconnect()