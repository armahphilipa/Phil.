import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search for the closest anchor tag that has an internal link
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            
            // Refined offsets: 70px for mobile (py-4), 90px for desktop (py-6/8)
            const navOffset = window.innerWidth < 768 ? 70 : 90;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { 
                y: elementPosition - navOffset, 
                autoKill: true 
              },
              ease: 'power4.inOut'
            });
          }
        }
      }
    };

    window.addEventListener('click', handleSmoothScroll);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white bg-slate-950 overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      <footer className="py-12 md:py-20 px-6 text-center text-slate-500 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black gradient-text tracking-tighter">&lt;Phil.dev /&gt;</h2>
            <p className="text-xs md:text-sm max-w-xs md:max-w-sm text-slate-400 mx-auto">
              Bridging the gap between imagination and reality through code.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#portfolio" className="hover:text-purple-400 transition-colors">Works</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <div className="pt-8 md:pt-12 border-t border-white/5 w-full">
            <p className="text-[9px] md:text-[10px] font-medium tracking-[0.1em] md:tracking-widest text-slate-600 leading-loose">
              &copy; {new Date().getFullYear()} Philipa Armah. <br className="sm:hidden" /> All rights reserved. 
              <span className="hidden sm:inline"> | </span> 
              Built with React, Three.js & Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;