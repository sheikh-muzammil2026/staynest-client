"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Banner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery.location.trim()) params.append('location', searchQuery.location.trim());
    if (searchQuery.propertyType) params.append('type', searchQuery.propertyType);
    if (searchQuery.minPrice) params.append('minPrice', searchQuery.minPrice);
    if (searchQuery.maxPrice) params.append('maxPrice', searchQuery.maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]" />

      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md"
          variants={itemVariants}
        >
          Find Your Dream Stay with <span className="text-blue-500 dark:text-blue-400">StayNest</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow"
          variants={itemVariants}
        >
          Discover the perfect place to live, relax, or work. Explore top-rated properties tailored just for you.
        </motion.p>

        <motion.div 
          className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          variants={itemVariants}
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Where are you going?"
                value={searchQuery.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Property Type</label>
              <select
                name="propertyType"
                value={searchQuery.propertyType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Min Price (৳)</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={searchQuery.minPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Max Price (৳)</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={searchQuery.maxPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="w-full">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-md transition-colors duration-200 text-sm uppercase tracking-wider cursor-pointer"
              >
                Search
              </motion.button>
            </div>

          </form>
        </motion.div>

      </motion.div>
    </section>
  );
}
