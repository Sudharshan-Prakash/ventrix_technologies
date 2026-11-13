import mongoose from 'mongoose'
const { Schema, model } = mongoose

export const SERVICES = [
  'Web Development', 'Mobile Apps', 'UI/UX Design', 'AI Solutions',
  'Cloud Engineering', 'SaaS Platforms', 'Enterprise Software', 'Automation Systems',
]
export const ROLES = ['Full Stack Developer', 'UI/UX Designer', 'Flutter Developer', 'AI Engineer']

const str = (max) => ({ type: String, required: true, trim: true, maxlength: max })
const email = { ...str(254), lowercase: true }
const status = { type: String, enum: ['new', 'reviewed', 'closed'], default: 'new' }

export const Enquiry = model('Enquiry', new Schema({
  name: str(100), email, company: str(150),
  service: { type: String, required: true, enum: SERVICES },
  status,
}, { timestamps: true }))

export const Application = model('Application', new Schema({
  role: { type: String, required: true, enum: ROLES },
  fullName: str(100), email, portfolio: str(300), coverNote: str(3000),
  resume: {
    data: { type: Buffer, required: true, select: false }, // not loaded unless asked for
    contentType: String, size: Number, originalName: String,
  },
  status,
}, { timestamps: true }))

export const Contact = model('Contact', new Schema({
  name: str(100), email, phone: str(30), subject: str(150), message: str(3000),
  status,
}, { timestamps: true }))