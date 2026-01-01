import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { FormEvent, useEffect, useRef, useState } from 'react'
import Button from '../components/Button'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null,
  })

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  }

  const itemVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
    hidden: { opacity: 0, y: 30 },
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (data: typeof formData) => {
    const nextErrors: {
      name?: string
      email?: string
      message?: string
    } = {}

    const name = data.name.trim()
    const email = data.email.trim()
    const message = data.message.trim()

    if (name.length < 2) nextErrors.name = 'Please enter your full name.'
    if (name.length > 80) nextErrors.name = 'Name is too long.'

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) nextErrors.email = 'Please enter a valid email address.'

    if (message.length < 10)
      nextErrors.message = 'Message should be at least 10 characters.'
    if (message.length > 2000)
      nextErrors.message = 'Message is too long (max 2000 characters).'

    return nextErrors
  }

  const handleSubmitForm = () => {
    if (formRef.current && !status.submitting) {
      if (typeof formRef.current.requestSubmit === 'function') {
        formRef.current.requestSubmit()
      } else {
        formRef.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic bot mitigation (honeypot)
    if (honeypot.trim().length > 0) {
      setStatus({ submitting: false, submitted: true, error: null })
      setFormData({ name: '', email: '', message: '' })
      setHoneypot('')
      setFieldErrors({})
      return
    }

    const nextErrors = validate(formData)
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      setStatus({ submitting: false, submitted: false, error: null })
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        submitting: false,
        submitted: false,
        error:
          'Contact form is not configured yet. Please email me directly instead.',
      })
      return
    }

    setStatus({ submitting: true, submitted: false, error: null })

    try {
      await emailjs.send(serviceId, templateId, {
        name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        time: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      })

      setStatus({ submitting: false, submitted: true, error: null })
      setFormData({ name: '', email: '', message: '' })
      setHoneypot('')
      setFieldErrors({})
    } catch (error: any) {
      const errorMessage =
        error.text || 'Failed to send message. Please try again.'
      setStatus({
        submitting: false,
        submitted: false,
        error: errorMessage,
      })
    }
  }

  return (
    <motion.div
      className='contact'
      id='contact'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 className='contact-title' variants={itemVariants} custom={0}>
        What&apos;s Next?
      </motion.h2>
      <motion.h2
        className='contact-sub-title'
        variants={itemVariants}
        custom={1}
      >
        Get In Touch
      </motion.h2>
      <motion.p className='contact-text' variants={itemVariants} custom={2}>
        I&apos;m always looking for new opportunities, and my inbox is always
        open. Whether you have a question or just want to say hi, I&apos;ll try
        my best to get back to you!
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className='contact-form'
        variants={itemVariants}
        custom={3}
        noValidate
      >
        <input
          type='text'
          name='company'
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete='off'
          aria-hidden='true'
          style={{ display: 'none' }}
        />

        <div className='form-group'>
          <motion.input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Your Name'
            className={`form-input ${fieldErrors.name ? 'is-invalid' : ''}`}
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            aria-describedby={
              fieldErrors.name ? 'contact-name-error' : undefined
            }
            whileFocus={{ scale: 1.05 }}
          />
          {fieldErrors.name && (
            <div
              id='contact-name-error'
              className='field-error-text'
              role='alert'
            >
              {fieldErrors.name}
            </div>
          )}
        </div>

        <div className='form-group'>
          <motion.input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Your Email'
            className={`form-input ${fieldErrors.email ? 'is-invalid' : ''}`}
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
            aria-describedby={
              fieldErrors.email ? 'contact-email-error' : undefined
            }
            whileFocus={{ scale: 1.05 }}
          />
          {fieldErrors.email && (
            <div
              id='contact-email-error'
              className='field-error-text'
              role='alert'
            >
              {fieldErrors.email}
            </div>
          )}
        </div>

        <div className='form-group'>
          <motion.textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Your Message'
            className={`form-textarea ${
              fieldErrors.message ? 'is-invalid' : ''
            }`}
            aria-invalid={fieldErrors.message ? 'true' : 'false'}
            aria-describedby={
              fieldErrors.message ? 'contact-message-error' : undefined
            }
            whileFocus={{ scale: 1.05 }}
          />
          {fieldErrors.message && (
            <div
              id='contact-message-error'
              className='field-error-text'
              role='alert'
            >
              {fieldErrors.message}
            </div>
          )}
        </div>

        <motion.div className='contact-cta' variants={itemVariants} custom={4}>
          <Button
            text={status.submitting ? 'Sending...' : 'Send Message'}
            link='#'
            variant='primary'
            size='lg'
            className={`send-message-btn ${
              status.submitting ? 'disabled' : ''
            }`}
            onClick={status.submitting ? undefined : handleSubmitForm}
            disabled={status.submitting}
          />
        </motion.div>

        {status.submitted && (
          <motion.div
            className='success-message'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            role='status'
            aria-live='polite'
          >
            Message sent successfully!
          </motion.div>
        )}

        {status.error && (
          <motion.div
            className='error-message'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            role='alert'
            aria-live='polite'
          >
            {status.error}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  )
}

export default Contact
