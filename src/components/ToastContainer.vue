<script setup>
import { useToastStore } from '../stores/toast'
import Toast from './Toast.vue'

const toastStore = useToastStore()
</script>

<template>
    <div class="fixed top-20 left-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <TransitionGroup 
            enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-x-[-100%] opacity-0"
            enter-to-class="translate-x-0 opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div v-for="toast in toastStore.toasts" :key="toast.id" class="pointer-events-auto">
                <Toast :toast="toast" />
            </div>
        </TransitionGroup>
    </div>
</template>
