<script setup>
import { ref } from 'vue'
import { Plus, Minus } from 'lucide-vue-next'

const faqs = ref([
    { q: "Do I need prior experience?", a: "No, our courses are designed for beginners as well as advanced learners.", open: false },
    { q: "Do you provide certification?", a: "Yes, we provide ISO certified certificates upon successful course completion.", open: false },
    { q: "Can I pay in installments?", a: "Yes, we offer flexible payment plans for eligible students.", open: false },
    { q: "Is job placement assistance available?", a: "We have partnerships with major service centers and provide 100% job placement assistance.", open: false },
])

const toggle = (index) => {
    faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
    <div class="pt-24 pb-20 bg-slate-50 min-h-screen">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-slate-900 mb-12 text-center" data-aos="fade-up">{{ $t('nav.faq') }}</h1>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden" data-aos="fade-up"
                    :data-aos-delay="index * 100">
                    <button @click="toggle(index)"
                        class="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition">
                        <span class="font-bold text-lg text-slate-800">{{ faq.q }}</span>
                        <Plus v-if="!faq.open" class="w-5 h-5 text-slate-400" />
                        <Minus v-else class="w-5 h-5 text-blue-500" />
                    </button>
                    <div v-if="faq.open" class="px-6 pb-6 text-slate-600 animate-fade-in">
                        {{ faq.a }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
