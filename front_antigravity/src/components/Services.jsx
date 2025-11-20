import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
    {
        id: "01",
        title: "Audit Starter",
        price: "$950",
        desc: "Identificación inmediata de fugas.",
        features: ["2 Semanas", "Quick Wins"]
    },
    {
        id: "02",
        title: "Audit Pro",
        price: "$5,500",
        desc: "Despliegue de agentes y seguridad.",
        features: ["4-6 Semanas", "ROI Garantizado"]
    },
    {
        id: "03",
        title: "Enterprise",
        price: "Custom",
        desc: "Transformación integral.",
        features: ["12 Semanas", "Soporte 24/7"]
    }
];

const Services = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    return (
        <section ref={targetRef} id="servicios" className="relative h-[300vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-24 px-24">
                    <div className="flex flex-col justify-center min-w-[40vw]">
                        <h2 className="text-white/50 tracking-[0.5em] uppercase text-xs font-bold mb-8">
                            Nuestras Soluciones
                        </h2>
                        <h3 className="font-display text-6xl md:text-8xl text-white uppercase font-bold leading-none">
                            Ingeniería <br /> de Valor
                        </h3>
                    </div>

                    {services.map((service) => (
                        <div key={service.id} className="group relative flex flex-col justify-between min-w-[35vw] h-[60vh] border-l border-white/10 pl-12 hover:bg-white/5 transition-colors duration-500">
                            <div>
                                <span className="text-white/30 font-display text-lg mb-8 block">/{service.id}</span>
                                <h4 className="text-5xl font-display text-white font-bold uppercase mb-4 group-hover:text-coral transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-gray-400 font-light max-w-xs">{service.desc}</p>
                            </div>

                            <div>
                                <div className="flex gap-4 text-xs text-white/50 uppercase tracking-wider mb-8">
                                    {service.features.map((f, i) => (
                                        <span key={i} className="border border-white/10 px-3 py-1 rounded-full">{f}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                                    <span className="text-3xl text-white font-display font-bold">{service.price}</span>
                                    <ArrowUpRight className="text-white opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
