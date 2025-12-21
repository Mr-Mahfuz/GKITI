<template>
    <div class="min-h-screen text-white pt-32 pb-20">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl lg:text-5xl font-black text-center mb-16 text-white" data-aos="fade-down">
                Latest from <span class="text-gradient">Our Blog</span>
            </h1>

            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
                <!-- Post 1 -->
                <div class="bg-tech-surface p-6 rounded-2xl border border-white/10 shadow-lg hover:border-neon-blue/30 transition-all duration-300"
                    data-aos="fade-right">
                    <div class="flex items-center gap-2 mb-4 text-neon-blue">
                        <span class="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
                        <span class="text-sm font-bold uppercase tracking-wider">Featured Reel</span>
                    </div>
                    <div class="flex justify-center w-full overflow-hidden rounded-xl bg-black/50 aspect-[9/16]">
                        <iframe
                            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1019889467007673%2F&show_text=false&width=267&t=0"
                            width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen="true" class="w-full h-full"></iframe>
                    </div>
                </div>

                <!-- Post 2 -->
                <div class="bg-tech-surface p-6 rounded-2xl border border-white/10 shadow-lg hover:border-neon-purple/30 transition-all duration-300"
                    data-aos="fade-left">
                    <div class="flex items-center gap-2 mb-4 text-neon-purple">
                        <span class="w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
                        <span class="text-sm font-bold uppercase tracking-wider">Latest Video</span>
                    </div>
                    <div class="flex justify-center w-full overflow-hidden rounded-xl bg-black/50 aspect-video">
                        <iframe
                            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fglobalknowledgebd%2Fvideos%2F700408812370122%2F&show_text=false&width=560&t=0"
                            width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen="true" class="w-full h-full"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Responsive iframe adjustments if needed */
</style>
