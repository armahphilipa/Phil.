import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success'>(null);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required';
        else if (value.trim().length < 5) error = 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (hasErrors) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouched({});
    
    setTimeout(() => {
      setSubmitStatus(null);
    }, 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'philipaarmah@gmail.com',
      href: 'mailto:philipaarmah@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+233 5583 2546',
      href: 'tel:+233558432546'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sekondi-Takoradi',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/armahphilipa/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/philipa-armah', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <section id="contact" className="relative bg-slate-950 py-20 px-4 sm:px-8 lg:py-32 overflow-hidden border-t border-slate-900">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black gradient-text mb-6 tracking-tighter">Get In Touch</h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Ready to start your next project? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-5 space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Let's Connect</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                I'm always excited to work on new projects and collaborate with creative minds. 
                Whether you have a vision or just want to chat tech, I'm just a message away.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-5 p-5 bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-purple-500/50 hover:bg-slate-800/60 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <info.icon size={22} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{info.label}</span>
                    <span className="text-slate-200 font-medium md:text-lg">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="pt-8 text-center lg:text-left">
              <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Follow the Journey</h4>
              <div className="flex justify-center lg:justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center hover:text-white hover:border-purple-600 transition-all shadow-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, rotate: 5 }}
                    viewport={{ once: true }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/30 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-slate-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <form className="relative z-10 space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-4 bg-slate-950/50 border rounded-xl text-white focus:outline-none transition-all placeholder:text-slate-700 ${
                        errors.name && touched.name ? 'border-pink-500/50 focus:border-pink-500' : 'border-slate-800 focus:border-purple-500'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && touched.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-1.5 text-pink-500 text-[10px] md:text-xs font-medium mt-1 ml-1"
                        >
                          <AlertCircle size={14} />
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-4 bg-slate-950/50 border rounded-xl text-white focus:outline-none transition-all placeholder:text-slate-700 ${
                        errors.email && touched.email ? 'border-pink-500/50 focus:border-pink-500' : 'border-slate-800 focus:border-purple-500'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && touched.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-1.5 text-pink-500 text-[10px] md:text-xs font-medium mt-1 ml-1"
                        >
                          <AlertCircle size={14} />
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-6 py-4 bg-slate-950/50 border rounded-xl text-white focus:outline-none transition-all placeholder:text-slate-700 ${
                      errors.subject && touched.subject ? 'border-pink-500/50 focus:border-pink-500' : 'border-slate-800 focus:border-purple-500'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.subject && touched.subject && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-1.5 text-pink-500 text-[10px] md:text-xs font-medium mt-1 ml-1"
                      >
                        <AlertCircle size={14} />
                        {errors.subject}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-6 py-4 bg-slate-950/50 border rounded-xl text-white focus:outline-none transition-all placeholder:text-slate-700 resize-none ${
                      errors.message && touched.message ? 'border-pink-500/50 focus:border-pink-500' : 'border-slate-800 focus:border-purple-500'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.message && touched.message && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-1.5 text-pink-500 text-[10px] md:text-xs font-medium mt-1 ml-1"
                      >
                        <AlertCircle size={14} />
                        {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  className={`w-full group relative flex items-center justify-center gap-3 px-8 py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_rgba(147,51,234,0.3)] ${
                    isSubmitting ? 'cursor-not-allowed opacity-80' : ''
                  }`}
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { y: -2 } : {}}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckCircle size={20} />
                      Thank you! Your message has been received.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              opacity: 0 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Contact;