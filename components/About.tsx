
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Palette, Zap, Heart } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress within the about section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Create different parallax offsets for background elements
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  const skills = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, Tailwind CSS, JavaScript',
      color: '#61dafb'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Responsive Design',
      color: '#ff6b9d'
    },
    {
      icon: Zap,
      title: '3D & Animation',
      description: 'Three.js, GSAP, Framer Motion, WebGL',
      color: '#ffd93d'
    },
    {
      icon: Heart,
      title: 'Backend & Database',
      description: 'Firebase, Supabase',
      color: '#6bcf7f'
    }
  ];

  const stats = [
    { number: '10+', label: 'Projects Done' },
    { number: '3+', label: 'Years Exp.' },
    { number: '5+', label: 'Happy Clients' },
    { number: '100%', label: 'Satisfaction' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative bg-slate-950/50 py-20 px-4 sm:px-12 lg:py-32 overflow-hidden"
    >
      {/* Animated Parallax Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/15 rounded-full blur-[80px] md:blur-[120px]"
          style={{ y: yParallax1, scale: scaleParallax }}
          animate={{
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[100px] md:blur-[150px]"
          style={{ y: yParallax2 }}
          animate={{
            x: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
        
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24 lg:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black gradient-text mb-6 md:mb-8 tracking-tighter">About Me</h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
            I craft high-performance digital experiences that merge <span className="text-white font-medium">technical precision</span> with <span className="text-purple-400 font-medium">creative flair</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-10 lg:space-y-12">
            <motion.div
              className="space-y-6 md:space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center justify-center lg:justify-start gap-4">
                <span className="w-8 h-1.5 bg-purple-500 rounded-full hidden sm:block shrink-0" />
                My Creative Journey
              </h3>
              <div className="space-y-4 md:space-y-6 text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed">
                <p>
                  I'm a creative developer who bridges the gap between design and code. With over 3 years of professional experience, I turn complex problems into elegant, user-centric solutions.
                </p>
                <p>
                  My approach is rooted in curiosity and continuous learning. I believe the best websites don't just work, they tell a story and create an emotional connection with the user.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl md:rounded-[2rem] border border-slate-800/50 text-center hover:border-purple-500/40 transition-all group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text group-hover:scale-110 transition-transform mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[9px] md:text-xs text-slate-500 uppercase tracking-widest font-black leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="flex items-start gap-4 md:gap-6 p-5 sm:p-8 bg-slate-900/40 rounded-2xl md:rounded-[2rem] border border-slate-800/30 hover:bg-slate-800/40 transition-all group"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                  >
                    <skill.icon size={24} className="sm:w-8 sm:h-8" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">{skill.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-base leading-relaxed">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
