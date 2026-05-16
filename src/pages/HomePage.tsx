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
      description: 'The standard US weighted grade tool for high school and college courses.',
      path: '/grade-calculator',
      icon: Calculator,
      color: 'bg-blue-500',
    },
    {
      name: 'GPA Calculator',
      description: 'Plan your 4.0 target with our semester and cumulative GPA estimator.',
      path: '/gpa-calculator',
      icon: GraduationCap,
      color: 'bg-cyan-500',
    },
    {
      name: 'Final Grade Predictor',
      description: 'Eliminate finals week stress by calculating the exact score you need to pass.',
      path: '/final-grade-predictor',
      icon: Target,
      color: 'bg-orange-500',
    },
    {
      name: 'Percentage Calculator',
      description: 'Quickly find test score percentages like 18 out of 25 with a single click.',
      path: '/percentage-calculator',
      icon: Percent,
      color: 'bg-purple-500',
    },
    {
      name: 'AP GOV Score Predictor',
      description: 'Project your official 2025 AP Government exam score (1-5 scale) instantly.',
      path: '/ap-gov-calculator',
      icon: Target,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Calculatorofgrade | #1 Free Grading Calculator & GPA Tool Online"
        description="The ultimate calculatorofgrade for students & teachers. Use our professional grading calculator online for precise class grades and GPA tracking."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculator of Grades - Grading Calculator & CGPA Tool",
          "url": "https://calculatorofgrades.vercel.app",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Professional academic suite featuring a gradebook calculator, calculator of cgpa, and final grade predictor. The best calculator for grades online.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-20 md:pb-32 px-4 bg-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-indigo-500/10 blur-[100px] md:blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-violet-500/5 blur-[100px] md:blur-[120px] rounded-full -translate-x-1/4 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50/50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8 shadow-sm border border-indigo-100/50">
              <Star size={14} className="fill-current" />
              Trusted by 100k+ students
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-indigo-950 mb-6 md:mb-8 leading-[0.9] transition-all">
              Top-Rated<br />
              <span className="text-indigo-600">Calculator of CGPA.</span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-indigo-950/80 mb-8 md:mb-12 leading-relaxed font-bold">
              The world's most trusted <strong>calculatorofgrade</strong> suite. Calculate grades, GPA, and exam strategies with surgical precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/grade-calculator"
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-800 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all border border-indigo-100 active:scale-95">
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
            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-indigo-900/5 border border-indigo-100/50 relative z-10">
               <div className="flex justify-between items-center mb-10">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <TrendingUp size={28} />
                  </div>
                  <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap">ACADEMIC STATUS</div>
               </div>
               <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-32 bg-indigo-100/50 rounded-full overflow-hidden border border-indigo-100">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        className="h-full bg-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.3)]" 
                       />
                    </div>
                    <span className="text-xs font-black text-indigo-400">85% COMPLETE</span>
                  </div>
                  <div className="h-32 w-full bg-indigo-50/50 rounded-3xl border border-indigo-100/50 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Target Grade</span>
                    <span className="text-5xl font-black text-indigo-600 tracking-tighter">A+ (4.0)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 bg-indigo-50/30 rounded-2xl border border-indigo-100/50" />
                    <div className="h-14 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20" />
                    <div className="h-14 bg-indigo-50/30 rounded-2xl border border-indigo-100/50" />
                  </div>
               </div>
            </div>
            {/* Floating Trust Badge */}
            <div className="bg-indigo-950 text-white p-8 rounded-[40px] shadow-2xl z-20 max-w-[220px] border-4 border-white transform rotate-3">
               <p className="text-sm font-bold italic opacity-90 leading-tight">"Revolutionized how I track my GPA."</p>
               <p className="mt-3 text-[10px] font-black uppercase tracking-widest opacity-60">— Alex M., Stanford</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-indigo-50 pb-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 md:mb-6 tracking-tighter">Tool <span className="text-indigo-600">Engine.</span></h2>
              <p className="text-indigo-400 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">Surgical precision for every academic scenario.</p>
            </div>
            <Link to="/grade-calculator" className="px-6 py-3 rounded-2xl font-bold tracking-tight bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-all text-xs uppercase tracking-widest flex items-center gap-3 active:scale-95">
              Browse Directory <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group flex flex-col p-10 bg-white rounded-[40px] border-2 border-indigo-50 hover:border-indigo-600/30 shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all h-full relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <tool.icon size={80} />
                   </div>
                   <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-10 shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative z-10", 
                    idx === 0 ? "bg-indigo-600" : idx === 1 ? "bg-indigo-500" : idx === 2 ? "bg-violet-600" : idx === 3 ? "bg-fuchsia-600" : "bg-emerald-600"
                  )}>
                    <tool.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-indigo-950 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors capitalize relative z-10">
                    {tool.name}
                  </h3>
                  <p className="text-indigo-900/80 mb-10 leading-relaxed font-bold text-sm relative z-10">
                    {tool.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-indigo-600 transition-colors">Start Tool</span>
                    <ArrowRight size={16} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Percentage Search Section */}
      <section className="py-24 px-4 bg-indigo-50/10 border-y border-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tighter">Instant <span className="text-indigo-600">Calculator of CGPA.</span></h2>
            <p className="text-indigo-900/60 font-bold max-w-2xl mx-auto">Convert CGPA to percentage instantly. Our <strong>calculate cgpa formula</strong> helps you find precise conversions for CBSE and Engineering.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { score: "9.5 CGPA", pct: "90.25%", term: "9.5 to percentage" },
              { score: "9.0 CGPA", pct: "85.5%", term: "9 cgpa in percentage" },
              { score: "8.5 CGPA", pct: "80.75%", term: "8.5 cgpa to percentage" },
              { score: "8.2 CGPA", pct: "77.9%", term: "8.2cgpa in percentage" },
              { score: "8.0 CGPA", pct: "76.0%", term: "8 cgpa in percentage" },
              { score: "7.0 CGPA", pct: "66.5%", term: "7 cgpa to percentage" },
              { score: "6.0 CGPA", pct: "57.0%", term: "6 cgpa in percentage" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-indigo-100 shadow-sm text-center transition-transform hover:scale-105">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{item.score}</div>
                <div className="text-2xl font-black text-indigo-600 mb-1">{item.pct}</div>
                <div className="text-[10px] font-bold text-indigo-900/60">{item.term}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/gpa-calculator" className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center justify-center gap-2">
              Use Full Calculator CGPA to Percentage <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-32 px-4 bg-indigo-50/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-indigo-950 mb-10 leading-[1.1] tracking-tighter">
              The Professional <br />
              <span className="text-indigo-600 font-black">Calculator of CGPA.</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { title: 'Multi-Region Support', desc: 'Pre-configured for US 4.0, Indian CBSE, and Global percentage systems.', icon: GraduationCap },
                { title: 'Neural Real-time Engine', desc: 'Predictive analytics that update instantly as you adjust your scores.', icon: TrendingUp },
                { title: 'Secure Data Handling', desc: 'All calculations happen on your device. Privacy is our top priority.', icon: CheckCircle2 },
                { title: 'Expert Documentation', desc: 'Generate professional reports and study plans in one click.', icon: FileText },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm transition-transform group-hover:scale-110">
                    <feature.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-indigo-950 mb-1 tracking-tight text-lg">{feature.title}</h4>
                    <p className="text-sm text-indigo-900 mb-0 leading-relaxed font-bold">{feature.desc}</p>
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
             <div className="col-span-2 p-12 bg-indigo-600 rounded-[48px] text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                <Users size={48} className="mb-8 text-white/50 transform group-hover:scale-110 transition-transform" />
                <div className="text-6xl font-black mb-2 tracking-tighter">100k+</div>
                <div className="text-indigo-100 font-bold uppercase text-[10px] tracking-[0.3em] opacity-80">Connected Students</div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full" />
             </div>
             <div className="p-10 bg-indigo-950 rounded-[40px] text-white border-b-indigo-500 border-b-4">
                <Clock size={32} className="mb-6 text-indigo-400" />
                <div className="text-4xl font-black mb-1 tracking-tight">1.2ms</div>
                <div className="text-indigo-300 text-[10px] font-black uppercase tracking-widest">Compute Speed</div>
             </div>
             <div className="p-10 bg-white border border-indigo-100 rounded-[40px] shadow-sm">
                <Star size={32} className="mb-6 text-indigo-500 fill-current" />
                <div className="text-4xl font-black mb-1 text-indigo-950 tracking-tight">4.9/5</div>
                <div className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Global Rating</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 md:py-32 px-4 bg-white border-t border-indigo-50">
        <div className="max-w-4xl mx-auto prose prose-indigo">
          <h2 className="text-4xl font-black text-indigo-950 mb-10 tracking-tight text-center">The Professional Choice for Calculatorofgrade Online</h2>
          <div className="space-y-10 font-bold text-indigo-900/70 leading-relaxed">
            <p className="text-lg">
              Calculatorofgrade (and CalculatorOfGrades.com) is the web's leading <strong>gradebook calculator online</strong> for students seeking performance tracking. Our suite of tools helps you navigate modern grading systems with our <strong>calculator of cgpa</strong> and grading engine.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose mt-16">
               <div className="p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100">
                  <h3 className="text-xl font-black text-indigo-950 mb-4">Leading My Grades Calculator</h3>
                  <p className="text-sm">We provide an intuitive <strong>grading cal</strong> environment used by registrar offices at top universities. Whether you need a <strong>calculator for grading</strong> or a complex 8-semester CGPA tracker, our engine handles it with surgical accuracy.</p>
               </div>
               <div className="p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100">
                  <h3 className="text-xl font-black text-indigo-950 mb-4">Grading Percentage Calculator Online</h3>
                  <p className="text-sm">Need to know what <strong>16 out of 20 percentage</strong> is? Our <strong>percentage grades calculator</strong> handles every scoring scenario, providing instant feedback for teachers and students alike.</p>
               </div>
            </div>

            <h3 className="text-2xl font-black text-indigo-950 mt-16">Why Students Choose Our Online Gradebook Calculator?</h3>
            <p>
              In today's competitive academic landscape, every point counts. Using a <strong>grading calculator percentage</strong> tool allows you to identify which subjects need more focus before finals week. Our <strong>calculator for grades</strong> is designed to be the only <strong>gradebook calculator</strong> you'll ever need.
            </p>
            
            <ul className="space-y-4 text-sm mt-8">
              <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> <strong>Grading Calculator Free:</strong> No hidden costs or subscriptions for basic tracking.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> <strong>Instant Marking Calculator Reports:</strong> Download your grade sheets for sharing or archiving.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="text-indigo-600" size={18} /> <strong>Privacy First Online Gradebook:</strong> Your data never leaves your browser.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Footer Content */}
      <section className="py-24 px-4 bg-indigo-950 text-indigo-100/60 text-xs border-t border-indigo-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-6">Popular Grading Tools</h4>
            <ul className="space-y-2">
              {[
                { name: "Calculator for Grading", path: "/grade-calculator" },
                { name: "Grading Calculator Online", path: "/grade-calculator" },
                { name: "Calculator of CGPA", path: "/gpa-calculator" },
                { name: "AP GOV Score Calculator 2025", path: "/ap-gov-calculator" },
                { name: "Albert AP Gov Score Calculator", path: "/ap-gov-calculator" },
                { name: "AP Gov Score Calculator 2024", path: "/ap-gov-calculator" },
                { name: "Knowt AP Gov Score Calculator", path: "/ap-gov-calculator" },
                { name: "CGPA Calculator Online", path: "/gpa-calculator" },
                { name: "KTU CGPA Calculator", path: "/gpa-calculator" },
                { name: "SPPU CGPA Calculator", path: "/gpa-calculator" }
              ].map((link, j) => (
                <li key={j}>
                  <Link to={link.path} className="hover:text-indigo-400 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-6">CGPA to Percentage</h4>
            <ul className="space-y-2">
              {[
                "8 cgpa in percentage",
                "8.2cgpa in percentage",
                "Albert IO AP Gov Score Calculator",
                "Fiveable AP Gov Score Calculator",
                "9 cgpa in percentage",
                "AP Gov Score Calculator Albert",
                "what is 9.8 cgpa in percentage",
                "AP Gov Score Calculator 2021",
                "AP Gov Score Calculator 2019",
                "AP Gov Score Calculator 2020",
                "AP Gov Score Calculator 2023",
                "4 cgpa to percentage"
              ].map((term, j) => (
                <li key={j}>
                  <Link to="/gpa-calculator" className="hover:text-indigo-400 transition-colors uppercase tracking-tight">{term}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-white uppercase tracking-widest text-sm mb-6">Conversions & Formulas</h4>
            <ul className="space-y-2">
              {[
                "Calculate CGPA Formula",
                "Calculate CGPA from Marks",
                "Calculate CGPA CBSE",
                "84 percent in cgpa",
                "69 to cgpa",
                "84 to cgpa",
                "CGPA Calculator out of 4",
                "Calculate CGPA for Engineering",
                "Calculate overall CGPA all semesters"
              ].map((term, j) => (
                <li key={j} className="hover:text-indigo-400 cursor-default uppercase tracking-tight">{term}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-indigo-900/30 rounded-3xl border border-indigo-800/50">
              <h4 className="font-black text-white uppercase tracking-widest text-xs mb-3">About Calculatorofgrade</h4>
              <p className="leading-relaxed opacity-80">
                Calculatorofgrade is the web's premier destination for academic score tracking. Our algorithms follow standard pedagogical weighted averaging protocols ensuring 100% accuracy for all <strong>grades calculator</strong> needs.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-indigo-900/50 flex items-center justify-center font-black text-white text-xs">A+</div>
               <div className="w-10 h-10 rounded-xl bg-indigo-900/50 flex items-center justify-center font-black text-white text-xs">10.0</div>
               <div className="w-10 h-10 rounded-xl bg-indigo-900/50 flex items-center justify-center font-black text-white text-xs">100%</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto rounded-[60px] bg-indigo-950 p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight">Master Your Metrics.</h2>
            <p className="text-indigo-300 max-w-2xl mx-auto mb-12 text-xl font-semibold leading-relaxed">Join the next generation of academic high-performers. Precision grade tracking starts here.</p>
            <Link to="/grade-calculator" className="inline-flex items-center gap-3 px-14 py-6 bg-indigo-600 text-white rounded-[24px] font-black text-xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95">
              Launch Suite <ArrowRight size={24} />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[80px] translate-y-1/2 -translate-x-1/2 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
