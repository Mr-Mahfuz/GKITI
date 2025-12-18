<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
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

            <form class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input v-model="name" type="text"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-pink focus:ring-1 focus:ring-neon-pink shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="John Doe">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input v-model="email" type="email"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="student@gkiti.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input v-model="password" type="password"
                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue shadow-inner outline-none transition placeholder-gray-600"
                        placeholder="••••••••">
                </div>

                <button
                    class="w-full py-4 rounded-xl bg-linear-to-r from-neon-pink to-neon-purple text-white font-bold text-lg hover:shadow-[0_0_25px_#f472b666] hover:-translate-y-0.5 transition-all duration-300 border border-white/10">
                    Start Learning
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
