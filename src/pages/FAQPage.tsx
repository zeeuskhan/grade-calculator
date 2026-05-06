import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { SEO } from '../components/SEO';

const faqs = [
  {
    question: "How accurate is the GPA calculator?",
    answer: "Our calculator uses the exact mathematical formulas used by university registrars. For the US Scale, we use the standard 4.0 weighted average. For the Indian Scale, we follow CBSE and major University guidelines for CGPA and percentage conversion."
  },
  {
    question: "Is my data stored on your servers?",
    answer: "By default, no. All calculation data is stored locally in your browser's LocalStorage. This means your data stays on your device. Only if you create a 'Pro' account do we sync your data to our secure cloud for multi-device access."
  },
  {
    question: "Can I use this for high school and college?",
    answer: "Yes! The 'GPA Calculator' is flexible enough for both high school credits and college credit hours. The 'Grade Calculator' works for any cumulative class grade calculation."
  },
  {
    question: "How do I export my results?",
    answer: "You can click the 'Export PDF' button on any calculation page to generate a professional, formatted report of your grades and progress."
  },
  {
    question: "Difference between Weighted and Simple Average?",
    answer: "A Simple Average treats every assignment as equal. A Weighted Average applies specific 'weights' (like 30% for a Final Exam or 10% for Homework) to calculate your final grade based on importance."
  },
  {
    question: "What is 'Final Grade Prediction'?",
    answer: "This tool helps you calculate exactly what score you need on your final exam to achieve a specific target grade in your class."
  }
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-indigo-50/20 min-h-screen pb-20">
      <SEO 
        title="Frequently Asked Questions - Support Center"
        description="Find answers to common questions about GPA calculation, grading scales, and how to use our academic tools."
      />

      <div className="bg-indigo-950 py-24 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 animate-pulse" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Help <span className="text-indigo-400">Center.</span></h1>
          <p className="text-indigo-100/80 text-xl font-black mb-12">Everything you need to know about CalculatorOfGrades.</p>
          
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/10 focus:border-indigo-500/50 text-white rounded-[24px] py-6 pl-16 pr-8 font-black outline-none transition-all backdrop-blur-md placeholder:text-indigo-300/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-indigo-100 rounded-[32px] overflow-hidden shadow-xl shadow-indigo-900/5"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <HelpCircle size={20} />
                  </div>
                  <span className="text-lg font-black text-indigo-950 tracking-tight group-hover:text-indigo-600 transition-colors">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={cn("text-indigo-200 transition-transform duration-300", openIndex === index ? "rotate-180 text-indigo-600" : "")} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-indigo-50">
                      <p className="mt-6 text-indigo-950 font-bold leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-indigo-400 font-black">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-indigo-950 rounded-[40px] p-12 text-center text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
            <p className="text-indigo-100/60 mb-8 font-black">Our academic support team is ready to help you.</p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all active:scale-95"
            >
              Contact Support
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all" />
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default FAQPage;
