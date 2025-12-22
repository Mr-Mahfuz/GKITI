import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  // Add a new toast
  // type: 'success' | 'error' | 'info' | 'warning'
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now()
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  // Remove a toast by ID
  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  // Helper methods
  const success = (msg, duration) => addToast(msg, 'success', duration)
  const error = (msg, duration) => addToast(msg, 'error', duration)
  const info = (msg, duration) => addToast(msg, 'info', duration)
  const warning = (msg, duration) => addToast(msg, 'warning', duration)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
})
