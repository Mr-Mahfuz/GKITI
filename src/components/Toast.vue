<script setup>
import { onMounted, ref } from 'vue'
import { CheckCircle, AlertCircle, Info, XOctagon, X } from 'lucide-vue-next'
import { useToastStore } from '../stores/toast'

const props = defineProps({
    toast: {
        type: Object,
        required: true
    }
})

const toastStore = useToastStore()
const progress = ref(100)
let timer = null

const icons = {
    success: CheckCircle,
    error: XOctagon,
    warning: AlertCircle,
    info: Info
}

const colors = {
    success: 'border-neon-green text-neon-green bg-neon-green/10',
    error: 'border-neon-pink text-neon-pink bg-neon-pink/10',
    warning: 'border-yellow-400 text-yellow-400 bg-yellow-400/10',
    info: 'border-neon-blue text-neon-blue bg-neon-blue/10'
}

const progressColors = {
    success: 'bg-neon-green',
    error: 'bg-neon-pink',
    warning: 'bg-yellow-400',
    info: 'bg-neon-blue'
}

onMounted(() => {
    if (props.toast.duration > 0) {
        const step = 100 / (props.toast.duration / 10)
        timer = setInterval(() => {
            progress.value -= step
            if (progress.value <= 0) {
                clearInterval(timer)
            }
        }, 10)
    }
})

const close = () => {
    toastStore.removeToast(props.toast.id)
}
</script>

<template>
    <div
        class="relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-lg transition-all duration-300 transform translate-x-0 mb-3 min-w-[300px] max-w-sm overflow-hidden"
        :class="colors[toast.type]"
        data-aos="fade-right"
    >
        <component :is="icons[toast.type]" class="w-6 h-6 shrink-0 mt-0.5" />
        <div class="flex-1 mr-2">
            <p class="font-medium text-sm text-white">{{ toast.message }}</p>
        </div>
        <button @click="close" class="text-white/50 hover:text-white transition">
            <X class="w-4 h-4" />
        </button>

        <!-- Progress Bar -->
        <div v-if="toast.duration > 0" class="absolute bottom-0 left-0 h-1 transition-all duration-[10ms] ease-linear"
            :class="progressColors[toast.type]"
            :style="{ width: `${progress}%` }"
        ></div>
    </div>
</template>
