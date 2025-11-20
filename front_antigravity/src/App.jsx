import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-coral selection:text-white">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
