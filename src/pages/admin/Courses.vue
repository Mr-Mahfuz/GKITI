<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'
import { supabase } from '../../lib/supabase'
import { useToastStore } from '../../stores/toast'
import { Edit, Trash2, Plus, X, Image } from 'lucide-vue-next'

const toast = useToastStore()
const courses = ref([])
const loading = ref(false)
const showModal = ref(false)
const saving = ref(false)
const isEditing = ref(false)

const form = ref({
    id: null,
    title: '',
    description: '',
    price: '',
    duration: '',
    icon: 'Code' // default
})

const icons = ['Code', 'Cpu', 'Database', 'Globe', 'Smartphone', 'Terminal', 'Wifi', 'PenTool', 'Monitor']

onMounted(() => {
    fetchCourses()
})

const fetchCourses = async () => {
    loading.value = true
    const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
    if (error) {
        toast.error('Failed to fetch courses')
    } else {
        courses.value = data
    }
    loading.value = false
}

const openAddModal = () => {
    form.value = { id: null, title: '', description: '', price: '', duration: '', icon: 'Code' }
    isEditing.value = false
    showModal.value = true
}

const openEditModal = (course) => {
    form.value = { ...course }
    isEditing.value = true
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const saveCourse = async () => {
    if (!form.value.title || !form.value.price) {
        toast.warning('Title and Price are required')
        return
    }

    saving.value = true
    try {
        const courseData = {
            title: form.value.title,
            description: form.value.description,
            price: form.value.price,
            duration: form.value.duration,
            icon: form.value.icon
        }

        let error
        if (isEditing.value) {
            const { error: updateError } = await supabase
                .from('courses')
                .update(courseData)
                .eq('id', form.value.id)
            error = updateError
        } else {
            const { error: insertError } = await supabase
                .from('courses')
                .insert([courseData])
            error = insertError
        }

        if (error) throw error

        toast.success(isEditing.value ? 'Course updated' : 'Course created')
        closeModal()
        fetchCourses() // refresh list
    } catch (e) {
        toast.error('Error saving course: ' + e.message)
    } finally {
        saving.value = false
    }
}

const deleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
        const { error } = await supabase.from('courses').delete().eq('id', id)
        if (error) throw error
        toast.success('Course deleted')
        fetchCourses()
    } catch (e) {
        toast.error('Error deleting course: ' + e.message)
    }
}
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold text-white">Manage Courses</h1>
            <button @click="openAddModal" class="flex items-center gap-2 px-4 py-2 bg-neon-blue text-white font-bold rounded-lg hover:bg-neon-purple transition-all">
                <Plus class="w-5 h-5" /> Add New Course
            </button>
        </div>

        <div class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 text-text-secondary text-xs uppercase">
                        <tr>
                            <th class="px-6 py-4">Title</th>
                            <th class="px-6 py-4">Price</th>
                            <th class="px-6 py-4">Duration</th>
                            <th class="px-6 py-4">Icon</th>
                            <th class="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/10">
                        <tr v-for="course in courses" :key="course.id" class="hover:bg-white/5 transition-colors">
                            <td class="px-6 py-4 text-white font-bold">{{ course.title }}</td>
                            <td class="px-6 py-4 text-text-secondary">৳ {{ course.price }}</td>
                            <td class="px-6 py-4 text-text-secondary">{{ course.duration }}</td>
                            <td class="px-6 py-4 text-text-secondary">{{ course.icon }}</td>
                            <td class="px-6 py-4 flex gap-3">
                                <button @click="openEditModal(course)" class="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition">
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button @click="deleteCourse(course.id)" class="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="courses.length === 0 && !loading">
                            <td colspan="5" class="px-6 py-8 text-center text-text-secondary">No courses found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div class="bg-tech-surface border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-white">{{ isEditing ? 'Edit Course' : 'Add New Course' }}</h2>
                    <button @click="closeModal" class="text-text-secondary hover:text-white"><X class="w-6 h-6" /></button>
                </div>

                <form @submit.prevent="saveCourse" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input v-model="form.title" type="text" class="w-full bg-tech-bg/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea v-model="form.description" rows="3" class="w-full bg-tech-bg/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">Price</label>
                            <input v-model="form.price" type="number" class="w-full bg-tech-bg/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                            <input v-model="form.duration" type="text" placeholder="e.g. 3 Months" class="w-full bg-tech-bg/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue">
                        </div>
                    </div>
                    <div>
                         <label class="block text-sm font-medium text-gray-300 mb-1">Icon Name (Lucide)</label>
                         <select v-model="form.icon" class="w-full bg-tech-bg/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue">
                            <option v-for="icon in icons" :key="icon" :value="icon">{{ icon }}</option>
                         </select>
                    </div>

                    <div class="flex justify-end pt-4 gap-3">
                        <button type="button" @click="closeModal" class="px-4 py-2 text-text-secondary hover:text-white">Cancel</button>
                        <button type="submit" :disabled="saving" class="px-6 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-purple transition disabled:opacity-50">
                            {{ saving ? 'Saving...' : 'Save Course' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
