<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { LayoutDashboard, BookOpen, Users, LogOut, Settings } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const handleSignOut = async () => {
    await authStore.signOut()
    router.push('/login')
}
</script>

<template>
    <div class="min-h-screen bg-tech-bg flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-tech-surface border-r border-white/10 fixed h-full hidden md:flex flex-col">
            <div class="p-6 border-b border-white/10">
                <router-link to="/" class="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-neon-blue to-neon-purple truncate">
                    GKITI ADMIN
                </router-link>
            </div>
            
            <nav class="flex-1 p-4 space-y-2">
                <router-link to="/admin" active-class="bg-neon-blue/10 text-neon-blue border-neon-blue/50" 
                    class="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-text-secondary hover:text-white hover:bg-white/5 transition-all">
                    <LayoutDashboard class="w-5 h-5" /> Dashboard
                </router-link>
                <router-link to="/admin/courses" active-class="bg-neon-blue/10 text-neon-blue border-neon-blue/50" 
                    class="flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-text-secondary hover:text-white hover:bg-white/5 transition-all">
                    <BookOpen class="w-5 h-5" /> Courses
                </router-link>
            </nav>

            <div class="p-4 border-t border-white/10">
                <button @click="handleSignOut" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
                    <LogOut class="w-5 h-5" /> Sign Out
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 md:ml-64 p-8">
            <slot />
        </main>
    </div>
</template>
