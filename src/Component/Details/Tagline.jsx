import React from 'react';
import { motion } from 'framer-motion';
import { SiComma } from 'react-icons/si';

export default function Tagline({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }} // <- animate every time it's 50% in view
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full text-center py-6 bg-black flex items-center justify-center px-4"
    >
      <p className="text-2xl sm:text-3xl font-medium text-light-orange drop-shadow-md italic flex items-center justify-center flex-wrap">
        {text}
        <span className="ml-2 mt-1">
          <SiComma className="text-light-orange text-xl" />
        </span>
      </p>
    </motion.div>
  );
}
