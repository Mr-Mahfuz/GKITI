<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { User, BookOpen, Camera, Upload, Save, LogOut } from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToastStore()
const router = useRouter()
const activeTab = ref('profile')
const loading = ref(false)
const uploading = ref(false)

const profile = ref({
    full_name: '',
    phone: '',
    email: '', // Read-only from auth
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

const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh', 'Comilla'] // Simplified list
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
            date_of_birth: profile.value.date_of_birth || null, // Handle empty string date
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

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
        
        // Update profile with new avatar URL
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: data.publicUrl })
            .eq('id', authStore.user.id)

        if (updateError) throw updateError
        
        profile.value.avatar_url = data.publicUrl
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

        const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        // Store the file path/URL. Since documents bucket is private, we store the path.
        
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
        <div class="container mx-auto max-w-6xl">
            <div class="grid lg:grid-cols-4 gap-8">
                <!-- Sidebar -->
                <div class="lg:col-span-1 space-y-6">
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
                        <p class="text-sm text-text-secondary mb-4">{{ profile.email }}</p>
                        <p v-if="profile.phone" class="text-sm text-neon-blue">{{ profile.phone }}</p>
                    </div>

                    <!-- Menu -->
                    <div class="bg-tech-surface border border-white/10 rounded-2xl overflow-hidden">
                        <button 
                            @click="activeTab = 'courses'"
                            :class="['w-full flex items-center gap-3 px-6 py-4 transition-colors', activeTab === 'courses' ? 'bg-white/10 text-white border-l-4 border-neon-blue' : 'text-text-secondary hover:bg-white/5']"
                        >
                            <BookOpen class="w-5 h-5" /> My Courses
                        </button>
                        <button 
                            @click="activeTab = 'profile'"
                            :class="['w-full flex items-center gap-3 px-6 py-4 transition-colors', activeTab === 'profile' ? 'bg-white/10 text-white border-l-4 border-neon-blue' : 'text-text-secondary hover:bg-white/5']"
                        >
                            <User class="w-5 h-5" /> Edit Profile
                        </button>
                        <button 
                            @click="handleSignOut"
                            class="w-full flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-white/5 transition-colors border-t border-white/10"
                        >
                            <LogOut class="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    
                    <!-- My Courses Tab -->
                    <div v-if="activeTab === 'courses'" class="space-y-6">
                        <h2 class="text-2xl font-bold text-white mb-6">Enrolled Courses</h2>
                        <div class="bg-tech-surface border border-white/10 rounded-2xl p-8 text-center">
                            <BookOpen class="w-12 h-12 text-text-secondary mx-auto mb-4" />
                            <h3 class="text-lg font-medium text-white mb-2">No Active Courses</h3>
                            <p class="text-text-secondary mb-6">You haven't enrolled in any courses yet.</p>
                            <router-link to="/courses" class="inline-block px-6 py-2 bg-neon-blue text-tech-bg font-bold rounded-lg hover:bg-white transition">
                                Browse Courses
                            </router-link>
                        </div>
                    </div>

                    <!-- Edit Profile Tab -->
                    <div v-if="activeTab === 'profile'" class="bg-tech-surface border border-white/10 rounded-2xl p-6 md:p-8">
                        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <User class="w-6 h-6 text-neon-blue" /> Student Profile
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
                </div>
            </div>
        </div>
    </div>
</template>
