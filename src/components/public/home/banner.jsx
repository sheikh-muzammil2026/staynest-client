"use client"; // Next.js-এ Framer Motion এবং Hooks ব্যবহারের জন্য আবশ্যক

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Banner() {
  // সার্চ বারের স্টেট ম্যানেজমেন্ট
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
    console.log('Searching for:', searchQuery);
  };

  // অ্যানিমেশনের জন্য ভ্যারিয়েন্ট (Variants) কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // একটির পর আরেকটি উপাদান অ্যানিমেট হবে
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // শুরুতে নিচে থাকবে এবং অদৃশ্য থাকবে
    visible: {
      opacity: 1,
      y: 0, // নিজের অরিজিনাল পজিশনে চলে আসবে
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]" />

      {/* Main Content Wrapper (Framer Motion Container) */}
      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 text-center text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md"
          variants={itemVariants}
        >
          Find Your Dream Stay with <span className="text-blue-500 dark:text-blue-400">StayNest</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow"
          variants={itemVariants}
        >
          Discover the perfect place to live, relax, or work. Explore top-rated properties tailored just for you.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          variants={itemVariants}
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Location Input */}
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

            {/* Property Type Dropdown */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Property Type</label>
              <select
                name="propertyType"
                value={searchQuery.propertyType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
              </select>
            </div>

            {/* Min Price Input */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Min Price ($)</label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={searchQuery.minPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Max Price Input */}
            <div className="flex flex-col text-left">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Max Price ($)</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={searchQuery.maxPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Search Button with Hover & Tap Animation */}
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
