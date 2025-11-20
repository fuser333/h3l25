import React from 'react';
import { motion } from 'framer-motion';
import { EyeOff, FileWarning, AlertOctagon } from 'lucide-react';

const PainPoints = () => {
    const problems = [
        {
            id: "01",
            icon: <EyeOff size={32} className="text-coral" />,
            title: "80% DATOS INVISIBLES PARA ERP",
            status: "CRÍTICO",
            description: "El 80% de tus datos críticos (PDFs, emails, WhatsApps) no están en tu ERP. Ahí está el dinero perdido.",
            details: [
                "MIPYME Comercio Ecuador (100 pedidos/día):",
                "❌ 1-4% pedidos con errores = 30 errores/mes",
                "❌ Costo: $50-150 por error (disputa + tiempo)",
                "❌ PÉRDIDA: $18,000/año",
                "",
                "✅ Solución H3L: Agente Order-to-Cash",
                "✅ Reduce errores 1% → 0.3%",
                "✅ RECUPERA: $15,300/año"
            ]
        },
        {
            id: "02",
            icon: <AlertOctagon size={32} className="text-coral" />,
            title: "40% CAPACIDAD DESPERDICIADA",
            status: "ALERTA",
            description: "MIPYMES manufactura Ecuador operan a 60-66% OEE. World-class con IA: 85%. Brecha 25% = ¿Cuánto revenue pierdes?",
            details: [
                "MIPYME Ecuador 1 línea producción:",
                "❌ Revenue potencial 100%: $1,500,000/año",
                "❌ Revenue real 60% OEE: $900,000",
                "❌ PÉRDIDA: $600,000 capacidad no usada",
                "",
                "✅ Solución H3L: Agente OEE Optimizer",
                "✅ Incrementa 60% → 75% OEE",
                "✅ Revenue adicional: $225,000/año"
            ]
        },
        {
            id: "03",
            icon: <FileWarning size={32} className="text-coral" />,
            title: "LOPDP: RIESGO LEGAL $8.5K+",
            status: "PELIGRO",
            description: "Ley Orgánica Protección Datos Personales Ecuador: Multa = 1% facturación anual. ¿Tienes inventario PII actualizado?",
            details: [
                "MIPYME típica $850K/año:",
                "❌ Multa potencial: $8,500",
                "❌ 15% probabilidad audit SUPERDATOS sin compliance",
                "❌ Costo defensa legal: >>$8,500",
                "",
                "✅ Solución H3L: Compliance completo $1,200",
                "✅ Bonus: Portal CEO Seguro",
                "✅ Convierte riesgo en ventaja competitiva"
            ]
        }
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-turquoise/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-turquoise/30 to-transparent" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-24 text-center">
                    <span className="text-coral text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Diagnóstico Inicial</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-6">
                        ¿Por qué 76,562 MIPYMES ecuatorianas <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">pierden $18K-$125K sin verlo?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        El problema no es "falta de innovación". Es capital desperdiciado invisible para tu ERP.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-forest/30 hover:border-turquoise/30 transition-all duration-500 backdrop-blur-sm"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-turquoise/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="text-4xl font-display font-bold text-white/10 group-hover:text-turquoise/20 transition-colors">
                                    {item.id}
                                </div>
                                <div className={`text-[10px] font-bold tracking-widest px-2 py-1 border ${item.status === 'CRÍTICO' ? 'border-coral text-coral bg-coral/10' :
                                    item.status === 'PELIGRO' ? 'border-red-500 text-red-500 bg-red-500/10' :
                                        'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                                    }`}>
                                    {item.status}
                                </div>
                            </div>

                            <div className="mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500 origin-left">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-display font-bold text-white mb-4 tracking-wide group-hover:text-turquoise transition-colors relative z-10">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors mb-6">
                                {item.description}
                            </p>

                            {/* Ecuador-Specific Details */}
                            <div className="relative z-10 text-xs leading-relaxed space-y-1 font-mono">
                                {item.details.map((detail, idx) => (
                                    <div key={idx} className={`${detail.startsWith('❌') ? 'text-red-400/80' : detail.startsWith('✅') ? 'text-green-400/80' : 'text-gray-500'}`}>
                                        {detail}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PainPoints;
