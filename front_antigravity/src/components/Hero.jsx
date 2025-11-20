import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, AlertTriangle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Cinematic Data Ocean Background (CSS/SVG Simulation) */}
            <div className="absolute inset-0 z-0 perspective-1000">
                {/* Deep Ocean Gradient - Forest Green Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0" />

                {/* Grid/Data Plane Animation - Brand Turquoise */}
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(14, 69, 177, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 69, 177, 0.4) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 80%, transparent 100%)'
                    }}
                />

                {/* Floating Particles/Data Points */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#05100e_90%)] z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-20 flex flex-col items-center justify-center h-full pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center flex flex-col items-center w-full max-w-5xl"
                >
                    {/* Massive Logo - Protagonist (NO WHITE BACKGROUND) */}
                    <div className="mb-12 relative group">
                        <div className="absolute inset-0 bg-coral/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
                        <img
                            src="/assets/logo_clean_transparent.png"
                            alt="H3L"
                            className="h-32 md:h-56 lg:h-72 w-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Hard Data Messaging (Survival) */}
                    <div className="flex items-center gap-2 mb-6 bg-coral/10 border border-coral/40 px-4 py-1 rounded-full backdrop-blur-sm">
                        <AlertTriangle size={14} className="text-coral" />
                        <span className="text-coral text-[10px] md:text-xs uppercase tracking-widest font-bold">Dato Crítico: El 80% de las PYMES fallan por ineficiencia</span>
                    </div>

                    <h1 className="text-white font-display font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-6 leading-none drop-shadow-lg">
                        Tu Empresa Pierde Entre <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral via-white to-coral"> $18k y $125k al Año</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light tracking-wide leading-relaxed drop-shadow-md">
                        El <span className="text-turquoise font-bold">80% de tus datos</span> (PDFs, WhatsApps, Emails) son invisibles para tu ERP.<br />
                        No vendemos innovación de lujo. <span className="text-coral font-bold">Vendemos supervivencia basada en datos.</span>
                    </p>

                    {/* High-Impact CTA */}
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-4 bg-coral text-white text-xs md:text-sm uppercase tracking-[0.2em] font-bold px-10 py-4 overflow-hidden shadow-[0_0_20px_rgba(225,88,69,0.3)] hover:shadow-[0_0_30px_rgba(225,88,69,0.5)] transition-shadow"
                        >
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 group-hover:text-coral transition-colors">Auditar Fugas de Capital</span>
                            <TrendingUp className="w-4 h-4 relative z-10 group-hover:text-coral transition-colors" />
                        </motion.button>

                        <span className="text-white/30 text-[10px] uppercase tracking-widest">o</span>

                        <button className="text-white/80 hover:text-turquoise text-xs uppercase tracking-[0.2em] font-bold transition-colors border-b border-transparent hover:border-turquoise pb-1">
                            Ver Casos de Recuperación
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Cinematic Frame / HUD Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-forest-darker to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-forest-darker to-transparent z-10 pointer-events-none" />

            <div className="absolute bottom-12 left-12 flex gap-8 items-center z-20">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_15px_#E15845]" />
                    <div className="text-[10px] text-coral uppercase tracking-widest font-bold">Sistema de Detección Activo</div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-turquoise text-[10px] uppercase tracking-widest font-bold">
                    <Zap size={12} /> <span>Monitoreo de Fugas</span>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 text-[10px] text-white/40 uppercase tracking-widest z-20 flex items-center gap-4">
                <span>Desliza para ver el Problema</span>
                <div className="h-px w-12 bg-white/20" />
            </div>
        </section>
    );
};

export default Hero;
