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
    if (requiredOnFinal > 100) return { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/10', label: 'Impossible?' };
    if (requiredOnFinal > 90) return { color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10', label: 'High Effort' };
    return { color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/10', label: 'Achievable' };
  };

  const urgency = getUrgency();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <SEO 
        title="Final Grade Predictor - What score do I need on my final?"
        description="Find out exactly what you need on your final exam to reach your target course grade. Easy and accurate final grade calculator."
      />

      {/* Hero Header */}
      <div className="bg-[#0f172a] py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 -z-0">
           <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-cyan-600 rounded-[24px] flex items-center justify-center text-slate-950 mx-auto mb-8 shadow-2xl shadow-cyan-500/20"
           >
             <Target size={40} />
           </motion.div>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Final Grade <span className="text-cyan-500">Target.</span></h1>
           <p className="text-slate-400 text-xl font-medium">Precision calculation for your most critical exams.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <div className="space-y-8">
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   Current Class Grade (%)
                   <Tooltip content="Your current overall grade in the class before the final exam">
                      <HelpCircle size={12} className="text-slate-300 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(Number(e.target.value))}
                    className="w-full text-4xl font-black bg-slate-50 dark:bg-[#1e2937] p-8 rounded-[32px] border-2 border-slate-100 dark:border-slate-800 focus:border-cyan-500 focus:bg-white dark:focus:bg-[#0f172a] transition-all outline-none"
                   />
                   <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   Target Overall Grade (%)
                   <Tooltip content="The final grade you want to achieve in this course">
                      <HelpCircle size={12} className="text-slate-300 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />
                </label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(Number(e.target.value))}
                    className="w-full text-4xl font-black bg-slate-50 dark:bg-[#1e2937] p-8 rounded-[32px] border-2 border-slate-100 dark:border-slate-800 focus:border-cyan-500 focus:bg-white dark:focus:bg-[#0f172a] transition-all outline-none"
                   />
                   <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   Final Exam Weight (%)
                   <Tooltip content="The percentage of your total grade that the final exam represents">
                      <HelpCircle size={12} className="text-slate-300 cursor-help" />
                   </Tooltip>
                   <div className="h-0.5 flex-1 bg-slate-100 dark:bg-slate-800" />
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="1"
                    max="100"
                    value={finalWeight}
                    onChange={(e) => setFinalWeight(Number(e.target.value))}
                    className="flex-1 accent-cyan-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-full"
                  />
                  <div className="w-24 text-center p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl font-black text-cyan-600 text-xl border border-cyan-100 dark:border-cyan-800">
                    {finalWeight}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Block */}
          <div className="flex flex-col gap-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[40px] p-12 text-center flex flex-col justify-center items-center flex-1 border border-slate-200 dark:border-slate-800">
               <div className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-6">Required Score on Final</div>
               <motion.div 
                key={requiredOnFinal}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn("text-8xl md:text-9xl font-black tracking-tighter mb-4", urgency.color)}
               >
                 {requiredOnFinal > 200 ? '200+' : formatNum(Math.max(0, requiredOnFinal))}
                 <span className="text-4xl text-slate-300 ml-1">%</span>
               </motion.div>
               <div className={cn("px-6 py-2 rounded-2xl font-bold text-sm uppercase tracking-widest", urgency.bg, urgency.color)}>
                  {urgency.label}
               </div>

               <div className="mt-12 flex gap-4 w-full">
                  <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl text-left border border-slate-100 dark:border-slate-700">
                     <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Current Value</div>
                     <div className="font-black text-slate-900 dark:text-white">{(currentGrade * (1 - finalWeight/100)).toFixed(1)} Pts</div>
                  </div>
                  <div className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-2xl text-left border border-slate-100 dark:border-slate-700">
                     <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Needed Gap</div>
                     <div className="font-black text-slate-900 dark:text-white">{(targetGrade - (currentGrade * (1 - finalWeight/100))).toFixed(1)} Pts</div>
                  </div>
               </div>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-[40px] p-8 border border-cyan-100 dark:border-cyan-900/50">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 rounded-2xl shadow-sm">
                    {requiredOnFinal > 100 ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-cyan-400 mb-2">Strategy Guide</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
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
        <div className="mt-20 prose dark:prose-invert max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-16">
           <h2 className="text-3xl font-black tracking-tight mb-8">Understanding the Final Grade Formula</h2>
           <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">"What do I need to get on my final to pass?"</p>
           <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
             It's the most common question during finals week. The math behind it is simple, but in the heat of studying, nobody wants to do algebra. Here is the formula we use for this calculator:
           </p>
           <div className="my-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl font-mono text-center text-cyan-600 border border-cyan-500/10">
              Required = [Target - Current × (1 - Final Weight)] / Final Weight
           </div>
           
           <h3 className="text-2xl font-bold mt-12 mb-4">Final Grade FAQ</h3>
           <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Can I get more than 100%?</h4>
                <p className="text-sm text-slate-500">Only if your teacher offers extra credit on the final exam. Otherwise, if our calculator says you need 105%, you might need to adjust your target grade.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Is this accurate for weighted grades?</h4>
                <p className="text-sm text-slate-500">Yes! This calculator assumes your final exam is a standalone weighted category. If your final counts as part of a larger 'Exams' category, the math is slightly different but this tool provides a very close estimation.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinalGradePage;
