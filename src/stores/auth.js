import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const router = useRouter()

  const role = ref('student')
  const isAdmin = computed(() => role.value === 'admin')

  // Initialize session
  const init = async () => {
    loading.value = true
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      user.value = session.user
      await fetchRole(session.user.id)
    }

    supabase.auth.onAuthStateChange(async (_event, _session) => {
      user.value = _session ? _session.user : null
      if (_session) {
        await fetchRole(_session.user.id)
      } else {
        role.value = 'student'
      }
    })
    loading.value = false
  }

  const fetchRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!error && data) {
        role.value = data.role
      }
    } catch (e) {
      console.error('Error fetching role:', e)
    }
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
    if (data.user) {
      await fetchRole(data.user.id)
    }
    return { data }
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
      await fetchRole(data.user.id)
      router.push(isAdmin.value ? '/admin' : '/dashboard')
    }
    return { data, error }
  }

  // Sign Out
  const signOut = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (!error) {
      user.value = null
      role.value = 'student'
      router.push('/login')
    }
    loading.value = false
  }

  return {
    user,
    session,
    role,
    isAdmin,
    loading,
    init,
    signUp,
    signIn,
    signOut,
    verifyOtp
  }
})
