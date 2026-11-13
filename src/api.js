const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')

const request = async (path, options) => {
  const res = await fetch(`${API}/api${path}`, options)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

const json = (data) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})

export const submitEnquiry = (values) => request('/enquiries', json(values))
export const submitContact = (values) => request('/contact', json(values))
export const submitApplication = (formData) => request('/applications', { method: 'POST', body: formData })