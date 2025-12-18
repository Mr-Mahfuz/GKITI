<script setup>
import { ref } from 'vue'
import { Phone, CreditCard, User, CheckCircle } from 'lucide-vue-next'

const selectedCourse = ref('batch137')
</script>

<template>
    <div class="pt-24 pb-20 overflow-hidden min-h-screen">
        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center mb-12" data-aos="fade-up">
                <h1 class="text-4xl font-bold text-white mb-4">{{ $t('nav.enroll') }}</h1>
                <p class="text-text-secondary">Official Admission Portal for Global Knowledge International Training
                    Institute</p>
            </div>

            <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Course Selection Card -->
                <div class="lg:col-span-2 bg-tech-surface border border-white/5 p-8 rounded-3xl shadow-xl hover:shadow-[0_0_30px_#06b6d41a] transition-all duration-300"
                    data-aos="fade-right">
                    <h2 class="text-2xl font-bold mb-6 text-white">Choose Your Batch</h2>
                    <div class="space-y-6">

                        <!-- Batch 137 -->
                        <label
                            class="block p-6 border rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden"
                            :class="selectedCourse === 'batch137' ? 'border-neon-blue bg-neon-blue/5' : 'border-white/10 hover:border-white/30 bg-white/5'">
                            <div class="flex items-start gap-4">
                                <input type="radio" name="course" value="batch137" v-model="selectedCourse"
                                    class="mt-1 w-5 h-5 text-neon-blue bg-transparent border-white/30 focus:ring-neon-blue">
                                <div class="z-10 w-full">
                                    <div class="flex justify-between items-start mb-2">
                                        <span
                                            class="font-bold text-xl text-white group-hover:text-neon-blue transition-colors">137th
                                            Mobile Service Batch (New Students)</span>
                                        <span
                                            class="bg-neon-blue/20 text-neon-blue px-3 py-1 rounded-full text-xs font-bold border border-neon-blue/30">Starts
                                            15 Dec 2025</span>
                                    </div>
                                    <div class="text-sm text-gray-400 space-y-2 mb-4">
                                        <p>Basic to Android Master Course + <span class="text-neon-pink">Free Software
                                                Course (Worth 15k)</span></p>
                                        <p>Duration: <span class="text-white">2 Months</span> (Daily 5-6 Hours)</p>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm font-medium">
                                        <div class="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                            Fee: <span class="text-white">38,000 BDT</span>
                                        </div>
                                        <div class="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                            Booking: <span class="text-white">5,000 BDT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <!-- Batch 136 -->
                        <label
                            class="block p-6 border rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden"
                            :class="selectedCourse === 'batch136' ? 'border-neon-purple bg-neon-purple/5' : 'border-white/10 hover:border-white/30 bg-white/5'">
                            <div class="flex items-start gap-4">
                                <input type="radio" name="course" value="batch136" v-model="selectedCourse"
                                    class="mt-1 w-5 h-5 text-neon-purple bg-transparent border-white/30 focus:ring-neon-purple">
                                <div class="z-10 w-full">
                                    <div class="flex justify-between items-start mb-2">
                                        <span
                                            class="font-bold text-xl text-white group-hover:text-neon-purple transition-colors">136th
                                            Android Master (Technicians)</span>
                                        <span
                                            class="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-xs font-bold border border-neon-purple/30">Starts
                                            15 Dec 2025</span>
                                    </div>
                                    <div class="text-sm text-gray-400 space-y-2 mb-4">
                                        <p>For existing technicians only. Hardware Basic to Advance, IC Skills,
                                            Schematic & Boot Sequence.</p>
                                        <p>Duration: <span class="text-white">15 Days</span></p>
                                    </div>
                                    <div class="flex items-center gap-4 text-sm font-medium">
                                        <div class="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                            Fee: <span class="text-white">25,000 BDT</span>
                                        </div>
                                        <div class="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                                            Booking: <span class="text-white">5,000 BDT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>

                    </div>

                    <div class="mt-8 pt-8 border-t border-white/10">
                        <h3 class="text-xl font-bold text-white mb-4">Payment Methods</h3>
                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="bg-tech-bg p-3 rounded-xl border border-white/5 text-center">
                                <div class="text-neon-pink font-bold">Bkash</div>
                                <div class="text-xs text-gray-400">Personal</div>
                            </div>
                            <div class="bg-tech-bg p-3 rounded-xl border border-white/5 text-center">
                                <div class="text-orange-500 font-bold">Nagad</div>
                                <div class="text-xs text-gray-400">Personal</div>
                            </div>
                            <div class="bg-tech-bg p-3 rounded-xl border border-white/5 text-center">
                                <div class="text-blue-500 font-bold">Bank</div>
                                <div class="text-xs text-gray-400">Transfer</div>
                            </div>
                            <div class="bg-tech-bg p-3 rounded-xl border border-white/5 text-center">
                                <div class="text-green-500 font-bold">Cash</div>
                                <div class="text-xs text-gray-400">At Office</div>
                            </div>
                        </div>
                        <div class="mt-4 p-4 bg-neon-blue/10 rounded-xl border border-neon-blue/20 text-center">
                            <p class="text-neon-blue font-bold text-lg">Send Money: 01716-543643</p>
                            <p class="text-xs text-neon-blue/70">(Bkash/Nagad Personal)</p>
                        </div>
                    </div>
                </div>

                <!-- Student Details Form -->
                <div class="bg-tech-surface border border-white/5 p-8 rounded-3xl shadow-xl hover:shadow-[0_0_30px_#8b5cf61a] transition-all duration-300 h-fit sticky top-24"
                    data-aos="fade-left">
                    <h2 class="text-2xl font-bold mb-6 text-white">Student Info</h2>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                            <input type="text"
                                class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                                placeholder="Enter full name">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-400 mb-1">Phone Number</label>
                            <input type="tel"
                                class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                                placeholder="017...">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
                            <input type="email"
                                class="w-full px-4 py-3 rounded-xl bg-tech-bg/50 border border-white/10 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition placeholder-gray-600"
                                placeholder="example@email.com">
                        </div>

                        <div class="pt-4 pb-2">
                            <div class="text-xs text-gray-400 mb-2">Need Help? Call Us:</div>
                            <div class="flex flex-col gap-2">
                                <a href="tel:01792060781"
                                    class="flex items-center gap-2 text-white hover:text-neon-blue transition text-sm font-medium bg-white/5 p-2 rounded-lg border border-white/5 hover:border-neon-blue/30">
                                    <Phone class="w-4 h-4" /> 01792-060781
                                </a>
                                <a href="tel:01712657516"
                                    class="flex items-center gap-2 text-white hover:text-neon-blue transition text-sm font-medium bg-white/5 p-2 rounded-lg border border-white/5 hover:border-neon-blue/30">
                                    <Phone class="w-4 h-4" /> 01712-657516
                                </a>
                            </div>
                        </div>

                        <button
                            class="w-full bg-linear-to-r from-neon-blue to-neon-purple text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_#06b6d466] hover:-translate-y-0.5 transition-all duration-300 border border-white/20 mt-4">
                            Submit Application
                        </button>
                        <p class="text-xs text-center text-gray-500 mt-2">By clicking submit, you agree to pay the
                            booking fee.</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
