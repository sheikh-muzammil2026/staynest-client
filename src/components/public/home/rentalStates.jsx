"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Users, CheckCircle, Star } from "lucide-react";

export default function RentalStats() {
  const stats = [
    {
      id: 1,
      icon: <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      value: "12,400+",
      label: "Verified Properties",
      description: "Fully vetted and approved listings ready for immediate move-in.",
    },
    {
      id: 2,
      icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      value: "85,000+",
      label: "Happy Tenants",
      description: "Active community members who found their perfect home through us.",
    },
    {
      id: 3,
      icon: <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      value: "99.2%",
      label: "Successful Matches",
      description: "Our advanced matching ecosystem ensures high rental satisfaction.",
    },
    {
      id: 4,
      icon: <Star className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      value: "4.9/5",
      label: "Platform Rating",
      description: "Top-rated rental system based on thousands of independent reviews.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-[#090D16] text-slate-950 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Same Uniform Style */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
            Our Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            StayNest by the Numbers
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Real-time insights and milestones achieved by our rapidly expanding global rental ecosystem.
          </p>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#F8FAFC] dark:bg-[#131B2E]/30 border border-slate-200/50 dark:border-slate-800/60 p-8 rounded-3xl shadow-sm hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Label Flex Row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1A243A] shadow-sm border border-slate-100 dark:border-slate-800/80 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>

                {/* Big Metric Value */}
                <h3 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                  {stat.value}
                </h3>
              </div>

              {/* Sub-description */}
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
        }
