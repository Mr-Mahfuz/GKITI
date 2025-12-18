<template>
    <div class="pt-24 pb-20 min-h-screen flex items-center">
        <div class="container mx-auto px-4">
            <!-- Glow effect behind the card -->
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] -z-10">
            </div>

            <div class="max-w-2xl mx-auto bg-tech-surface/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10"
                data-aos="fade-up">
                <h1 class="text-3xl font-bold text-white mb-8 text-center">{{ $t('nav.contact') }}</h1>
                <form class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input type="text"
                            class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                            placeholder="Your Name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input type="email"
                            class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                            placeholder="your@email.com">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea rows="4"
                            class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                            placeholder="How can we help you?"></textarea>
                    </div>
                    <button
                        class="w-full bg-linear-to-r from-neon-blue to-neon-purple text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_#06b6d466] hover:-translate-y-0.5 transition-all duration-300 border border-white/20">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
