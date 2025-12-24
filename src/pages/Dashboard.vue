<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
import { supabase } from '../lib/supabase'
import { useRouter, useRoute } from 'vue-router'
import { 
    User, BookOpen, Camera, Upload, Save, LogOut, 
    LayoutDashboard, Calendar, FileText, CreditCard, Settings,
    Clock, CheckCircle, AlertCircle, ChevronRight, Download
} from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToastStore()
const router = useRouter()
const route = useRoute()

const activeTab = ref('overview')
const loading = ref(false)
const uploading = ref(false)

// Watch for query params to switch tabs from navbar
watch(() => route.query.tab, (newTab) => {
    if (newTab) activeTab.value = newTab
}, { immediate: true })

const profile = ref({
    full_name: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    date_of_birth: '',
    nationality: 'Bangladeshi',
    religion: 'Islam',
    father_name: '',
    mother_name: '',
    avatar_url: null,
    nid_url: null
})

// Expanded Dummy Data
const stats = ref([
    { label: 'Enrolled Courses', value: '2', icon: BookOpen, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
    { label: 'Attendance', value: '85%', icon: Clock, color: 'text-neon-green', bg: 'bg-neon-green/10' },
    { label: 'Assignments', value: '12/15', icon: FileText, color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
    { label: 'Certificates', value: '0', icon: CheckCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
])

const activeCourses = ref([
    { 
        id: 1, 
        title: 'Web Development with Vue 3', 
        progress: 45, 
        next_class: 'Tuesday, 4:00 PM', 
        instructor: 'Mahfuz Sir',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'
    },
    { 
        id: 2, 
        title: 'Hardware & Mobile Servicing', 
        progress: 12, 
        next_class: 'Wednesday, 2:00 PM', 
        instructor: 'Technical Team',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=600'
    }
])

const assignments = ref([
    { id: 1, title: 'Build a Personal Portfolio', course: 'Web Development', due_date: '2024-03-20', status: 'Pending' },
    { id: 2, title: 'Mobile Component Identification', course: 'Hardware', due_date: '2024-03-15', status: 'Submitted' },
    { id: 3, title: 'Vue Router Setup', course: 'Web Development', due_date: '2024-03-10', status: 'Graded' },
])

const payments = ref([
    { id: 'INV-001', date: '2024-01-15', amount: '5000', description: 'Course Fee - Web Dev', status: 'Paid' },
    { id: 'INV-002', date: '2024-02-01', amount: '3000', description: 'Course Fee - Hardware', status: 'Paid' },
    { id: 'INV-003', date: '2024-03-01', amount: '2000', description: 'Installment 2 - Hardware', status: 'Pending' }
])

// Existing Profile Logic
const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh', 'Comilla']
const religions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism', 'Others']

onMounted(async () => {
    if (!authStore.user) {
        await authStore.init()
    }
    if (!authStore.user) {
        router.push('/login')
        return
    }
    fetchProfile()
})

const fetchProfile = async () => {
    loading.value = true
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authStore.user.id)
            .single()

        if (error) throw error

        if (data) {
            profile.value = { ...profile.value, ...data, email: authStore.user.email }
        }
    } catch (error) {
        console.error('Error fetching profile:', error.message)
    } finally {
        loading.value = false
    }
}

const handleUpdateProfile = async () => {
    loading.value = true
    try {
        const updates = {
            id: authStore.user.id,
            full_name: profile.value.full_name,
            phone: profile.value.phone,
            address: profile.value.address,
            district: profile.value.district,
            date_of_birth: profile.value.date_of_birth || null,
            nationality: profile.value.nationality,
            religion: profile.value.religion,
            father_name: profile.value.father_name,
            mother_name: profile.value.mother_name,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        
        toast.success('Profile updated successfully!')
    } catch (error) {
        toast.error('Error updating profile: ' + error.message)
    } finally {
        loading.value = false
    }
}

const uploadAvatar = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    uploading.value = true
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${authStore.user.id}-${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
        
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: data.publicUrl })
            .eq('id', authStore.user.id)

        if (updateError) throw updateError
        
        profile.value.avatar_url = data.publicUrl
        // Update user metadata in store primarily for Navbar
        authStore.user.user_metadata = { ...authStore.user.user_metadata, avatar_url: data.publicUrl }

        toast.success('Avatar uploaded successfully!')
    } catch (error) {
        toast.error('Error uploading avatar: ' + error.message)
    } finally {
        uploading.value = false
    }
}

