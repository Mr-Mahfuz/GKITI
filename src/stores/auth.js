import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const router = useRouter()

  // Initialize session
  const init = async () => {
    const { data } = await supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user

    supabase.auth.onAuthStateChange((_event, _session) => {
      session.value = _session
      user.value = _session?.user
    })
  }

  // Sign Up
  const signUp = async (email, password, metadata = {}) => {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    loading.value = false
    if (error) throw error
    return { data, error }
  }

  // Sign In
  const signIn = async (email, password) => {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    loading.value = false
    if (error) throw error
    router.push('/dashboard') // Redirect to dashboard after login
    return data
  }

  // Verify OTP
  const verifyOtp = async (email, token) => {
    loading.value = true
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    })
    loading.value = false
    if (error) throw error
    if (data.session) {
      user.value = data.user
      router.push('/dashboard')
    }
    return { data, error }
  }

  // Sign Out
  const signOut = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (!error) {
      user.value = null
      router.push('/login')
    }
    loading.value = false
  }

  return {
    user,
    session,
    loading,
    init,
    signUp,
    signIn,
    signOut,
    verifyOtp
  }
})
