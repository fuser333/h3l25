import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
                ? 'bg-black/90 backdrop-blur-lg border-turquoise/20 py-4'
                : 'bg-gradient-to-b from-black/90 to-transparent border-white/5 py-6'
                }`}
        >
            <div className="container mx-auto px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Logo - Clean Version */}
                    <div className="relative group">
                        <img
                            src="/assets/logo_clean_transparent.png"
                            alt="H3L Logo"
                            className="h-12 w-auto object-contain opacity-100 group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="hidden md:block w-px h-8 bg-white/10 mx-2" />
                    <span className="hidden md:block text-[10px] text-white/60 uppercase tracking-widest font-medium">
                        Unidad de Extracción de Valor
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-12">
                    <a href="#servicios" className="text-white/80 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-turquoise">Soluciones</a>
                    <a href="#nosotros" className="text-white/80 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-turquoise">Nosotros</a>
                    <a href="#contacto" className="text-white/80 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-turquoise">Contacto</a>
                    <Button variant="outline" className="border-coral/50 text-coral hover:bg-coral hover:border-coral hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-none transition-all duration-300">
                        Auditoría Gratis
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-forest-darker z-50 flex flex-col items-center justify-center gap-12">
                    <button
                        className="absolute top-8 right-8 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    <a href="#servicios" className="text-4xl font-display text-white uppercase font-bold tracking-widest hover:text-turquoise transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Soluciones</a>
                    <a href="#nosotros" className="text-4xl font-display text-white uppercase font-bold tracking-widest hover:text-turquoise transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Nosotros</a>
                    <a href="#contacto" className="text-4xl font-display text-white uppercase font-bold tracking-widest hover:text-turquoise transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contacto</a>
                </div>
            )}
        </header>
    );
};

export default Header;
