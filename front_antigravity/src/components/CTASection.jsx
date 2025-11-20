import React from 'react';
import Button from './Button';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-secondary to-gray-darker z-0" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                    ¿Listo para recuperar ese capital?
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                    Tu primera auditoría LOPDP es gratuita. El riesgo de no hacerla es del <span className="text-coral-glow font-bold">1% de tu facturación</span>.
                </p>
                <Button variant="primary" className="text-lg px-12 py-5 shadow-[0_0_30px_rgba(225,88,69,0.4)] hover:shadow-[0_0_50px_rgba(225,88,69,0.6)] transition-shadow duration-300">
                    Agendar Auditoría Gratuita
                </Button>
            </div>
        </section>
    );
};

export default CTASection;
