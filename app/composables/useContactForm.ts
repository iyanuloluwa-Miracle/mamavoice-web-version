import { ref, reactive } from 'vue'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function useContactForm() {
  const formData = reactive<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const errors = reactive<FormErrors>({})
  const isLoading = ref(false)
  const isSuccess = ref(false)
  const isError = ref(false)

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validateField(field: keyof FormData): boolean {
    delete errors[field as keyof FormErrors]

    switch (field) {
      case 'name':
        if (!formData.name.trim()) {
          errors.name = 'errNameRequired'
          return false
        }
        if (formData.name.trim().length < 2) {
          errors.name = 'errNameMin'
          return false
        }
        break
      case 'email':
        if (!formData.email.trim()) {
          errors.email = 'errEmailRequired'
          return false
        }
        if (!validateEmail(formData.email)) {
          errors.email = 'errEmailInvalid'
          return false
        }
        break
      case 'subject':
        if (!formData.subject) {
          errors.subject = 'errSubjectRequired'
          return false
        }
        break
      case 'message':
        if (!formData.message.trim()) {
          errors.message = 'errMessageRequired'
          return false
        }
        if (formData.message.trim().length < 10) {
          errors.message = 'errMessageMin'
          return false
        }
        break
    }
    return true
  }

  function validateAll(): boolean {
    const fields: Array<keyof FormData> = ['name', 'email', 'subject', 'message']
    return fields.map(validateField).every(Boolean)
  }

  async function submitForm(): Promise<void> {
    if (!validateAll()) return

    isLoading.value = true
    isError.value = false

    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: formData.subject,
          message: formData.message.trim(),
        },
      })
      isSuccess.value = true
    }
    catch {
      isError.value = true
    }
    finally {
      isLoading.value = false
    }
  }

  function reset(): void {
    formData.name = ''
    formData.email = ''
    formData.phone = ''
    formData.subject = ''
    formData.message = ''
    Object.keys(errors).forEach(k => delete errors[k as keyof FormErrors])
    isSuccess.value = false
    isError.value = false
  }

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    isError,
    validateField,
    submitForm,
    reset,
  }
}
