<script setup>
import { useI18n } from 'vue-i18n'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-vue-next'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="bg-tech-bg border-t border-white/10 text-text-secondary py-16 relative overflow-hidden">
        <!-- Grid Background partial for footer -->
        <div
            class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50 pointer-events-none">
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <!-- Brand Column -->
                <div>
                    <div class="flex items-center gap-2 mb-6 group">
                        <img src="../assets/gk-logo.png" alt="GK Logo"
                            class="w-12 h-12 object-contain drop-shadow-[0_0_10px_#06b6d499] transition-all" />
                        <span
                            class="font-bold text-xl text-white tracking-tight group-hover:text-neon-blue transition-colors">GKITI</span>
                    </div>
                    <p class="text-text-secondary mb-6 leading-relaxed">
                        Empowering the next generation of mobile technicians with world-class training and
                        certification.
                    </p>
                    <div class="flex gap-4">
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-tech-bg hover:shadow-[0_0_15px_#06b6d466] transition-all duration-300 border border-white/5 hover:border-neon-blue">
                            <Facebook class="w-5 h-5" />
                        </a>
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue hover:text-tech-bg hover:shadow-[0_0_15px_#06b6d466] transition-all duration-300 border border-white/5 hover:border-neon-blue">
                            <Twitter class="w-5 h-5" />
                        </a>
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white hover:shadow-[0_0_15px_#f472b666] transition-all duration-300 border border-white/5 hover:border-neon-pink">
                            <Instagram class="w-5 h-5" />
                        </a>
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_#8b5cf666] transition-all duration-300 border border-white/5 hover:border-neon-purple">
                            <Linkedin class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-white font-bold text-lg mb-6">Quick Links</h3>
                    <ul class="space-y-4">
                        <li><router-link to="/"
                                class="hover:text-neon-blue transition-colors hover:translate-x-1 inline-block">Home</router-link>
                        </li>
                        <li><router-link to="/about"
                                class="hover:text-neon-blue transition-colors hover:translate-x-1 inline-block">About
                                Us</router-link></li>
                        <li><router-link to="/courses"
                                class="hover:text-neon-blue transition-colors hover:translate-x-1 inline-block">Our
                                Courses</router-link></li>
                        <li><router-link to="/enroll"
                                class="hover:text-neon-blue transition-colors hover:translate-x-1 inline-block">Enroll
                                Now</router-link></li>
                        <li><router-link to="/faq"
                                class="hover:text-neon-blue transition-colors hover:translate-x-1 inline-block">FAQ</router-link>
                        </li>
                    </ul>
                </div>

                <!-- Courses -->
                <div>
                    <h3 class="text-white font-bold text-lg mb-6">Popular Courses</h3>
                    <ul class="space-y-4">
                        <li><a href="#"
                                class="hover:text-neon-purple transition-colors hover:translate-x-1 inline-block">Basic
                                Electronics</a></li>
                        <li><a href="#"
                                class="hover:text-neon-purple transition-colors hover:translate-x-1 inline-block">Advanced
                                Hardware Repair</a></li>
                        <li><a href="#"
                                class="hover:text-neon-purple transition-colors hover:translate-x-1 inline-block">Software
                                Unlocking</a></li>
                        <li><a href="#"
                                class="hover:text-neon-purple transition-colors hover:translate-x-1 inline-block">Micro-soldering
                                Masterclass</a></li>
                        <li><a href="#"
                                class="hover:text-neon-purple transition-colors hover:translate-x-1 inline-block">iPhone
                                Face ID Repair</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-white font-bold text-lg mb-6">Contact Us</h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <MapPin class="w-5 h-5 text-neon-blue mt-1 shrink-0" />
                            <span>123 Training Center Rd,<br>Dhaka, Bangladesh</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Phone class="w-5 h-5 text-neon-blue shrink-0" />
                            <span>+880 1234 567890</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Mail class="w-5 h-5 text-neon-blue shrink-0" />
                            <span>info@gkiti.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-secondary">
                <p class="mb-4 md:mb-0">© {{ currentYear }} Global Knowledge International Training Institute. {{
                    t('footer.rights') }}</p>
                <div class="flex gap-6 mb-4 md:mb-0">
                    <a href="#" class="hover:text-white transition-colors">{{ t('footer.terms') }}</a>
                    <a href="#" class="hover:text-white transition-colors">{{ t('footer.privacy') }}</a>
                </div>
                <div>
                    Developed by <span class="text-neon-blue font-semibold">Techfix Softwares Ltd</span>
                </div>
            </div>
        </div>
    </footer>
</template>
