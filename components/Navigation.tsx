import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navItems, setNavItems] = useState<{ href: string; label: string }[]>([]);

  useEffect(() => {
    const sections = ['home', 'about', 'portfolio', 'contact'];
    const items = sections.map(id => ({
      href: `#${id}`,
      label: id === 'portfolio' ? 'Work' : id.charAt(0).toUpperCase() + id.slice(1)
    }));
    setNavItems(items);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = 'home';
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 120) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a 
          href="#home"
          className="text-xl md:text-2xl font-black gradient-text tracking-tighter uppercase shrink-0 relative z-[1001]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt;Phil.dev /&gt;
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-black transition-all relative group uppercase tracking-[0.2em] ${
                activeSection === item.href.slice(1) ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-purple-500 transition-all ${
                activeSection === item.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-6 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle - Highest Z to remain clickable over sidebar */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors bg-slate-900/50 rounded-xl border border-slate-800/50 relative z-[1020]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[1005]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="fixed top-0 right-0 h-screen w-full sm:w-[320px] bg-slate-900 z-[1010] border-l border-white/5 flex flex-col p-10 md:p-12 shadow-2xl overflow-y-auto no-scrollbar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Removed redundant logo div from here to fix double logo issue */}
              <div className="flex flex-col gap-6 mt-16">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`text-4xl font-black transition-colors tracking-tighter ${
                      activeSection === item.href.slice(1) ? 'text-purple-400' : 'text-slate-400 hover:text-white'
                    }`}
                    onClick={handleNavClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-slate-800 shrink-0 mb-6">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">Let's Connect</p>
                <div className="flex gap-4">
                  {[
                    { Icon: Github, href: 'https://github.com/armahphilipa/' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/philipa-armah' },
                    { Icon: Mail, href: 'mailto:philipaarmah@gmail.com' }
                  ].map(({ Icon, href }, i) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;