import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { SEO } from '../components/SEO';

const faqs = [
  {
    question: "How accurate is this academic suite?",
    answer: "Extremely. We use standard US grading formulas (4.0 scale) and verified AP curves. Our algorithms mirror the exact math used by high school registrars and university admission offices across the United States. Just remember: always check your syllabus for specific rounding rules!"
  },
  {
    question: "Is my privacy protected? Where is my data kept?",
    answer: "Your privacy is our priority. All calculations happen locally in your browser's LocalStorage. We don't store your grades on our servers unless you explicitly create an account to sync across devices. Your business is your own."
  },
  {
    question: "Can I use this for both High School and College?",
    answer: "Absolutely! Whether you're tracking weighted AP credits in high school or calculating semester credit hours in college, our 'GPA Calculator' handles both. Use the 'Grade Calculator' for individual class tracking throughout the term."
  },
  {
    question: "How do I save or share my results with my advisor?",
    answer: "Every calculation tool features an 'Export PDF' button. This generates a clean, professional report you can email to your academic advisor, parents, or keep for your own records."
  },
  {
    question: "What's the difference between Weighted and Unweighted GPA?",
    answer: "An unweighted GPA is on a 4.0 scale regardless of class difficulty. A weighted GPA gives extra points (usually +1.0) for honors, AP, or IB courses to reflect the increased rigor. Most US colleges look at both during the admissions process."
  },
  {
    question: "How does the 'Final Grade Predictor' work?",
    answer: "It's your best friend during finals week. You enter your current grade, your target grade, and how much the final is worth. We do the algebra to tell you exactly what score you need on that last exam to reach your goal."
  },
  {
    question: "Does this support the Indian CGPA system too?",
    answer: "Yes! While we are optimized for the US student experience, we also include full support for the Indian CBSE/University CGPA systems, including the 10-point scale and percentage conversion."
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
