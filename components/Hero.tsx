
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && window.innerWidth > 1024) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 30;
        containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/armahphilipa/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/philipa-armah', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:philipaarmah@gmail.com', label: 'Email' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-28 md:pt-32 pb-16">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0%,transparent_60%)] opacity-70" />
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-32 -mt-32 md:-mr-64 md:-mt-64" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="text-center lg:text-left space-y-8 md:space-y-12 order-2 lg:order-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <div className="space-y-4 md:space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-600/10 border border-purple-500/20 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-purple-400 font-black tracking-[0.2em] text-[10px] uppercase">
                  Available for work
                </span>
              </motion.div>
              
              <motion.h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I'm <br />
                <span className="gradient-text py-2 md:py-4 block">Philipa.</span>
              </motion.h1>
              
              <motion.h2
                className="text-xl sm:text-3xl md:text-5xl font-bold text-slate-400 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Creative Web Developer
              </motion.h2>
            </div>

            <motion.p
              className="text-slate-400 text-base md:text-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Bridging the gap between imagination and reality through code, 
              building immersive digital experiences that matter.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl transition-all active:scale-95 shadow-2xl shadow-purple-600/30 flex items-center justify-center gap-3 group text-xs uppercase tracking-widest"
                onClick={() => window.open('https://file.pdf2url.com/pdf/2025-12-20/1766200855316-q73q3kr2.pdf', '_blank')}
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                Download CV
              </button>

              <div className="flex gap-4 md:gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center hover:text-white hover:border-purple-600 hover:shadow-2xl transition-all group active:scale-90"
                    aria-label={social.label}
                  >
                    <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]" ref={containerRef}>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-pink-600/20 to-blue-600/40 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-800/50 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-slate-900/40 backdrop-blur-md group">
                <img 
                  src="https://image2url.com/images/1766199442230-38ac75f6-db0c-487a-8b34-56c325d25a70.png" 
                  alt="Avatar" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 hidden sm:flex pointer-events-none"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
