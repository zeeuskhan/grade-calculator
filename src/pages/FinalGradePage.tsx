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
    if (requiredOnFinal > 100) return { color: 'text-red-500', bg: 'bg-red-50', label: 'Impossible?' };
    if (requiredOnFinal > 90) return { color: 'text-orange-500', bg: 'bg-orange-50', label: 'High Effort' };
    return { color: 'text-indigo-600', bg: 'bg-indigo-50', label: 'Achievable' };
  };

  const urgency = getUrgency();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Precision Final Grade Calculator & Predictor",
    "url": "https://calculatorofgrades.vercel.app/final-grade-predictor",
    "description": "Calculate exactly what score you need on your final exam to achieve your target grade. Uses professional academic formulas for weighted and unweighted classes.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 pb-20">
      <SEO 
        title="Final Grade Calculator - What Score Do I Need on My Final?"
        description="Calculate the score you need on your final exam. Our final grade predictor helps you reach your target grade easily and accurately with real math."
        schema={schemaData}
      />

      {/* Hero Header */}
      <div className="bg-indigo-950 py-16 md:py-24 px-4 overflow-hidden relative">
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
           <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">Final Grade <span className="text-indigo-400">Target.</span></h1>
           <p className="text-indigo-100/80 text-lg md:text-xl font-black">Precision calculation for your most critical exams.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 md:-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Inputs */}
          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-2xl shadow-indigo-900/5 border border-indigo-50">
            <div className="space-y-6 md:space-y-8">
              <div className="group">
                <label className="block text-[10px] md:text-xs font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                   Current Class Grade (%)
                   <Tooltip content="Your current overall grade in the class before the final exam">
                      <HelpCircle size={12} className="text-indigo-400 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(Number(e.target.value))}
                    className="w-full text-3xl md:text-4xl font-black bg-indigo-50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none text-indigo-950 shadow-sm"
                   />
                   <span className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-black text-indigo-300">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] md:text-xs font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2 text-wrap">
                   Target Overall Grade (%)
                   <Tooltip content="The final grade you want to achieve in this course">
                      <HelpCircle size={12} className="text-indigo-400 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Number(e.target.value))}
                    className="w-full text-3xl md:text-4xl font-black bg-indigo-50 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none text-indigo-950 shadow-sm"
                   />
                   <span className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-black text-indigo-300">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   Final Exam Weight (%)
                   <Tooltip content="The percentage of your total grade that the final exam represents">
                      <HelpCircle size={12} className="text-indigo-200 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-indigo-50" />
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="1"
                    max="100"
                    value={finalWeight}
                    onChange={(e) => setFinalWeight(Number(e.target.value))}
                    className="flex-1 accent-indigo-600 h-2 bg-indigo-100 rounded-full"
                  />
                  <div className="w-24 text-center p-4 bg-indigo-50 rounded-2xl font-black text-indigo-600 text-xl border border-indigo-100">
                    {finalWeight}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Block */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-[40px] p-12 text-center flex flex-col justify-center items-center flex-1 border border-indigo-50 shadow-sm">
               <div className="text-xs font-black uppercase tracking-[0.25em] text-indigo-300 mb-6">Required Score on Final</div>
               <motion.div 
                key={requiredOnFinal}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn("text-8xl md:text-9xl font-black tracking-tighter mb-4", urgency.color)}
               >
                 {requiredOnFinal > 200 ? '200+' : formatNum(Math.max(0, requiredOnFinal))}
                 <span className="text-4xl text-indigo-200 ml-1">%</span>
               </motion.div>
               <div className={cn("px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest", urgency.bg, urgency.color)}>
                  {urgency.label}
               </div>

               <div className="mt-12 flex gap-4 w-full">
                  <div className="flex-1 p-4 bg-indigo-50/50 rounded-2xl text-left border border-indigo-50">
                     <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-black mb-1">Current Value</div>
                     <div className="font-black text-indigo-950">{(currentGrade * (1 - finalWeight/100)).toFixed(1)} Pts</div>
                  </div>
                  <div className="flex-1 p-4 bg-indigo-50/50 rounded-2xl text-left border border-indigo-50">
                     <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-black mb-1">Needed Gap</div>
                     <div className="font-black text-indigo-950">{(targetGrade - (currentGrade * (1 - finalWeight/100))).toFixed(1)} Pts</div>
                  </div>
               </div>
            </div>

            <div className="bg-indigo-50 rounded-[40px] p-8 border border-indigo-100/50">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm">
                    {requiredOnFinal > 100 ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-indigo-900 mb-2">Strategy Guide</h4>
                    <p className="text-indigo-800/70 leading-relaxed text-sm font-semibold">
                      {requiredOnFinal > 100 
                        ? `Ouch! To reach ${targetGrade}%, you need more than 100% on your final. Consider talking to your teacher about extra credit or checking if your target is too high.`
                        : requiredOnFinal < 50 
                        ? `Great news! You only need a ${formatNum(requiredOnFinal)}% to hit your target. Focus on other subjects while keeping a steady pace here.`
                        : `A score of ${formatNum(requiredOnFinal)}% is well within reach. Stay focused on high-yield topics and take a few practice exams.`}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* SEO Text Content */}
        <div className="mt-20 prose max-w-4xl mx-auto border-t border-indigo-100 pt-16">
           <h2 className="text-3xl font-black tracking-tight mb-8 text-indigo-950">Understanding the Final Grade Formula</h2>
           <p className="text-lg text-indigo-800/70 leading-relaxed font-bold italic">"What do I need to get on my final to pass?"</p>
           <p className="text-indigo-800/60 leading-relaxed mt-4 font-semibold">
             It's the most common question during finals week. The math behind it is simple, but in the heat of studying, nobody wants to do algebra. Here is the formula we use for this calculator:
           </p>
           <div className="my-8 p-8 bg-indigo-50/50 rounded-3xl font-mono text-center text-indigo-600 border border-indigo-200 font-black">
              Required = [Target - Current × (1 - Final Weight)] / Final Weight
           </div>
           
           <h3 className="text-2xl font-black mt-12 mb-4 text-indigo-950">Final Grade FAQ</h3>
           <div className="space-y-6">
                     <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <h4 className="font-black text-indigo-950 mb-2">Can I get more than 100%?</h4>
                <p className="text-sm text-indigo-950/80 font-bold leading-relaxed">Only if your teacher offers extra credit on the final exam. Otherwise, if our calculator says you need 105%, you might need to adjust your target grade.</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <h4 className="font-black text-indigo-950 mb-2">Is this accurate for weighted grades?</h4>
                <p className="text-sm text-indigo-950/80 font-bold leading-relaxed">Yes! This calculator assumes your final exam is a standalone weighted category. If your final counts as part of a larger 'Exams' category, the math is slightly different but this tool provides a very close estimation.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinalGradePage;
