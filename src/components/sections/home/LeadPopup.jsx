import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    // DEVELOPMENT MODE
    // Always show popup after 10 seconds.
    // Do not use sessionStorage or localStorage.
    
    // PRODUCTION MODE
    // Restore sessionStorage so popup appears only once per browser session.
    // const hasBeenShown = sessionStorage.getItem('leadPopupShown');
    // if (hasBeenShown) return;

    // Start 10-second timer after Home page (component) has loaded
    const timer = setTimeout(() => {
      setIsOpen(true);
      // PRODUCTION MODE
      // sessionStorage.setItem('leadPopupShown', 'true');
    }, 10000); // 10 seconds

    // Cleanup timer if visitor navigates away before 10 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Prevent background scrolling when popup is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // PRODUCTION MODE
    // sessionStorage.setItem('leadPopupShown', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 font-sans">
          {/* Dark Overlay (40% opacity) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Popup Container (Premium Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[24px] shadow-2xl overflow-hidden z-10 p-8 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-heading"
          >
            {/* Close Button (✕) */}
            <button 
              onClick={handleClose}
              className="absolute top-5 right-5 p-2.5 rounded-full text-gray-500 hover:text-[#111111] hover:bg-black/5 transition-colors duration-300 z-20"
              aria-label="Close popup"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Content */}
            <div className="text-center mb-8 mt-2 relative z-10">
              <span className="inline-block uppercase tracking-widest text-[11px] font-bold text-[#F7941D] mb-3">
                Exclusive Consultation
              </span>
              <h2 id="popup-heading" className="font-display font-bold text-2xl md:text-3xl text-[#111111] mb-4 leading-tight">
                Let's Design Your Dream Space
              </h2>
              <p className="font-serif italic text-[15px] md:text-[16px] text-[#636363] leading-relaxed max-w-[90%] mx-auto">
                Share your details and our design experts will help you create a space that reflects your lifestyle and vision.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name" 
                  className="w-full px-5 py-3.5 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F7941D] focus:ring-1 focus:ring-[#F7941D] transition-all duration-300 text-[#111111] placeholder:text-gray-400 font-medium text-[14px]"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Mobile Number" 
                  className="w-full px-5 py-3.5 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F7941D] focus:ring-1 focus:ring-[#F7941D] transition-all duration-300 text-[#111111] placeholder:text-gray-400 font-medium text-[14px]"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address" 
                  className="w-full px-5 py-3.5 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F7941D] focus:ring-1 focus:ring-[#F7941D] transition-all duration-300 text-[#111111] placeholder:text-gray-400 font-medium text-[14px]"
                />
              </div>
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F7941D] focus:ring-1 focus:ring-[#F7941D] transition-all duration-300 text-[#111111] font-medium text-[14px]"
                >
                  <option value="">Select a service</option>
                  <optgroup label="Interior Services">
                    <option>Residential Interiors</option>
                    <option>Commercial Interiors</option>
                    <option>Interior Design</option>
                    <option>False Ceiling</option>
                    <option>Flooring</option>
                    <option>Wallpaper</option>
                    <option>Painting</option>
                    <option>Glass Partitions</option>
                  </optgroup>
                  <optgroup label="Exterior Services">
                    <option>Exterior Design</option>
                    <option>ACP Cladding</option>
                    <option>Glazing</option>
                    <option>UPVC Windows</option>
                    <option>Gypsum Plaster</option>
                  </optgroup>
                  <option>Multiple Services</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full mt-2 py-4 px-6 bg-[#111111] hover:bg-[#F7941D] text-white rounded-xl font-bold text-[14px] tracking-wide transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-[#F7941D]/30 transform hover:-translate-y-0.5"
              >
                Request a Free Consultation
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
