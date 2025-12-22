<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const toast = useToastStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

const isPasswordMatching = computed(() => {
    return password.value && confirmPassword.value && password.value === confirmPassword.value
})

const handleSignUp = async () => {
    
    if (!name.value || !email.value || !phone.value || !password.value) {
        toast.warning("All fields are required")
        return
    }

    if (password.value !== confirmPassword.value) {
        toast.warning("Passwords do not match")
        return
    }

    if (password.value.length < 6) {
        toast.warning("Password must be at least 6 characters")
        return
    }

    loading.value = true
    try {
        // Pass metadata specifically so the trigger in Supabase can use it
        const { error } = await authStore.signUp(email.value, password.value, {
            full_name: name.value,
            phone: phone.value
        })
        
        if (error) throw error

        toast.success('Account created! Please check your email for the OTP code.')
        router.push(`/verify-otp?email=${encodeURIComponent(email.value)}`)
    } catch (error) {
        toast.error(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center pt-28 pb-12 px-4 relative overflow-hidden">
        <!-- Animated background orbs -->
        <div
            class="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-neon-pink/15 rounded-full blur-[100px] animate-pulse">
        </div>
        <div
            class="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-neon-purple/15 rounded-full blur-[100px] animate-pulse delay-700">
        </div>

        <div
            class="max-w-md w-full bg-tech-surface/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_#0000004d] relative z-10">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
                <p class="text-text-secondary">Join the elite community of technicians</p>
            </div>

            <form @submit.prevent="handleSignUp" class="space-y-4">
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input v-model="name" type="text" required
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-pink focus:ring-1 focus:ring-neon-pink shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="John Doe">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input v-model="email" type="email" required
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="student@gkiti.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input v-model="phone" type="tel" required
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="01712-345678">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input v-model="password" type="password" required
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="••••••••">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" required
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="••••••••">
                    <p v-if="password && confirmPassword && !isPasswordMatching" class="text-xs text-red-400 mt-1">Passwords do not match</p>
                </div>

                <button type="submit" :disabled="loading || !isPasswordMatching"
                    class="w-full py-4 rounded-xl bg-linear-to-r from-neon-pink to-neon-purple text-white font-bold text-lg hover:shadow-[0_0_25px_#f472b666] hover:-translate-y-0.5 transition-all duration-300 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed">
                     {{ loading ? 'Creating Account...' : 'Start Learning' }}
                </button>
            </form>

            <div class="mt-8 text-center text-text-secondary text-sm">
                Already have an account?
                <router-link to="/login"
                    class="text-neon-purple font-semibold hover:text-white transition hover:drop-shadow-[0_0_5px_#8b5cf699]">Sign
                    In</router-link>
            </div>
        </div>
    </div>
</template>
