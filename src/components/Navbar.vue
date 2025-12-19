<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Globe, User } from 'lucide-vue-next'

const { t, locale } = useI18n()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleLanguage = () => {
    locale.value = locale.value === 'en' ? 'bn' : 'en'
}

const checkScroll = () => {
    isScrolled.value = window.scrollY > 20
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
    <nav
        :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5']">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <!-- Logo -->
            <router-link to="/" class="flex items-center gap-2 group">
                <img src="../assets/gk-logo.png" alt="GK Logo"
                    class="w-12 h-12 object-contain drop-shadow-[0_0_10px_#06b6d499] group-hover:drop-shadow-[0_0_15px_#06b6d4cc] transition-all duration-300" />
                <span
                    class="font-bold text-xl tracking-tight hidden sm:block text-text-primary group-hover:text-neon-blue transition-colors">
                    Global Knowledge
                </span>
            </router-link>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8">
                <router-link to="/"
                    active-class="text-neon-blue border-b-2 border-neon-blue drop-shadow-[0_0_8px_#06b6d4]"
                    class="text-sm font-medium text-text-secondary hover:text-neon-blue hover:drop-shadow-[0_0_5px_#06b6d480] transition-all py-1">{{
                        t('nav.home') }}</router-link>
                <router-link to="/about"
                    active-class="text-neon-blue border-b-2 border-neon-blue drop-shadow-[0_0_8px_#06b6d4]"
                    class="text-sm font-medium text-text-secondary hover:text-neon-blue hover:drop-shadow-[0_0_5px_#06b6d480] transition-all py-1">{{
                        t('nav.courses') }}</router-link>
                <router-link to="/enroll"
                    active-class="text-neon-blue border-b-2 border-neon-blue drop-shadow-[0_0_8px_#06b6d4]"
                    class="text-sm font-medium text-text-secondary hover:text-neon-blue hover:drop-shadow-[0_0_5px_#06b6d480] transition-all py-1">{{
                        t('nav.enroll') }}</router-link>
                <router-link to="/blogs"
                    active-class="text-neon-blue border-b-2 border-neon-blue drop-shadow-[0_0_8px_#06b6d4]"
                    class="text-sm font-medium text-text-secondary hover:text-neon-blue hover:drop-shadow-[0_0_5px_#06b6d480] transition-all py-1">{{
                        t('nav.blog') }}</router-link>
                <router-link to="/contact"
                    active-class="text-neon-blue border-b-2 border-neon-blue drop-shadow-[0_0_8px_#06b6d4]"
                    class="text-sm font-medium text-text-secondary hover:text-neon-blue hover:drop-shadow-[0_0_5px_#06b6d480] transition-all py-1">{{
                        t('nav.contact') }}</router-link>
            </div>

            <!-- Action Buttons -->
            <div class="hidden md:flex items-center gap-4">
                <button @click="toggleLanguage"
                    class="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-neon-blue transition px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
                    <Globe class="w-4 h-4" />
                    <span>{{ locale === 'en' ? 'BN' : 'EN' }}</span>
                </button>
                <router-link to="/signup"
                    class="text-text-secondary font-medium text-sm hover:text-neon-blue px-4 py-2 transition hover:drop-shadow-[0_0_5px_#06b6d480]">
                    Sign Up
                </router-link>
                <router-link to="/login"
                    class="bg-linear-to-r from-neon-blue to-neon-purple text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-[0_0_20px_#8b5cf680] hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/20">
                    <User class="w-4 h-4" /> Sign In
                </router-link>
            </div>

            <!-- Mobile Menu Button -->
            <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-text-secondary hover:text-white">
                <Menu v-if="!isMenuOpen" class="w-6 h-6" />
                <X v-else class="w-6 h-6" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen"
            class="md:hidden absolute top-full left-0 w-full bg-tech-bg/95 backdrop-blur-xl border-t border-neon-blue/20 shadow-2xl p-4 flex flex-col gap-4">
            <router-link to="/" active-class="text-neon-blue bg-white/10"
                class="p-2 text-text-secondary hover:text-neon-blue hover:bg-white/5 rounded-lg">{{
                    t('nav.home') }}</router-link>
            <router-link to="/about" active-class="text-neon-blue bg-white/10"
                class="p-2 text-text-secondary hover:text-neon-blue hover:bg-white/5 rounded-lg">{{
                    t('nav.courses') }}</router-link>
            <router-link to="/enroll" active-class="text-neon-blue bg-white/10"
                class="p-2 text-text-secondary hover:text-neon-blue hover:bg-white/5 rounded-lg">{{ t('nav.enroll')
                }}</router-link>
            <router-link to="/blogs" active-class="text-neon-blue bg-white/10"
                class="p-2 text-text-secondary hover:text-neon-blue hover:bg-white/5 rounded-lg">{{ t('nav.blog')
                }}</router-link>
            <router-link to="/contact" active-class="text-neon-blue bg-white/10"
                class="p-2 text-text-secondary hover:text-neon-blue hover:bg-white/5 rounded-lg">{{ t('nav.contact')
                }}</router-link>
            <div class="h-px bg-white/10 my-2"></div>
            <button @click="toggleLanguage" class="flex items-center gap-2 p-2 text-text-secondary hover:text-white">
                <Globe class="w-4 h-4" /> {{ locale === 'en' ? 'Switch to Bengali' : 'Switch to English' }}
            </button>
            <router-link to="/login"
                class="bg-linear-to-r from-neon-blue to-neon-purple text-white w-full py-3 rounded-xl font-bold text-center block shadow-[0_0_15px_#06b6d44d]">
                Sign In
            </router-link>
        </div>
    </nav>
</template>
