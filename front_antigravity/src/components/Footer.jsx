import React from 'react';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-turquoise/20 pt-24 pb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-turquoise/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        {/* Logo - Clean Version */}
                        <div className="mb-8">
                            <img
                                src="/assets/logo_clean_transparent.png"
                                alt="H3L"
                                className="h-12 w-auto object-contain opacity-100"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            No vendemos innovación de lujo.<br />
                            Vendemos supervivencia basada en datos.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-coral hover:bg-coral/10 transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-coral hover:bg-coral/10 transition-all duration-300">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-8">Explorar</h4>
                        <ul className="space-y-4">
                            <li><a href="#servicios" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Soluciones</a></li>
                            <li><a href="#nosotros" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Nosotros</a></li>
                            <li><a href="#casos" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Casos de Éxito</a></li>
                            <li><a href="#blog" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Insights</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-8">Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Privacidad</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-turquoise transition-colors text-sm">Términos</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-turquoise transition-colors text-sm">LOPDP Ecuador</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-display font-bold uppercase tracking-widest text-xs mb-8">Contacto</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-coral mt-1" size={16} />
                                <span className="text-gray-400 text-sm">Av. República del Salvador<br />Quito, Ecuador</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-coral" size={16} />
                                <span className="text-gray-400 text-sm">+593 99 999 9999</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-coral" size={16} />
                                <span className="text-gray-400 text-sm">hola@h3l.ai</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs">
                        © 2025 H3L S.A. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                        <span className="text-coral text-[10px] uppercase tracking-widest font-bold">Sistemas Operativos</span>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
