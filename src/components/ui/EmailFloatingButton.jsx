import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../../lib/constants';

export default function EmailFloatingButton() {
  const emailAddress = CONTACT_INFO.email; 

  return (
    <motion.a
      href={`mailto:${emailAddress}`}
      aria-label="Email Us"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.1, // slight delay so it pops in after WhatsApp button
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(247, 135, 1, 0.4)" // Subtle Orange glow
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[5.5rem] md:bottom-24 right-6 z-[999] flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#F78701] text-white rounded-full shadow-lg shadow-black/10 cursor-pointer overflow-hidden transition-colors"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="26" 
        height="26" 
        className="md:w-8 md:h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    </motion.a>
  );
}
