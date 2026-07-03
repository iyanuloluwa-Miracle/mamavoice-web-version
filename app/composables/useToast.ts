import { ref, readonly } from 'vue'

interface ToastItem {
  id: number
  type: 'success' | 'error' | 'info'
  message: string
}

const toasts = ref<ToastItem[]>([])
let _id = 0

export function useToast() {
  function add(type: ToastItem['type'], message: string, duration = 4000) {
    const id = _id++
    toasts.value.push({ id, type, message })
    setTimeout(() => dismiss(id), duration)
  }

  function dismiss(id: number) {
    const i = toasts.value.findIndex(t => t.id === id)
    if (i !== -1) toasts.value.splice(i, 1)
  }

  return {
    toasts: readonly(toasts),
    success: (msg: string) => add('success', msg),
    error:   (msg: string) => add('error',   msg),
    info:    (msg: string) => add('info',     msg),
    dismiss,
  }
}
