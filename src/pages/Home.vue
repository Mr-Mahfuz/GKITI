<script setup>
import { CheckCircle, ShieldCheck, Award, Smartphone, Cpu, Zap } from 'lucide-vue-next'
import gkitiBanner from '../assets/gkiti-training.jpg'
</script>

<template>
    <div class="overflow-hidden">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
            <!-- Background Elements -->
            <div class="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div
                    class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]">
                </div>
                <div
                    class="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-neon-blue/15 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]">
                </div>
                <!-- Grid overlay is in body, but we add a vignette here -->
                <div class="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_#030712_100%]"></div>
            </div>

            <div class="container mx-auto px-4 z-10">
                <div class="flex flex-col lg:flex-row items-center gap-16 text-center lg:text-left">

                    <!-- Text Content -->
                    <div class="lg:w-1/2" data-aos="fade-right">
                        <div
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-neon-blue font-semibold text-sm mb-6 border border-neon-blue/20 backdrop-blur-md shadow-[0_0_15px_#06b6d433]">
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
                            </span>
                            {{ $t('hero.badge') }}
                        </div>

                        <h1 class="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tight">
                            {{ $t('hero.headline_part1') }} <br>
                            <span
                                class="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-purple to-neon-pink animate-pulse-slow">{{
                                    $t('hero.headline_part2') }}</span>
                        </h1>

                        <p
                            class="text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                            {{ $t('hero.description') }}
                        </p>

                        <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <router-link to="/enroll"
                                class="relative group px-8 py-4 bg-neon-blue text-tech-bg rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#06b6d499]">
                                <div
                                    class="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left">
                                </div>
                                <span class="relative z-10">{{ $t('hero.cta') }}</span>
                            </router-link>
                            <router-link to="/about"
                                class="px-8 py-4 bg-transparent text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/5 hover:border-neon-purple/50 hover:text-neon-purple hover:shadow-[0_0_20px_#8b5cf64d] transition-all duration-300">
                                {{ $t('hero.secondary_cta') }}
                            </router-link>
                        </div>

                        <div
                            class="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-text-secondary text-sm font-medium">
                            <div class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                <CheckCircle class="w-5 h-5 text-neon-blue" /> {{ $t('features.bteb') }}
                            </div>
                            <div class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                <CheckCircle class="w-5 h-5 text-neon-purple" /> {{ $t('features.practical_labs') }}
                            </div>
                        </div>
                    </div>

                    <!-- Visual Content -->
                    <div class="lg:w-1/2 relative perspective-[1000px]" data-aos="fade-left">
                        <!-- Main Card 3D Effect -->
                        <div
                            class="relative z-10 bg-tech-surface/80 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-white/10 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out group">
                            <div
                                class="absolute inset-0 bg-linear-to-br from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
                            </div>

                            <div class="aspect-video bg-black rounded-2xl overflow-hidden relative">
                                <!-- GKITI Banner Image -->
                                <div class="absolute inset-0 bg-cover bg-center opacity-80 hover:scale-110 transition-transform duration-700"
                                    :style="{ backgroundImage: 'url(' + gkitiBanner + ')' }">
                                </div>

                                <div
                                    class="absolute top-6 left-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-xs text-neon-blue font-bold uppercase tracking-[0.2em] mb-1">
                                                Live Training</p>
                                            <p class="text-xl font-bold text-white">Micro-Soldering Lab</p>
                                        </div>
                                        <div
                                            class="animate-pulse w-3 h-3 bg-neon-pink rounded-full shadow-[0_0_10px_#F43F5E]">
                                        </div>
                                    </div>
                                    <!-- Progress bar decoration -->
                                    <div class="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                                        <div
                                            class="h-full bg-linear-to-r from-neon-blue to-neon-purple w-2/3 shadow-[0_0_10px_#06B6D4]">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Tech Icons -->
                        <div
                            class="absolute -top-12 -right-8 bg-tech-surface p-4 rounded-2xl shadow-[0_0_25px_#06b6d44d] animate-[float_6s_ease-in-out_infinite] z-20 border border-neon-blue/30 backdrop-blur-md">
                            <Cpu class="w-10 h-10 text-neon-blue" />
                        </div>
                        <div
                            class="absolute top-[40%] -left-12 bg-tech-surface p-4 rounded-2xl shadow-[0_0_25px_#8b5cf64d] animate-[float_8s_ease-in-out_infinite_reverse] z-20 border border-neon-purple/30 backdrop-blur-md">
                            <Zap class="w-10 h-10 text-neon-purple" />
                        </div>
                        <div
                            class="absolute -bottom-8 -right-4 bg-tech-surface p-4 rounded-2xl shadow-[0_0_25px_#f472b64d] animate-[float_5s_ease-in-out_infinite] z-20 border border-neon-pink/30 backdrop-blur-md delay-1000">
                            <Smartphone class="w-10 h-10 text-neon-pink" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Enrollment Poster Section -->
        <section class="py-10 container mx-auto px-4 z-10 relative" data-aos="fade-up">
            <div
                class="bg-white/5 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] group max-w-5xl mx-auto">
                <div
                    class="relative rounded-xl overflow-hidden shadow-2xl transition duration-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                    <img src="../assets/enrollment-poster.png" alt="Current Enrollment"
                        class="w-full h-auto object-cover transform group-hover:scale-[1.01] transition duration-700" />

                    <!-- Gradient overlay on bottom for better text readability if needed, or just visual polish -->
                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    </div>
                </div>

                <div class="text-center mt-8 mb-4">
                    <router-link to="/enroll"
                        class="inline-flex items-center gap-2 px-10 py-4 bg-linear-to-r from-neon-blue to-neon-purple text-white font-bold text-lg rounded-xl hover:shadow-[0_0_25px_#06b6d466] hover:-translate-y-1 transition-all border border-white/20">
                        <Zap class="w-5 h-5" /> {{ $t('enrollment.cta') }}
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Glowing Features Grid -->
        <section class="py-24 relative">
            <div
                class="absolute inset-0 bg-linear-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none">
            </div>

            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
                    <h2 class="text-4xl font-black text-white mb-6">{{ $t('why_gkiti.title') }}</h2>
                    <p class="text-text-secondary text-lg">{{ $t('why_gkiti.description') }}</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="group p-8 rounded-3xl bg-tech-surface border border-white/5 hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_30px_#06b6d426] relative overflow-hidden"
                        data-aos="fade-up" data-aos-delay="100">
                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-blue/20 transition-all">
                        </div>

                        <div
                            class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-neon-blue/50">
                            <Cpu class="w-8 h-8 text-neon-blue" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                            {{ $t('features.hardware_title') }}</h3>
                        <p class="text-text-secondary leading-relaxed group-hover:text-gray-300">{{
                            $t('features.hardware_desc') }}</p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="group p-8 rounded-3xl bg-tech-surface border border-white/5 hover:border-neon-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_#8b5cf626] relative overflow-hidden"
                        data-aos="fade-up" data-aos-delay="200">
                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-purple/20 transition-all">
                        </div>

                        <div
                            class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-neon-purple/50">
                            <ShieldCheck class="w-8 h-8 text-neon-purple" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">
                            {{ $t('features.software_title') }}</h3>
                        <p class="text-text-secondary leading-relaxed group-hover:text-gray-300">{{
                            $t('features.software_desc') }}</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="group p-8 rounded-3xl bg-tech-surface border border-white/5 hover:border-neon-pink/50 transition-all duration-300 hover:shadow-[0_0_30px_#f472b626] relative overflow-hidden"
                        data-aos="fade-up" data-aos-delay="300">
                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-neon-pink/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-neon-pink/20 transition-all">
                        </div>

                        <div
                            class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-neon-pink/50">
                            <Award class="w-8 h-8 text-neon-pink" />
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-neon-pink transition-colors">
                            {{ $t('features.certification_title') }}</h3>
                        <p class="text-text-secondary leading-relaxed group-hover:text-gray-300">{{
                            $t('features.certification_desc') }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
