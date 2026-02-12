
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with React and Node.js",
      longDescription: "A full-stack e-commerce solution featuring user authentication, payment processing, inventory management, and an admin dashboard. Built with React and Tailwind CSS.",
      image: "https://image2url.com/r2/bucket2/images/1766831889258-9325760f-9904-437f-9e60-964114459350.png",
      tech: ["React", "Tailwind", "Node.js", "Stripe"],
      liveUrl: "https://tmp-challenge.vercel.app",
      githubUrl: "#",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "KolikoWear Ecommerce",
      description: "Interactive 3D portfolio with Three.js animations",
      longDescription: "An immersive 3D portfolio website showcasing creative web development skills. Features interactive 3D models, particle systems, and smooth animations using Three.js and GSAP.",
      image: "https://image2url.com/r2/bucket2/images/1766831800783-2bef50f8-f40b-4e16-b389-4cb9cd618e1b.png",
      tech: ["Three.js", "React", "GSAP", "WebGL"],
      liveUrl: "https://kolikowearshop.vercel.app/",
      githubUrl: "#",
      category: "Web App",
    },
    {
      id: 3,
      title: "Task Management",
      description: "Collaborative task management with real-time updates",
      longDescription: "A comprehensive task management application with real-time collaboration features, drag-and-drop functionality, team management, and progress tracking.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Firebase", "Tailwind CSS"],
      liveUrl: "https://dicsonmoblog.netlify.app",
      githubUrl: "#",
      category: "Web App",
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description: "Modern chat interface with AI integration",
      longDescription: "An intelligent chat interface with AI-powered responses, message history, file sharing, and real-time typing indicators.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "OpenAI API", "WebSocket"],
      liveUrl: "https://kolikolandingpage.netlify.app/",
      githubUrl: "#",
      category: "AI/ML",
    },
    {
      id: 5,
      title: "Foodies Plug",
      description: "Food vendor platform with online ordering",
      longDescription: "A beautiful restaurant website featuring online menu, reservation system, order tracking, and payment integration.",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React.js", "Firebase", "Tailwind"],
      liveUrl: "https://foodiesplug.vercel.app",
      githubUrl: "#",
      category: "Frontend",
    },
    {
      id: 6,
      title: "Hospital CMS",
      description: "End-to-end management for health facilities",
      longDescription: "A complete hospital management system designed to streamline patient registration, appointment scheduling, and doctor management.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Firebase", "FastAPI"],
      liveUrl: "https://empathycarelandingpage.vercel.app",
      githubUrl: "#",
      category: "Management System",
    },
    {
      id: 9,
      title: "Blackjack Game",
      description: "Interactive web-based card game",
      longDescription: "A fun and engaging Blackjack game built with React. Features chip management and automated dealer logic.",
      image: "https://images.pexels.com/photos/6664308/pexels-photo-6664308.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "JavaScript", "Tailwind"],
      liveUrl: "https://blackjackgame-sand.vercel.app/",
      githubUrl: "#",
      category: "Game Development",
    },{
      id: 10,
      title: "Koliko Dashboard",
      description: "End-to-end management for Ecommerce",
      longDescription: "A complete dashboard system designed to streamline patient registration, appointment scheduling, and doctor management.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Firebase", "FastAPI"],
      liveUrl: "https://kolikoadmin-pmq4.vercel.app/",
      githubUrl: "#",
      category: "Management System",
    },
    {
      id: 11,
      title: "Ping Coming landingpage",
      description: "Food vendor platform with online ordering",
      longDescription: "A beautiful restaurant website featuring online menu, reservation system, order tracking, and payment integration.",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React.js", "Firebase", "Tailwind"],
      liveUrl: "https://ping-coming-three.vercel.app/",
      githubUrl: "#",
      category: "Frontend",
    },
    {
      id: 12,
      title: "Huddle Landingpage",
      description: "Food vendor platform with online ordering",
      longDescription: "A beautiful restaurant website featuring online menu, reservation system, order tracking, and payment integration.",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React.js", "Firebase", "Tailwind"],
      liveUrl: "https://huddle-landing-page-taupe-one.vercel.app/",
      githubUrl: "#",
      category: "Frontend",
    }
  ];

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const nextProject = () => setCurrentIndex(prev => (prev + 1) % filteredProjects.length);
  const prevProject = () => setCurrentIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <section id="portfolio" className="relative bg-slate-950 py-20 px-4 sm:px-12 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(120,50,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black gradient-text mb-6 md:mb-8 tracking-tighter">Selected Works</h2>
          <p className="text-slate-400 text-base md:text-2xl max-w-2xl mx-auto px-4 leading-relaxed">
            Exploring the intersection of aesthetics and functionality in the digital realm.
          </p>
        </motion.div>

        <div className="mb-10 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 lg:flex lg:justify-center">
          <div className="flex gap-2.5 md:gap-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-sm font-black transition-all duration-300 border-2 whitespace-nowrap uppercase tracking-widest ${
                  activeCategory === cat
                    ? "bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                    : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-12">
            <div className="flex-1 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${currentIndex}`}
                  className="flex flex-col lg:flex-row h-full min-h-[450px] md:min-h-[500px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <div className="lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden group/img shrink-0">
                    <img
                      src={filteredProjects[currentIndex]?.image}
                      alt={filteredProjects[currentIndex]?.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                    <div className="hidden lg:flex absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedProject(filteredProjects[currentIndex])}
                        className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                      >
                        <ExternalLink size={28} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 md:p-12 lg:p-16 lg:w-1/2 flex flex-col justify-center bg-slate-900/40 grow">
                    <span className="text-purple-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">
                      {filteredProjects[currentIndex]?.category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                      {filteredProjects[currentIndex]?.title}
                    </h3>
                    <p className="text-slate-400 text-sm sm:text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-lg">
                      {filteredProjects[currentIndex]?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-2.5 mb-8 md:mb-14">
                      {filteredProjects[currentIndex]?.tech.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-slate-800/80 text-slate-300 text-[9px] md:text-[11px] font-black rounded-xl border border-slate-700/50 uppercase tracking-[0.1em]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                      <button
                        onClick={() => setSelectedProject(filteredProjects[currentIndex])}
                        className="flex-1 sm:flex-none px-6 md:px-10 py-4 md:py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl transition-all active:scale-95 text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-purple-600/20"
                      >
                        Details
                      </button>
                      <div className="flex gap-4 md:gap-6 px-2">
                        <a href={filteredProjects[currentIndex]?.githubUrl} className="text-slate-500 hover:text-white transition-all transform hover:scale-110" aria-label="GitHub">
                          <Github size={24} className="md:w-7 md:h-7" />
                        </a>
                        <a href={filteredProjects[currentIndex]?.liveUrl} className="text-slate-500 hover:text-white transition-all transform hover:scale-110" aria-label="Live Demo">
                          <ExternalLink size={24} className="md:w-7 md:h-7" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Controls */}
            <div className="hidden lg:flex flex-col gap-5">
              <button
                onClick={prevProject}
                disabled={filteredProjects.length <= 1}
                className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 hover:shadow-2xl transition-all disabled:opacity-20 active:scale-90"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={nextProject}
                disabled={filteredProjects.length <= 1}
                className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-600 hover:border-purple-600 hover:shadow-2xl transition-all disabled:opacity-20 active:scale-90"
              >
                <ChevronRight size={40} />
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden justify-between items-center mt-6 px-1">
               <button
                  onClick={prevProject}
                  disabled={filteredProjects.length <= 1}
                  className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center active:bg-purple-600 active:scale-90 disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2.5">
                  {filteredProjects.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-purple-500" : "w-1.5 bg-slate-800"}`} />
                  ))}
                </div>
                <button
                  onClick={nextProject}
                  disabled={filteredProjects.length <= 1}
                  className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center active:bg-purple-600 active:scale-90 disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 md:p-12 bg-slate-950/98 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-slate-800 shadow-2xl overflow-y-auto max-h-[92vh] no-scrollbar flex flex-col lg:flex-row"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-[2001] w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all shadow-xl active:scale-90"
                onClick={() => setSelectedProject(null)}
              >
                <X size={28} strokeWidth={3} />
              </button>

              <div className="w-full lg:w-3/5 aspect-video lg:h-auto overflow-hidden bg-slate-950 shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full lg:w-2/5 p-6 sm:p-10 md:p-14 flex flex-col justify-center grow">
                <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-10 leading-[0.9] tracking-tighter">
                  {selectedProject.title}
                </h3>
                
                <div className="space-y-8">
                  <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">
                      {selectedProject.longDescription}
                  </p>

                  <div className="space-y-4">
                      <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-40">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t: string) => (
                              <span key={t} className="bg-slate-800/80 text-purple-400 px-4 py-2 rounded-xl text-[9px] font-black border border-purple-500/10 uppercase tracking-widest">
                                  {t}
                              </span>
                          ))}
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-8 py-4 bg-purple-600 text-white rounded-xl font-black text-center hover:bg-purple-700 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest shadow-lg shadow-purple-600/20"
                      >
                          <ExternalLink size={18} />
                          Live Demo
                      </a>
                      <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-black text-center hover:bg-slate-700 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
                      >
                          <Github size={18} />
                          GitHub
                      </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
