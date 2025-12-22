<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { Code, Smartphone, Database, Layout } from 'lucide-vue-next'

const courses = ref([])
const loading = ref(true)

// Map icon strings from DB to components
const iconMap = {
    'Code': Code,
    'Smartphone': Smartphone,
    'Database': Database,
    'Layout': Layout
}

// Icon styling map
const iconColorMap = {
    'Code': "text-neon-blue",
    'Smartphone': "text-neon-purple",
    'Database': "text-neon-pink",
    'Layout': "text-cyan-400"
}

onMounted(async () => {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('id')
        
        if (error) throw error

        if (data) {
            courses.value = data.map(course => ({
                ...course,
                icon: iconMap[course.icon_name] || Code, // Fallback to Code icon
                iconColor: iconColorMap[course.icon_name] || "text-neon-blue"
            }))
        }
    } catch (error) {
        console.error('Error fetching courses:', error.message)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="pt-32 pb-20 min-h-screen relative overflow-hidden">
        <!-- Background Effects -->
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] -z-10"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] -z-10"></div>

        <div class="container mx-auto px-4 relative z-10">
            <h1 class="text-4xl md:text-5xl font-black text-white mb-4 text-center" data-aos="fade-up">
                Our <span class="text-gradient">Courses</span>
            </h1>
            <p class="text-text-secondary text-center mb-16 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                Choose from our wide range of professional computer courses and start your journey towards a successful career.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(course, index) in courses" :keyथ="course.id" 
                    class="bg-tech-surface border border-white/5 p-6 rounded-2xl hover:border-neon-blue/30 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden"
                    data-aos="fade-up" :data-aos-delay="index * 100">
                    
                    <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <component :is="course.icon" class="w-24 h-24" :class="course.iconColor" />
                    </div>

                    <div class="mb-6 relative z-10">
                        <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <component :is="course.icon" class="w-6 h-6" :class="course.iconColor" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">{{ course.title }}</h3>
                        <p class="text-text-secondary text-sm leading-relaxed">{{ course.description }}</p>
                    </div>

                    <div class="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                        <div>
                            <span class="block text-xs text-text-secondary">Duration</span>
                            <span class="text-sm font-semibold text-white">{{ course.duration }}</span>
                        </div>
                        <div class="text-right">
                             <span class="block text-xs text-text-secondary">Course Fee</span>
                             <span class="text-lg font-bold text-gradient">{{ course.price }}</span>
                        </div>
                    </div>
                    
                    <button class="w-full mt-6 py-2 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-neon-blue/20 hover:text-neon-blue transition-colors border border-white/5 hover:border-neon-blue/30">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
