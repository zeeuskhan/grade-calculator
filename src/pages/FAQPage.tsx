import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const faqs = [
  {
    question: "How accurate is the math behind Calculator Of Grades?",
    answer: "Our suite is precision-engineered to match the standard US grading protocols used by registrars in high schools and colleges. We utilize verified AP curves and the official 4.0 weighted average methodology to ensure your results are 100% reliable for your academic planning."
  },
  {
    question: "Where is my grade data stored?",
    answer: "By default, every calculation lives strictly in your browser's local storage. This means your private gradebook stays on your device. We prioritize student privacy and do not transmit your grades to our servers unless you explicitly sync an account."
  },
  {
    question: "Can I use these tools for both High School and University?",
    answer: "Absolutely. Our 'Grade Calculator' is ideal for tracking semester-wide class progress, while our 'GPA Calculator' is the ultimate tool for cumulative transcript tracking in the United States."
  },
  {
    question: "How do I report my GPA to my counselor or advisor?",
    answer: "Every tool in our calculator suite includes a 'PDF Export' feature. This allows you to generate a professional, polished grading report that you can instantly email to academic advisors, parents, or college admissions officers."
  },
  {
    question: "Weighted vs. Unweighted GPA: What's the difference in the US?",
    answer: "An unweighted GPA treats all classes equally on a 4.0 scale. A weighted GPA (often up to 5.0) adds extra value for rigorous courses like AP, IB, or Honors. Most American universities evaluate both to get a full picture of your academic challenge."
  },
  {
    question: "How does the 'Final Grade Predictor' save my semester?",
    answer: "This tool is essential for finals week. By entering your current grade and your goal, we calculate the exact percentage you need on your final exam to keep your grade. It eliminates the guesswork and helps you study smarter."
  },
  {
    question: "Is there support for international scales like CGPA?",
    answer: "Yes! While we are the #1 resource for US students, we also support the 10-point India Scale and other international systems, ensuring students everywhere can track their progress accurately."
  }
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-indigo-50/20 dark:bg-indigo-950/20 min-h-screen pb-20 transition-colors duration-300">
      <SEO 
        title="Frequently Asked Questions - Academic Support"
        description="Comprehensive answers to common questions about GPA, weighted grades, and the Calculator Of Grades suite."
        schema={schemaData}
      />

      <div className="bg-indigo-950 dark:bg-black/40 py-24 px-4 relative overflow-hidden text-center transition-colors">
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 dark:bg-indigo-500/2 animate-pulse" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter transition-all">Help <span className="text-indigo-400 dark:text-indigo-500">Center.</span></h1>
          <p className="text-indigo-100/80 dark:text-indigo-100/60 text-xl font-black mb-12 transition-colors">Expert guidance for CalculatorOfGrades.</p>
          
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 dark:bg-black/20 border border-white/10 dark:border-indigo-900 focus:border-indigo-500/50 text-white rounded-[24px] py-6 pl-16 pr-8 font-black outline-none transition-all backdrop-blur-md placeholder:text-indigo-300/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-[32px] overflow-hidden shadow-xl shadow-indigo-900/5 dark:shadow-none transition-colors backdrop-blur-sm"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors">
                    <HelpCircle size={20} />
                  </div>
                  <span className="text-lg font-black text-indigo-950 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={cn("text-indigo-200 dark:text-indigo-800 transition-transform duration-300", openIndex === index ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "")} 
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
                    <div className="px-8 pb-8 pt-0 border-t border-indigo-50 dark:border-indigo-900/50 transition-colors">
                      <p className="mt-6 text-indigo-950 dark:text-indigo-100 font-bold leading-relaxed transition-colors">
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
              <p className="text-indigo-400 dark:text-indigo-600 font-black">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-indigo-950 dark:bg-indigo-900/40 rounded-[40px] p-12 text-center text-white relative overflow-hidden group transition-colors border border-transparent dark:border-indigo-800">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
            <p className="text-indigo-100/60 mb-8 font-black">Our academic support team is ready to help you.</p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-white dark:bg-indigo-600 text-indigo-950 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
            >
              Contact Support
            </a>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all shadow-none" />
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default FAQPage;
