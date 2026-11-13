import { Router } from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import crypto from 'node:crypto'
import { Enquiry, Application, Contact, SERVICES, ROLES } from './models.js'

const router = Router()
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINK = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i
const PHONE = /^[+\d][\d\s()-]{6,24}$/

// Only accept plain strings. Objects like {"$gt": ""} become '' (blocks NoSQL injection)
const clean = (body, keys) =>
  Object.fromEntries(keys.map((k) => [k, typeof body?.[k] === 'string' ? body[k].trim() : '']))

const required = (d, errors, labels) => {
  for (const [k, label] of Object.entries(labels)) if (!d[k]) errors[k] = `${label} is required.`
}

const reject = (res, errors) =>
  res.status(400).json({ error: Object.values(errors)[0], errors })

// --- Enquiries (Start Your Project form) ---
router.post('/enquiries', async (req, res, next) => {
  try {
    const d = clean(req.body, ['name', 'email', 'company', 'service'])
    const errors = {}
    required(d, errors, { name: 'Name', email: 'Email', company: 'Company name', service: 'Service' })
    if (d.email && !EMAIL.test(d.email)) errors.email = 'Enter a valid email address.'
    if (d.service && !SERVICES.includes(d.service)) errors.service = 'Choose a valid service.'
    if (Object.keys(errors).length) return reject(res, errors)

    await Enquiry.create(d)
    res.status(201).json({ ok: true })
  } catch (err) { next(err) }
})

// --- Contact form (name, email, phone, subject, message) ---
router.post('/contact', async (req, res, next) => {
  try {
    const d = clean(req.body, ['name', 'email', 'phone', 'subject', 'message'])
    const errors = {}
    required(d, errors, { name: 'Name', email: 'Email', phone: 'Phone', subject: 'Subject', message: 'Message' })
    if (d.email && !EMAIL.test(d.email)) errors.email = 'Enter a valid email address.'
    if (d.phone && !PHONE.test(d.phone)) errors.phone = 'Enter a valid phone number.'
    if (Object.keys(errors).length) return reject(res, errors)

    await Contact.create(d)
    res.status(201).json({ ok: true })
  } catch (err) { next(err) }
})

// --- Job applications (with PDF resume) ---
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 }, // 2 MB
  fileFilter: (_req, file, cb) =>
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files are allowed.')),
})

router.post('/applications', upload.single('resume'), async (req, res, next) => {
  try {
    const d = clean(req.body, ['role', 'fullName', 'email', 'portfolio', 'coverNote'])
    const errors = {}
    required(d, errors, { fullName: 'Full name', email: 'Email', portfolio: 'Portfolio or LinkedIn link', coverNote: 'Cover note' })
    if (!ROLES.includes(d.role)) errors.role = 'Choose a valid role.'
    if (d.email && !EMAIL.test(d.email)) errors.email = 'Enter a valid email address.'
    if (d.portfolio && !LINK.test(d.portfolio)) errors.portfolio = 'Enter a valid link.'
    if (d.coverNote && d.coverNote.length < 30) errors.coverNote = 'Cover note must be at least 30 characters.'
    if (!req.file) errors.resume = 'Resume (PDF) is required.'
    // Real PDFs start with "%PDF-", so a renamed .exe is rejected even if the header says PDF
    else if (req.file.buffer.subarray(0, 5).toString() !== '%PDF-') errors.resume = 'That file is not a valid PDF.'
    if (Object.keys(errors).length) return reject(res, errors)

    await Application.create({
      ...d,
      resume: {
        data: req.file.buffer,
        contentType: 'application/pdf',
        size: req.file.size,
        originalName: req.file.originalname.slice(0, 200),
      },
    })
    res.status(201).json({ ok: true })
  } catch (err) { next(err) }
})

// --- Admin only: download a resume (send header  x-admin-key: <ADMIN_KEY>) ---
const isAdmin = (req) => {
  const key = Buffer.from(process.env.ADMIN_KEY || '')
  const given = Buffer.from(String(req.get('x-admin-key') || ''))
  return key.length > 0 && key.length === given.length && crypto.timingSafeEqual(key, given)
}

router.get('/applications/:id/resume', async (req, res, next) => {
  try {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'Not found' })
    const doc = await Application.findById(req.params.id).select('+resume.data')
    if (!doc) return res.status(404).json({ error: 'Not found' })
    const name = doc.fullName.replace(/[^\w-]+/g, '_')
    res
      .set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${name}_resume.pdf"` })
      .send(doc.resume.data)
  } catch (err) { next(err) }
})

export default router