const uploadNID = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    uploading.value = true
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${authStore.user.id}-NID-${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file)
        if (uploadError) throw uploadError

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ nid_url: filePath }) 
            .eq('id', authStore.user.id)

        if (updateError) throw updateError

        profile.value.nid_url = filePath
        toast.success('NID uploaded successfully!')
    } catch (error) {
        toast.error('Error uploading NID: ' + error.message)
    } finally {
        uploading.value = false
    }
}

const handleSignOut = async () => {
    await authStore.signOut()
}
</script>

<template>
    <div class="min-h-screen pt-28 pb-12 px-4 bg-tech-bg relative">
        <div class="container mx-auto max-w-7xl">
            <div class="grid lg:grid-cols-12 gap-8">
                
                <!-- Sidebar -->
                <div class="lg:col-span-3 space-y-6">
                    <!-- Profile Card -->
                    <div class="bg-tech-surface border border-white/10 rounded-2xl p-6 text-center">
                        <div class="relative w-24 h-24 mx-auto mb-4 group">
                            <div class="w-full h-full rounded-full overflow-hidden border-2 border-neon-blue bg-tech-bg flex items-center justify-center">
                                <img v-if="profile.avatar_url" :src="profile.avatar_url" alt="Avatar" class="w-full h-full object-cover">
                                <User v-else class="w-10 h-10 text-text-secondary" />
                            </div>
                            <label class="absolute bottom-0 right-0 bg-neon-blue text-tech-bg p-2 rounded-full cursor-pointer hover:bg-neon-purple transition shadow-lg">
                                <Camera class="w-4 h-4" />
                                <input type="file" accept="image/*" class="hidden" @change="uploadAvatar" :disabled="uploading">
                            </label>
                        </div>
                        <h2 class="text-xl font-bold text-white mb-1">{{ profile.full_name || 'Student' }}</h2>
                        <div class="flex items-center justify-center gap-2 mb-4">
                            <span class="px-2 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold">STUDENT</span>
                            <span class="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold">ACTIVE</span>
                        </div>
                    </div>

                    <!-- Navigation Menu -->
                    <div class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden p-2">
                        <button v-for="tab in [
                            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                            { id: 'courses', label: 'My Courses', icon: BookOpen },
                            { id: 'assignments', label: 'Assignments', icon: FileText },
                            { id: 'payments', label: 'Payments', icon: CreditCard },
                            { id: 'profile', label: 'Profile', icon: User },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ]" :key="tab.id"
                            @click="activeTab = tab.id"
                            :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium mb-1', activeTab === tab.id ? 'bg-linear-to-r from-neon-blue to-neon-purple text-white shadow-lg' : 'text-text-secondary hover:bg-white/5 hover:text-white']"
                        >
                            <component :is="tab.icon" class="w-5 h-5" /> {{ tab.label }}
                        </button>
                        
                        <div class="h-px bg-white/10 my-2"></div>

                        <button @click="handleSignOut"
                            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium">
                            <LogOut class="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-9 space-y-6">
                    
                    <!-- Overview Tab -->
                    <div v-if="activeTab === 'overview'" class="space-y-6 animate-fade-in">
                        
                        <!-- Welcome Banner -->
                        <div class="mb-2">
                            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                                Welcome back, <span class="text-transparent bg-clip-text bg-linear-to-r from-neon-blue to-neon-purple">{{ profile.full_name?.split(' ')[0] || 'Student' }}</span>! 👋
                            </h1>
                            <p class="text-text-secondary">Here's an overview of your progress and upcoming activities.</p>
                        </div>

                        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div v-for="stat in stats" :key="stat.label" class="bg-tech-surface border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                                <div class="flex items-center justify-between mb-4">
                                    <div :class="['p-3 rounded-xl', stat.bg]">
                                        <component :is="stat.icon" class="w-6 h-6" :class="stat.color" />
                                    </div>
                                </div>
                                <h3 class="text-3xl font-bold text-white mb-1">{{ stat.value }}</h3>
                                <p class="text-text-secondary text-sm">{{ stat.label }}</p>
                            </div>
                        </div>

                        <!-- Recent Courses Grid -->
                        <h2 class="text-xl font-bold text-white mt-8 mb-4">Continue Learning</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div v-for="course in activeCourses" :key="course.id" class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden group hover:border-neon-blue/30 transition-all">
                                <div class="relative h-40">
                                    <img :src="course.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                    <div class="absolute inset-0 bg-gradient-to-t from-tech-bg to-transparent"></div>
                                    <div class="absolute bottom-4 left-4 right-4">
                                        <h3 class="font-bold text-white text-lg truncate">{{ course.title }}</h3>
                                        <p class="text-neon-blue text-sm">{{ course.instructor }}</p>
                                    </div>
                                </div>
                                <div class="p-6">
                                    <div class="flex justify-between text-sm text-text-secondary mb-2">
                                        <span>Progress</span>
                                        <span class="text-white">{{ course.progress }}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                                        <div class="h-full bg-linear-to-r from-neon-blue to-neon-purple" :style="{ width: `${course.progress}%` }"></div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2 text-xs text-text-secondary">
                                            <Calendar class="w-3 h-3" /> Next Class: {{ course.next_class }}
                                        </div>
                                        <button class="text-sm font-bold text-white hover:text-neon-blue flex items-center gap-1 transition-colors">
                                            Continue <ChevronRight class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- My Courses Tab -->
                    <div v-if="activeTab === 'courses'" class="animate-fade-in">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-white">My Courses</h2>
                            <button class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10">Browse All</button>
                        </div>
                        <!-- Reusing the course cards logic but listing all -->
                        <div class="space-y-4">
                            <div v-if="activeCourses.length === 0" class="text-center py-12 bg-tech-surface rounded-2xl border border-white/10">
                                <BookOpen class="w-12 h-12 text-text-secondary mx-auto mb-4" />
                                <h3 class="text-lg font-bold text-white">No Courses Enrolled</h3>
                                <p class="text-text-secondary mb-6">Start your journey today.</p>
                                <router-link to="/courses" class="text-neon-blue hover:underline">Explore Courses</router-link>
                            </div>
                            <!-- List view for more detailed course management could go here -->
                             <div v-for="course in activeCourses" :key="course.id" class="bg-tech-surface border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                <img :src="course.image" class="w-full md:w-32 h-20 object-cover rounded-xl">
                                <div class="flex-1 w-full">
                                    <h3 class="font-bold text-white text-lg mb-1">{{ course.title }}</h3>
                                    <p class="text-text-secondary text-sm mb-3">Instructor: {{ course.instructor }}</p>
                                    <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div class="h-full bg-linear-to-r from-neon-blue to-neon-purple" :style="{ width: `${course.progress}%` }"></div>
                                    </div>
                                </div>
                                <button class="px-6 py-2 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-white transition-all font-medium whitespace-nowrap">
                                    Go to Class
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Assignments Tab -->
                    <div v-if="activeTab === 'assignments'" class="animate-fade-in">
                        <h2 class="text-2xl font-bold text-white mb-6">Assignments</h2>
                        <div class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden">
                            <table class="w-full text-left">
                                <thead class="bg-white/5 text-text-secondary text-xs uppercase">
                                    <tr>
                                        <th class="px-6 py-4">Title</th>
                                        <th class="px-6 py-4">Course</th>
                                        <th class="px-6 py-4">Due Date</th>
                                        <th class="px-6 py-4">Status</th>
                                        <th class="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/10">
                                    <tr v-for="assign in assignments" :key="assign.id" class="hover:bg-white/5 transition-colors">
                                        <td class="px-6 py-4 text-white font-medium">{{ assign.title }}</td>
                                        <td class="px-6 py-4 text-text-secondary text-sm">{{ assign.course }}</td>
                                        <td class="px-6 py-4 text-text-secondary text-sm">{{ assign.due_date }}</td>
                                        <td class="px-6 py-4">
                                            <span :class="{
                                                'px-2 py-1 rounded-full text-xs font-bold': true,
                                                'bg-yellow-400/10 text-yellow-400': assign.status === 'Pending',
                                                'bg-blue-400/10 text-blue-400': assign.status === 'Submitted',
                                                'bg-green-400/10 text-green-400': assign.status === 'Graded'
                                            }">{{ assign.status }}</span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <button v-if="assign.status === 'Pending'" class="text-neon-blue hover:text-white text-sm font-medium">Upload</button>
                                            <button v-else class="text-text-secondary hover:text-white text-sm">View</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Payments Tab -->
                    <div v-if="activeTab === 'payments'" class="animate-fade-in">
                         <h2 class="text-2xl font-bold text-white mb-6">Payment History</h2>
                         <div class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden">
                            <div v-for="payment in payments" :key="payment.id" class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                                <div class="flex items-center gap-4">
                                    <div class="p-3 bg-white/5 rounded-xl text-white">
                                        <CreditCard class="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 class="text-white font-bold">{{ payment.description }}</h4>
                                        <p class="text-text-secondary text-sm">{{ payment.date }} • ID: {{ payment.id }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <span class="text-white font-bold text-lg">৳{{ payment.amount }}</span>
                                    <span :class="{
                                        'px-3 py-1 rounded-full text-xs font-bold': true,
                                        'bg-green-400/10 text-green-400': payment.status === 'Paid',
                                        'bg-red-400/10 text-red-400': payment.status === 'Pending'
                                    }">{{ payment.status }}</span>
                                    <button class="p-2 text-text-secondary hover:text-white" title="Download Invoice">
                                        <Download class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                         </div>
                    </div>

                    <!-- Profile Tab (Existing) -->
                    <div v-if="activeTab === 'profile'" class="bg-tech-surface border border-white/10 rounded-2xl p-6 md:p-8 animate-fade-in">
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                             Edit Profile
                        </h2>
                        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
                            <!-- Personal Info Section -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <input v-model="profile.full_name" type="text" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                </div>
                                <div class="opacity-75 cursor-not-allowed">
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Email (Cannot be changed)</label>
                                    <input v-model="profile.email" type="email" disabled
                                        class="w-full bg-tech-bg/30 border border-white/10 rounded-xl px-4 py-3 text-gray-400">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                    <input v-model="profile.phone" type="tel" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                                    <input v-model="profile.date_of_birth" type="date" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none [color-scheme:dark]">
                                </div>
                            </div>

                            <hr class="border-white/10" />

                            <!-- Address & Background -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Address</label>
                                    <textarea v-model="profile.address" rows="2"
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none" placeholder="Village, P.O, etc."></textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">District</label>
                                    <select v-model="profile.district" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                        <option value="" disabled>Select District</option>
                                        <option v-for="dist in districts" :key="dist" :value="dist">{{ dist }}</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Nationality</label>
                                    <select v-model="profile.nationality" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                        <option value="Bangladeshi">Bangladeshi</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Religion</label>
                                    <select v-model="profile.religion" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                        <option v-for="rel in religions" :key="rel" :value="rel">{{ rel }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Father's Name</label>
                                    <input v-model="profile.father_name" type="text" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-300 mb-2">Mother's Name</label>
                                    <input v-model="profile.mother_name" type="text" 
                                        class="w-full bg-tech-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none">
                                </div>
                            </div>

                            <hr class="border-white/10" />

                            <!-- Documents -->
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Upload NID / Birth Certificate</label>
                                <div class="flex items-center gap-4">
                                    <div v-if="profile.nid_url" class="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm flex items-center gap-2">
                                        <Upload class="w-4 h-4" /> File Uploaded
                                    </div>
                                    <label class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-blue transition rounded-lg cursor-pointer text-text-secondary hover:text-white text-sm">
                                        <Upload class="w-4 h-4" /> {{ profile.nid_url ? 'Change File' : 'Choose File' }}
                                        <input type="file" @change="uploadNID" class="hidden" :disabled="uploading">
                                    </label>
                                    <span v-if="uploading" class="text-xs text-neon-blue animate-pulse">Uploading...</span>
                                </div>
                                <p class="text-xs text-text-secondary mt-2">Accepted formats: PDF, JPG, PNG. Max size 5MB.</p>
                            </div>

                            <div class="flex justify-end pt-4">
                                <button type="submit" :disabled="loading" 
                                    class="px-8 py-3 bg-linear-to-r from-neon-blue to-neon-purple text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_#06b6d44d] hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50">
                                    <Save class="w-4 h-4" /> {{ loading ? 'Saving...' : 'Save Profile' }}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Settings Tab (Dummy) -->
                    <div v-if="activeTab === 'settings'" class="animate-fade-in">
                        <h2 class="text-2xl font-bold text-white mb-6">Settings</h2>
                        <div class="bg-tech-surface border border-white/10 rounded-2xl p-8 space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-white font-bold">Email Notifications</h3>
                                    <p class="text-text-secondary text-sm">Receive updates about your classes and results.</p>
                                </div>
                                <div class="w-12 h-6 bg-neon-blue/20 rounded-full cursor-pointer relative">
                                    <div class="absolute right-1 top-1 w-4 h-4 bg-neon-blue rounded-full shadow-md"></div>
                                </div>
                            </div>
                            <hr class="border-white/10">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-white font-bold">SMS Notifications</h3>
                                    <p class="text-text-secondary text-sm">Get text messages for urgent alerts.</p>
                                </div>
                                <div class="w-12 h-6 bg-white/10 rounded-full cursor-pointer relative">
                                    <div class="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full shadow-md"></div>
                                </div>
                            </div>
                            <div class="pt-4">
                                <button class="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition">Change Password</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
