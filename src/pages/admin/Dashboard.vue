<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import { Users, BookOpen, DollarSign, Activity } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const stats = [
    { label: 'Total Students', value: '1,234', icon: Users, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
    { label: 'Total Courses', value: '12', icon: BookOpen, color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
    { label: 'Revenue ( This Month )', value: '৳ 45,000', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Enrollments ( Today )', value: '5', icon: Activity, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
]
</script>

<template>
    <AdminLayout>
        <h1 class="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="stat in stats" :key="stat.label" class="bg-tech-surface border border-white/10 rounded-2xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <div :class="['p-3 rounded-xl', stat.bg]">
                        <component :is="stat.icon" class="w-6 h-6" :class="stat.color" />
                    </div>
                </div>
                <h3 class="text-3xl font-bold text-white mb-1">{{ stat.value }}</h3>
                <p class="text-text-secondary text-sm">{{ stat.label }}</p>
            </div>
        </div>

        <!-- Placeholder charts or tables could go here -->
    </AdminLayout>
</template>
