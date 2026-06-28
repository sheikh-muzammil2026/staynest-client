"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Coins, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      id: 1,
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Secure Marketplace",
      description: "Verified property listings with secure JWT authorization and trusted role-based identity checks.",
    },
    {
      id: 2,
      icon: <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Instant Booking",
      description: "Seamless move-in scheduling and instantaneous booking response directly from verified owners.",
    },
    {
      id: 3,
      icon: <Coins className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Transparent Pricing",
      description: "No hidden charges. Secure integration with Stripe gateway ensures transparent transaction fees.",
    },
    {
      id: 4,
      icon: <Headphones className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "24/7 Priority Support",
      description: "Our dedicated moderation and support team is always ready to assist tenants and property owners.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  return (
    <section className="py-20 bg-[#F8FAFC] dark:bg-[#090D16] text-slate-950 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
            Core Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Why Choose StayNest
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Discover how we are redefining the rental ecosystem with transparency, security, and cutting-edge automation.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-[#131B2E]/40 border border-slate-200/60 dark:border-slate-800/70 p-8 rounded-3xl shadow-sm hover:border-indigo-500/40 transition-colors duration-300 flex flex-col items-center sm:items-start text-center sm:text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-5 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {benefit.icon}
                </div>
              </div>

              <h3 className="font-bold text-lg text-slate-950 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
            }
