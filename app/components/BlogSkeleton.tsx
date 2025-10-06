"use client";

import { motion } from 'framer-motion';

export default function BlogPostSkeleton() {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title skeleton */}
      <div className="flex justify-between items-start mb-3">
        <motion.div 
          className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md w-3/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md w-16"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
      
      {/* Excerpt skeleton */}
      <motion.div 
        className="space-y-2 mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md w-full" />
        <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-md w-5/6" />
      </motion.div>
      
      {/* Tags skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full w-16"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: 0.6 + (i * 0.1) 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}