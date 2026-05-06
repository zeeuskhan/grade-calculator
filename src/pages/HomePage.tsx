import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, GraduationCap, Target, Percent, Star, CheckCircle2, TrendingUp, Users, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { cn } from '../lib/utils';

const HomePage = () => {
  const tools = [
    {
      name: 'Grade Calculator',
      description: 'Quickly calculate your weighted or simple grades with charts.',
      path: '/grade-calculator',
      icon: Calculator,
      color: 'bg-blue-500',
    },
    {
      name: 'GPA Calculator',
      description: 'Calculate your semester or cumulative GPA across US/Indian scales.',
      path: '/gpa-calculator',
      icon: GraduationCap,
      color: 'bg-cyan-500',
    },
    {
      name: 'Final Grade Predictor',
      description: 'Find out exactly what you need on your final exam to pass or get an A.',
      path: '/final-grade-predictor',
      icon: Target,
      color: 'bg-orange-500',
    },
    {
      name: 'Percentage Calculator',
      description: 'Convert marks to percentages and vice-versa instantly.',
      path: '/percentage-calculator',
      icon: Percent,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="CalculatorOfGrades - The Best Free Grade & GPA Calculator for Students"
        description="Calculate your grades, GPA, and final exam targets with ease. Supports US 4.0 and Indian CBSE/University scales. Free, fast, and precise tool for students."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CalculatorOfGrades",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Advanced academic grade and GPA calculation suite."
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 bg-white dark:bg-[#0f172a]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#1e2937] text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-slate-100 dark:border-slate-800">
              <Star size={14} className="fill-current" />
              Trusted by 100k+ students
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9] transition-all">
              Academic <br />
              <span className="text-cyan-500 dark:text-cyan-400">Engineering.</span>
            </h1>
            
            <p className="max-w-xl text-xl text-slate-600 dark:text-slate-200 mb-12 leading-relaxed font-semibold">
              The world's most precise academic calculator suite. Calculate grades, GPA, and exam strategies with expert accuracy.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/grade-calculator"
                className="w-full sm:w-auto px-10 py-5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-2xl font-black text-lg shadow-xl shadow-cyan-500/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-[#1e2937] text-slate-800 dark:text-white rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 active:scale-95">
                Install App
              </button>
            </div>
          </motion.div>

          {/* Stats / Visual Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white dark:bg-[#1e2937] p-10 rounded-[40px] shadow-2xl shadow-cyan-900/5 border border-slate-100 dark:border-slate-800 relative z-10">
               <div className="flex justify-between items-center mb-10">
                  <div className="w-14 h-14 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800">
                    <TrendingUp size={28} />
                  </div>
                  <div className="px-4 py-2 bg-cyan-50 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap">ACADEMIC STATUS</div>
               </div>
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-cyan-500" 
                       />
                    </div>
                    <span className="text-xs font-black text-slate-400">85% COMPLETE</span>
                  </div>
                  <div className="h-32 w-full bg-slate-50 dark:bg-[#0f172a] rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Target Grade</span>
                    <span className="text-5xl font-black text-cyan-500 dark:text-cyan-400 tracking-tighter">A+ (4.0)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50" />
                    <div className="h-14 bg-cyan-500 rounded-2xl shadow-lg shadow-cyan-500/20" />
                    <div className="h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50" />
                  </div>
               </div>
            </div>
            {/* Floating Trust Badge */}
            <div className="bg-slate-900 dark:bg-cyan-700 text-white p-8 rounded-[40px] shadow-2xl z-20 max-w-[220px] border-4 border-white dark:border-slate-800 transform rotate-3">
               <p className="text-sm font-bold italic opacity-90 leading-tight">"Revolutionized how I track my GPA."</p>
               <p className="mt-3 text-[10px] font-black uppercase tracking-widest opacity-60">— Alex M., Stanford</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-32 px-4 bg-white dark:bg-[#0b0f1a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 dark:border-slate-800 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Tool <span className="text-cyan-600">Engine.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-black uppercase tracking-[0.2em]">Surgical precision for every academic scenario.</p>
            </div>
            <Link to="/grade-calculator" className="btn-structured bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
              Browse Directory <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <Link 
                  to={tool.path}
                  className="group flex flex-col p-10 bg-white dark:bg-[#111827] rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all h-full"
                >
                   <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-10 shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500", 
                    idx === 0 ? "bg-cyan-600" : idx === 1 ? "bg-cyan-700" : idx === 2 ? "bg-slate-900" : "bg-cyan-800"
                  )}>
                    <tool.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-cyan-600 transition-colors capitalize">
                    {tool.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-semibold text-sm">
                    {tool.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-600 transition-colors">Start Tool</span>
                    <ArrowRight size={16} className="text-cyan-600 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-32 px-4 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-10 leading-[1.1] tracking-tighter">
              World Class <br />
              <span className="text-cyan-600 dark:text-cyan-400 font-black">Infrastructure.</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { title: 'Multi-Region Support', desc: 'Pre-configured for US 4.0, Indian CBSE, and Global percentage systems.', icon: GraduationCap },
                { title: 'Neural Real-time Engine', desc: 'Predictive analytics that update instantly as you adjust your scores.', icon: TrendingUp },
                { title: 'Secure Data Handling', desc: 'All calculations happen on your device. Privacy is our top priority.', icon: CheckCircle2 },
                { title: 'Expert Documentation', desc: 'Generate professional reports and study plans in one click.', icon: FileText },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-110">
                    <feature.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white mb-1 tracking-tight text-lg">{feature.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="grid grid-cols-2 gap-6"
          >
             <div className="col-span-2 p-12 bg-cyan-600 rounded-[48px] text-white shadow-2xl shadow-cyan-500/20 relative overflow-hidden group">
                <Users size={48} className="mb-8 text-white/50 transform group-hover:scale-110 transition-transform" />
                <div className="text-6xl font-black mb-2 tracking-tighter">100k+</div>
                <div className="text-cyan-100 font-bold uppercase text-[10px] tracking-[0.3em] opacity-80">Connected Students</div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full" />
             </div>
             <div className="p-10 bg-slate-900 rounded-[40px] text-white border border-slate-800 border-b-cyan-500 border-b-4">
                <Clock size={32} className="mb-6 text-cyan-400" />
                <div className="text-4xl font-black mb-1 tracking-tight">1.2ms</div>
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Compute Speed</div>
             </div>
             <div className="p-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[40px] shadow-sm">
                <Star size={32} className="mb-6 text-cyan-500 fill-current" />
                <div className="text-4xl font-black mb-1 text-slate-900 dark:text-white tracking-tight">4.9/5</div>
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global Rating</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto rounded-[60px] bg-[#0b0f1a] p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight">Master Your Metrics.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-xl font-semibold leading-relaxed">Join the next generation of academic high-performers. Precision grade tracking starts here.</p>
            <Link to="/grade-calculator" className="inline-flex items-center gap-3 px-14 py-6 bg-cyan-600 text-slate-950 rounded-[24px] font-black text-xl hover:bg-cyan-500 hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
              Launch Suite <ArrowRight size={24} />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/5 blur-[80px] translate-y-1/2 -translate-x-1/2 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
