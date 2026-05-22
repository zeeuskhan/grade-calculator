import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, ArrowRight, Info, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Tooltip } from '../components/Tooltip';
import { cn, formatNum } from '../lib/utils';

const FinalGradePage = () => {
  const [currentGrade, setCurrentGrade] = useState<number>(85);
  const [targetGrade, setTargetGrade] = useState<number>(90);
  const [finalWeight, setFinalWeight] = useState<number>(20);

  const requiredOnFinal = (targetGrade - (currentGrade * (1 - finalWeight / 100))) / (finalWeight / 100);

  const getUrgency = () => {
    if (requiredOnFinal > 100) return { color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', label: 'Impossible?' };
    if (requiredOnFinal > 90) return { color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', label: 'High Effort' };
    return { color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/30', label: 'Achievable' };
  };

  const urgency = getUrgency();

  const faqsData = [
    { q: "What if the calculator says I need 110%?", a: "It happens to the best of us. This usually means your target grade is mathematically out of reach based on your current standing and the final exam's weight. Ask your professor if they offer bonus points or extra credit assignments to bridge the gap." },
    { q: "How accurate is the 2025 final grade formula?", a: "It's 100% accurate because it uses pure algebra. However, remember to account for any 'weighted categories' your teacher might use. If your final is its own category worth 20%, this tool is your perfect North Star." }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Target Final Grade Calculator & Predictor",
        "url": "https://calculatorofgrades.vercel.app/final-grade-predictor",
        "description": "Calculate exactly what score you need on your final exam to achieve your target overall grade. Used by millions of students during finals season.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqsData.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 dark:bg-indigo-950/20 pb-20 transition-colors duration-300">
      <SEO 
        title="Final Grade Calculatorofgrade - What Score Do I Need on My Final?"
        description="The expert calculatorofgrade for your final exam targets. Our final grade predictor helps you reach your target grade with real math and professional accuracy."
        schema={schemaData}
      />

      {/* Hero Header */}
      <div className="bg-indigo-950 dark:bg-black py-16 md:py-24 px-4 overflow-hidden relative transition-colors">
        <div className="absolute inset-0 -z-0">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white mx-auto mb-6 md:mb-8 shadow-2xl shadow-indigo-500/20"
           >
             <Target size={40} />
           </motion.div>
           <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">Final Grade <span className="text-indigo-400">Predictor.</span></h1>
           <p className="text-indigo-100/80 text-lg md:text-xl font-black">The internet's most accurate final exam calculator.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Inputs */}
          <div className="bg-white dark:bg-indigo-900/20 p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl shadow-indigo-900/5 dark:shadow-none border border-indigo-100 dark:border-indigo-800/50 transition-colors backdrop-blur-md">
            <div className="space-y-6 md:space-y-8">
              <div className="group">
                <label className="block text-[10px] md:text-xs font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors">
                   Current Class Grade (%)
                   <Tooltip content="Your current overall grade in the class before the final exam">
                      <HelpCircle size={12} className="text-indigo-400 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50 dark:bg-indigo-900/50" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(Number(e.target.value))}
                    className="w-full text-3xl md:text-5xl font-black bg-white dark:bg-indigo-950 p-8 md:p-10 rounded-[24px] md:rounded-[32px] border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/50 transition-all outline-none text-indigo-950 dark:text-white shadow-xl shadow-indigo-900/5 dark:shadow-none"
                   />
                   <span className="absolute right-8 md:right-10 top-1/2 -translate-y-1/2 text-2xl md:text-4xl font-black text-indigo-200 dark:text-indigo-700">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] md:text-xs font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 text-wrap transition-colors">
                   Target Overall Grade (%)
                   <Tooltip content="The final grade you want to achieve in this course">
                      <HelpCircle size={12} className="text-indigo-400 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50 dark:bg-indigo-900/50" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Number(e.target.value))}
                    className="w-full text-3xl md:text-5xl font-black bg-white dark:bg-indigo-950 p-8 md:p-10 rounded-[24px] md:rounded-[32px] border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/50 transition-all outline-none text-indigo-950 dark:text-white shadow-xl shadow-indigo-900/5 dark:shadow-none"
                   />
                   <span className="absolute right-8 md:right-10 top-1/2 -translate-y-1/2 text-2xl md:text-4xl font-black text-indigo-200 dark:text-indigo-700">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors">
                   Final Exam Weight (%)
                   <Tooltip content="The percentage of your total grade that the final exam represents">
                      <HelpCircle size={12} className="text-indigo-400 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50 dark:bg-indigo-900/50" />
                </label>
                <div className="flex items-center gap-6 p-6 bg-indigo-50/50 dark:bg-indigo-950/50 rounded-3xl border border-indigo-100/50 dark:border-indigo-800/50 transition-colors">
                  <input 
                    type="range"
                    min="1"
                    max="100"
                    value={finalWeight}
                    onChange={(e) => setFinalWeight(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 h-3 bg-white dark:bg-indigo-900 rounded-full appearance-none cursor-pointer border border-indigo-200 dark:border-indigo-800 transition-colors"
                  />
                  <div className="w-28 text-center p-4 bg-indigo-600 rounded-2xl font-black text-white text-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                    {finalWeight}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Block */}
          <div className="flex flex-col gap-8">
            <div className="bg-white dark:bg-indigo-900/20 rounded-[40px] p-12 text-center flex flex-col justify-center items-center flex-1 border-2 border-indigo-50 dark:border-indigo-800/50 shadow-2xl shadow-indigo-950/5 dark:shadow-none relative overflow-hidden transition-colors backdrop-blur-md">
               <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
               <div className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400 mb-6 font-mono">Required Score on Final</div>
               <motion.div 
                key={requiredOnFinal}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn("text-8xl md:text-9xl font-black tracking-tighter mb-4", urgency.color)}
               >
                 {requiredOnFinal > 200 ? '200+' : formatNum(Math.max(0, requiredOnFinal))}
                 <span className="text-4xl text-indigo-200 dark:text-indigo-900 ml-1">%</span>
               </motion.div>
               <div className={cn("px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg transition-colors", urgency.bg, urgency.color)}>
                  {urgency.label}
               </div>

               <div className="mt-12 flex gap-4 w-full">
                  <div className="flex-1 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl text-left border border-indigo-50 dark:border-indigo-800/50 transition-colors">
                     <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-black mb-1">Current Value</div>
                     <div className="font-black text-indigo-950 dark:text-white transition-colors">{(currentGrade * (1 - finalWeight/100)).toFixed(1)} Pts</div>
                  </div>
                  <div className="flex-1 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl text-left border border-indigo-50 dark:border-indigo-800/50 transition-colors">
                     <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-black mb-1">Needed Gap</div>
                     <div className="font-black text-indigo-950 dark:text-white transition-colors">{(targetGrade - (currentGrade * (1 - finalWeight/100))).toFixed(1)} Pts</div>
                  </div>
               </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/40 rounded-[40px] p-8 border border-indigo-100/50 dark:border-indigo-800/50 transition-colors backdrop-blur-sm">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-sm">
                    {requiredOnFinal > 100 ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-indigo-900 dark:text-white mb-2 tracking-tight">Strategy Guide</h4>
                    <p className="text-indigo-800/70 dark:text-indigo-100/60 leading-relaxed text-sm font-bold font-sans">
                      {requiredOnFinal > 100 
                        ? `Ouch! To reach ${targetGrade}%, you need more than 100% on your final. Consider talking to your teacher about extra credit or checking if your target is too high.`
                        : requiredOnFinal < 50 
                        ? `Great news! You only need a ${formatNum(requiredOnFinal)}% to hit your target. Focus on other subjects while keeping a pace here.`
                        : `A score of ${formatNum(requiredOnFinal)}% is well within reach. Stay focused on high-yield topics and take a few practice exams.`}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* SEO Text Content */}
        <div className="mt-20 prose dark:prose-invert max-w-4xl mx-auto border-t border-indigo-100 dark:border-indigo-900/50 pt-16 transition-colors">
           <h2 className="text-3xl font-black tracking-tight mb-8 text-indigo-950 dark:text-white">Understanding the Final Grade Formula</h2>
           <p className="text-lg text-indigo-800 dark:text-indigo-400 leading-relaxed font-black font-sans bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border-l-4 border-indigo-600">"What do I need to get on my final to pass?"</p>
           <p className="text-indigo-800/60 dark:text-indigo-100/60 leading-relaxed mt-6 font-bold font-sans">
              It's the most common question during finals week. The math behind it is simple, but in the heat of studying, nobody wants to do algebra. Here is the formula we use for this calculator:
           </p>
           <div className="my-10 p-10 bg-indigo-50/50 dark:bg-indigo-900/30 rounded-3xl font-mono text-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-black shadow-inner transition-colors">
              Required = [Target - Current × (1 - Final Weight)] / Final Weight
           </div>
           
           <h3 className="text-2xl font-black mt-16 mb-8 text-indigo-950 dark:text-white underline decoration-indigo-200 dark:decoration-indigo-800 underline-offset-8">Final Exam Season FAQ</h3>
           <div className="space-y-6">
             {faqsData.map((faq, i) => (
               <div key={i} className="p-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800 transition-colors">
                 <h4 className="font-black text-indigo-950 dark:text-white mb-3 tracking-tight">{faq.q}</h4>
                 <p className="text-sm text-indigo-950/80 dark:text-indigo-100/70 font-bold leading-relaxed font-sans">{faq.a}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>

  );
};

export default FinalGradePage;
