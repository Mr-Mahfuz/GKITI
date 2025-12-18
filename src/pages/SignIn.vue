<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
    <div class="min-h-screen flex items-center justify-center pt-28 pb-12 px-4 relative overflow-hidden">
        <!-- Animated background orbs -->
        <div
            class="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse">
        </div>
        <div
            class="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-neon-blue/15 rounded-full blur-[100px] animate-pulse delay-700">
        </div>

        <div
            class="max-w-md w-full bg-tech-surface/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_#0000004d] relative z-10">
            <div class="text-center mb-8">
                <div
                    class="w-16 h-16 bg-neon-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-neon-blue border border-neon-blue/30 shadow-[0_0_20px_#06b6d433]">
                    <!-- Simple Logo Placeholder -->
                    <span class="text-2xl font-bold">G</span>
                </div>
                <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p class="text-text-secondary">Sign in to access your course dashboard</p>
            </div>

            <form class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input v-model="email" type="email"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="student@gkiti.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input v-model="password" type="password"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="••••••••">
                </div>

                <div class="flex items-center justify-between text-sm">
                    <label
                        class="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-white transition">
                        <input type="checkbox"
                            class="rounded bg-tech-bg border-white/10 text-neon-blue focus:ring-offset-0 focus:ring-1 checkbox-glow">
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="text-neon-blue hover:text-neon-purple transition hover:underline">Forgot
                        Password?</a>
                </div>

                <button
                    class="w-full py-4 rounded-xl bg-linear-to-r from-neon-blue to-neon-purple text-white font-bold text-lg hover:shadow-[0_0_25px_#06b6d466] hover:-translate-y-0.5 transition-all duration-300 border border-white/10">
                    Sign In to Dashboard
                </button>
            </form>

            <div class="mt-8 text-center text-text-secondary text-sm">
                Don't have an account?
                <router-link to="/signup"
                    class="text-neon-blue font-semibold hover:text-neon-purple transition hover:drop-shadow-[0_0_5px_#06b6d499]">Sign
                    Up Now</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checkbox-glow:checked {
    box-shadow: 0 0 10px #06b6d4;
    border-color: #06b6d4;
}
</style>
