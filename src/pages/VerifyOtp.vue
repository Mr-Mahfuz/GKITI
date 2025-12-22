<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const toast = useToastStore()
const route = useRoute()
const router = useRouter()

const email = ref(route.query.email || '')
const otp = ref('')
const loading = ref(false)

const handleVerify = async () => {
    if (!otp.value || otp.value.length < 6) {
        toast.warning('Please enter a valid 6-digit OTP')
        return
    }

    loading.value = true
    try {
        const { error } = await authStore.verifyOtp(email.value, otp.value)
        if (error) throw error
        
        toast.success('Email verified successfully! Welcome.')
        // Redirect is handled in auth store, but we can double check or just wait
    } catch (error) {
        toast.error(error.message || 'Verification failed')
    } finally {
        loading.value = false
    }
}

const handleResend = async () => {
    // Implement resend logic if needed, usually just signIn again or specific resend endpoint
    toast.info('Resend feature coming soon. Please try signing up again if code expired.')
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center pt-28 pb-12 px-4 relative overflow-hidden bg-tech-bg">
        <!-- Background Effects -->
        <div class="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px]"></div>

        <div class="max-w-md w-full bg-tech-surface/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 text-center">
            <h1 class="text-3xl font-bold text-white mb-2">Verify Email</h1>
            <p class="text-text-secondary mb-8">We sent a code to <span class="text-neon-blue">{{ email }}</span></p>

            <form @submit.prevent="handleVerify" class="space-y-6">
                <div>
                    <input v-model="otp" type="text" placeholder="Enter 6-digit Code" maxlength="6"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-widest text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600" />
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full py-4 rounded-xl bg-linear-to-r from-neon-blue to-neon-purple text-white font-bold text-lg hover:shadow-[0_0_25px_#06b6d466] hover:-translate-y-0.5 transition-all duration-300 border border-white/10 disabled:opacity-50">
                    {{ loading ? 'Verifying...' : 'Verify & Login' }}
                </button>
            </form>

            <div class="mt-6">
                <p class="text-text-secondary text-sm">Didn't receive code?</p>
                <button @click="handleResend" class="text-neon-blue hover:text-neon-purple font-medium text-sm mt-1 transition">
                    Resend Code
                </button>
            </div>
        </div>
    </div>
</template>
