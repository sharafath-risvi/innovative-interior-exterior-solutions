import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../../lib/constants';

export default function LandlineFloatingButton() {
  const landlineNumber = CONTACT_INFO.phone1; 

  return (
    <motion.a
      href={`tel:${landlineNumber}`}
      aria-label="Call Landline"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.2, // slight delay so it pops in after Email button
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(247, 135, 1, 0.4)" // Subtle Orange glow
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[9.5rem] md:bottom-[10.5rem] right-6 z-[999] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#2563EB] text-white rounded-full shadow-lg shadow-black/10 cursor-pointer overflow-hidden transition-colors border border-white/10 hover:border-orange-500/50"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="26" 
        height="26" 
        className="md:w-8 md:h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    </motion.a>
  );
}
