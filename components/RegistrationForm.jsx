
import React, { useEffect, useRef, useState } from 'react'
import { useCustomer } from '../context/CustomerContext.jsx'
import { isEmail, isPhone, isPasswordStrong } from '../validators.js'

const categories = ['Fashion','Electronics','Groceries','Beauty','Home']

export default function RegistrationForm(){
  const { actions } = useCustomer()
  const [form, setForm] = useState({
    role:'user', name:'', email:'', phone:'', password:'',
    favoriteCategories:[], communicationMode:'Email', photoURL:''
  })
  const [preview, setPreview] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})           // NEW: track user interaction
  const [showErrors, setShowErrors] = useState(false)  // NEW: show after submit attempt
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const validate = () => {
    const e = {}
    if(!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if(!isEmail(form.email)) e.email = 'Invalid email'
    if(!isPhone(form.phone.replace(/\D/g,''))) e.phone = 'Phone must be 10–15 digits'
    if(!isPasswordStrong(form.password)) e.password = 'Password must be 8+ chars with upper, lower, digit & special'
    return e
  }

  // Keep validation up-to-date internally (for disabling submit), but don't show yet.
  useEffect(() => {
    setErrors(validate())
  }, [form])

  const onFile = (ev) => {
    const file = ev.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      setForm(f => ({ ...f, photoURL: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    // Once user tries to submit, we allow errors to be displayed.
    setShowErrors(true)

    const e = validate()
    setErrors(e)

    if(Object.keys(e).length > 0){
      // Focus first invalid field
      const id = Object.keys(e)[0]
      const el = document.getElementById(id)
      if(el) el.focus()
      return
    }

    setSubmitting(true)
    const res = await actions.register({
      role: form.role,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      preferences: {
        favoriteCategories: form.favoriteCategories,
        communicationMode: form.communicationMode
      },
      photoURL: form.photoURL
    })
    setSubmitting(false)
    if(res.ok){
      alert('Registered! Please login.')
      window.location.assign('/login')
    } else {
      alert(res.error || 'Registration failed')
    }
  }

  const toggleCategory = (c) => {
    setForm(f => {
      const has = f.favoriteCategories.includes(c)
      return { ...f, favoriteCategories: has ? f.favoriteCategories.filter(x => x !== c) : [...f.favoriteCategories, c] }
    })
  }

  // Helper: render error only if field was touched or submit attempted
  const shouldShowError = (field) => (showErrors || touched[field]) && !!errors[field]

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-label="Customer registration">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Register as</span>
        {['user','admin'].map(r => (
          <label key={r} className="inline-flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="role"
              checked={form.role===r}
              onChange={() => setForm(f => ({ ...f, role:r }))}
            /> {r.toUpperCase()}
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          id="name" type="text"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, name:true }))}              // NEW
          aria-invalid={shouldShowError('name')}
          aria-describedby={shouldShowError('name') ? 'err-name' : ''}
        />
        {shouldShowError('name') && (
          <p id="err-name" role="alert" className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email" type="email"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email:e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, email:true }))}             // NEW
          aria-invalid={shouldShowError('email')}
          aria-describedby={shouldShowError('email') ? 'err-email' : ''}
        />
        {shouldShowError('email') && (
          <p id="err-email" role="alert" className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input
          id="phone" type="tel"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone:e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, phone:true }))}             // NEW
          aria-invalid={shouldShowError('phone')}
          aria-describedby={shouldShowError('phone') ? 'err-phone' : ''}
        />
        {shouldShowError('phone') && (
          <p id="err-phone" role="alert" className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          id="password" type="password"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password:e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, password:true }))}          // NEW
          aria-invalid={shouldShowError('password')}
          aria-describedby={shouldShowError('password') ? 'err-password' : ''}
        />
        {shouldShowError('password') && (
          <p id="err-password" role="alert" className="text-red-600 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <fieldset className="mt-2">
        <legend className="text-sm font-medium">Preferences (user role)</legend>
        <div className="mt-1">
          <p className="text-xs text-gray-600">Favorite categories</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map(c => (
              <button
                type="button"
                key={c}
                onClick={() => toggleCategory(c)}
                className={`px-3 py-1 rounded border ${form.favoriteCategories.includes(c) ? 'bg-emerald-50 border-emerald-400' : 'bg-gray-50 border-gray-300'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs text-gray-600">Communication</span>
          {['Email','SMS','WhatsApp'].map(m => (
            <label key={m} className="inline-flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="comm"
                checked={form.communicationMode===m}
                onChange={() => setForm(f => ({ ...f, communicationMode:m }))}
              /> {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-2">
        <label className="block text-sm font-medium">Profile picture (optional)</label>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFile} className="mt-1" />
        {preview && <img src={preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />}
      </div>

      <div className="flex items-center justify-end gap-3 mt-4">
        <button
          type="submit"
          className="btn-primary btn-lg"
          disabled={submitting || Object.keys(errors).length > 0}
        >
          {submitting ? 'Submitting…' : 'Register'}
        </button>
      </div>
    </form>
  )
}
