import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  HelpCircle, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Clock, 
  Percent, 
  ShieldAlert,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { SEO } from '../components/SEO';

export default function ApGovGuidePage() {
  const guideFaqs = [
    {
      q: "What is the exact exam weighting for AP US Government and Politics?",
      a: "The AP Gov exam is weighted 50% for the multiple-choice section (Section I) and 50% for the free-response section (Section II). Section I contains 55 questions to be answered in 80 minutes, while Section II contains 4 free-response questions (FRQs) to be completed in 100 minutes."
    },
    {
      q: "How are the free-response questions (FRQ) scored on the AP Gov exam?",
      a: "The AP Gov FRQ section has a total of 24 raw points. FRQ 1 (Concept Application) is worth 3 points, FRQ 2 (Quantitative Analysis) is worth 4 points, FRQ 3 (SCOTUS Comparison) is worth 4 points, and FRQ 4 (Argumentative Essay) is worth 6 points."
    },
    {
      q: "What is a passing score on the AP US Gov exam?",
      a: "A score of 3, 4, or 5 is considered passing and eligible for college credit or advanced placement at many US institutions. However, top-tier colleges often require a score of 4 or 5."
    },
    {
      q: "Are the score predictions and curves official?",
      a: "No, all score predictions, cutoffs, and curves displayed on this site are estimates based on historical exam distributions and College Board releases. The official College Board does not pre-publish exact conversion formulas for current exams."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guideFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://calculatorofgrades.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AP Gov Score Calculator",
        "item": "https://calculatorofgrades.vercel.app/ap-gov-calculator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AP Gov Exam Guide",
        "item": "https://calculatorofgrades.vercel.app/ap-gov-exam-guide"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-indigo-950 transition-colors duration-300 pb-20">
      <SEO 
        title="AP Gov Exam Guide (2026) | Curves, Weighting & Score Cutoffs"
        description="The ultimate guide to the 2026 AP US Government and Politics exam. Learn about exam weighting, score cutoffs, multiple-choice curves, and free-response rubrics."
        schema={[faqSchema, breadcrumbSchema]}
      />

      {/* Hero Header */}
      <div className="bg-indigo-950 py-16 md:py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-emerald-600 rounded-[32px] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-emerald-500/20 ring-4 ring-emerald-500/20"
          >
            <BookOpen size={40} className="stroke-[2.5]" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            AP Gov <span className="text-emerald-400">Exam Guide.</span>
          </h1>
          <p className="text-indigo-100/80 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            A comprehensive breakdown of the AP US Government and Politics exam curve, weighting patterns, and scoring cutoffs updated for 2026.
          </p>
          <p className="text-indigo-200/40 text-[10px] uppercase font-black tracking-widest mt-4">
            Independent Academic Resource — Keep Your Preparation On Track
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 md:mt-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/ap-gov-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AP Gov Calculator</Link>
          <ChevronRight size={12} />
          <span className="text-indigo-950 dark:text-white">Exam Guide</span>
        </div>

        {/* Disclaimer Card */}
        <div className="mb-12 p-6 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/30 rounded-3xl flex items-start gap-4">
          <ShieldAlert className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" size={24} />
          <div className="text-left">
            <h4 className="font-black text-amber-800 dark:text-amber-300 text-sm uppercase tracking-wider mb-1">Estimated Data Disclaimer</h4>
            <p className="text-xs text-indigo-950/80 dark:text-indigo-200/80 font-bold leading-relaxed">
              All score benchmarks, weighting algorithms, and grade curves shared in this resource are **ESTIMATES**. The College Board does not publish pre-calculated raw-to-composite maps for future exams, and score distributions shift slightly every year depending on global candidate performance.
            </p>
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16 text-left">
            {/* Section 1: Weighting */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tight flex items-center gap-3">
                <Percent className="text-emerald-500" size={28} />
                AP US Government & Politics Exam Weighting
              </h2>
              <p className="text-indigo-950/70 dark:text-indigo-100/70 font-medium leading-relaxed">
                The AP Gov exam structure evaluates conceptual mastery and analytical competencies. The global grade is computed from a meticulous 50/50 split of the exam score weighting across Section I (multiple-choice section) and Section II (free-response section).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="p-6 bg-white dark:bg-indigo-900/20 border border-indigo-50 dark:border-indigo-800 rounded-3xl">
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest block mb-2">Section I: 50%</span>
                  <h3 className="font-black text-indigo-950 dark:text-white text-xl mb-2">Multiple-Choice Section</h3>
                  <ul className="space-y-2 text-sm text-indigo-950/70 dark:text-indigo-100/70 font-semibold">
                    <li className="flex items-center gap-2">⏱️ 80 Minutes Limit</li>
                    <li className="flex items-center gap-2">📝 55 Total Questions</li>
                    <li className="flex items-center gap-2">🔍 Individual & Set-Based Questions</li>
                  </ul>
                </div>

                <div className="p-6 bg-white dark:bg-indigo-900/20 border border-indigo-50 dark:border-indigo-800 rounded-3xl">
                  <span className="text-xs font-black text-indigo-500 uppercase tracking-widest block mb-2">Section II: 50%</span>
                  <h3 className="font-black text-indigo-950 dark:text-white text-xl mb-2">Free-Response Section</h3>
                  <ul className="space-y-2 text-sm text-indigo-950/70 dark:text-indigo-100/70 font-semibold">
                    <li className="flex items-center gap-2">⏱️ 100 Minutes Limit</li>
                    <li className="flex items-center gap-2">✍️ 4 Free-Response Prompts</li>
                    <li className="flex items-center gap-2">🎯 24 Total Raw Points</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Score Cutoffs & Curves */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tight flex items-center gap-3">
                <TrendingUp className="text-indigo-500" size={28} />
                AP Gov Estimated Score Cutoffs
              </h2>
              <p className="text-indigo-950/70 dark:text-indigo-100/70 font-medium leading-relaxed">
                Raw scores from the multiple-choice section (out of 55) and the free-response section (out of 24) are combined using a standard formula:
              </p>
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-3xl font-mono text-xs text-indigo-950 dark:text-indigo-100 space-y-2 leading-relaxed">
                <p className="font-black text-sm text-indigo-600 dark:text-indigo-400 mb-2">Composite Score Formulation:</p>
                <p>MCQ Weighted Score = MCQ Correct * 0.909</p>
                <p>FRQ Weighted Score = FRQ Total Raw * 2.083</p>
                <p className="font-black mt-2 text-indigo-900 dark:text-indigo-300">Composite Score (out of 100) = MCQ Weighted + FRQ Weighted</p>
              </div>

              <div className="overflow-hidden border border-indigo-50 dark:border-indigo-800 rounded-3xl mt-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-900 text-white text-xs uppercase tracking-wider font-black">
                      <th className="p-4">AP Score</th>
                      <th className="p-4">Estimated Cutoff</th>
                      <th className="p-4">Academic Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-indigo-950/80 dark:text-indigo-100/80 font-semibold divide-y divide-indigo-50 dark:divide-indigo-900 bg-white dark:bg-transparent">
                    <tr className="hover:bg-indigo-50/20">
                      <td className="p-4 text-emerald-600 dark:text-emerald-400 font-black">5</td>
                      <td className="p-4">75 - 100 Points</td>
                      <td className="p-4">Extremely Well Qualified</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/20">
                      <td className="p-4 text-blue-600 dark:text-blue-400 font-black">4</td>
                      <td className="p-4">60 - 74 Points</td>
                      <td className="p-4">Well Qualified</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/20">
                      <td className="p-4 text-indigo-600 dark:text-indigo-400 font-black">3</td>
                      <td className="p-4">45 - 59 Points</td>
                      <td className="p-4">Qualified (Passing Grade)</td>
                    </tr>
                    <tr className="hover:bg-indigo-50/20">
                      <td className="p-4 text-slate-500 font-black">2</td>
                      <td className="p-4">30 - 44 Points</td>
                      <td className="p-4">Possibly Qualified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: FRQ Prompt Rubrics */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tight flex items-center gap-3">
                <BookOpen className="text-violet-500" size={28} />
                Section II Free-Response Structure
              </h2>
              <p className="text-indigo-950/70 dark:text-indigo-100/70 font-medium leading-relaxed">
                The free-response section is divided into 4 specific prompts, each testing unique political science methodologies:
              </p>

              <div className="space-y-4">
                {[
                  { title: "FRQ 1: Concept Application", pts: "3 Points", desc: "Apply political concepts in a real-world scenario." },
                  { title: "FRQ 2: Quantitative Analysis", pts: "4 Points", desc: "Analyze quantitative data, identify trends, and draw conclusions." },
                  { title: "FRQ 3: SCOTUS Comparison", pts: "4 Points", desc: "Compare a non-required Supreme Court case to one of the 15 required cases." },
                  { title: "FRQ 4: Argumentative Essay", pts: "6 Points", desc: "Write a complete argumentative essay with a thesis supported by evidence." }
                ].map((frq, idx) => (
                  <div key={idx} className="p-6 bg-white dark:bg-indigo-900/10 border border-indigo-50 dark:border-indigo-800 rounded-2xl flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-black text-indigo-950 dark:text-white text-base">{frq.title}</h4>
                      <p className="text-xs font-semibold text-indigo-900/60 dark:text-indigo-100/60 mt-1">{frq.desc}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-black text-xs rounded-full shrink-0 border border-indigo-100/50 dark:border-indigo-800">{frq.pts}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs Section */}
            <section className="space-y-6 pt-6 border-t border-indigo-50 dark:border-indigo-900">
              <h2 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tight flex items-center gap-3">
                <HelpCircle className="text-emerald-500" size={28} />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {guideFaqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-indigo-50/30 dark:bg-indigo-900/20 border border-indigo-100/50 dark:border-indigo-850 rounded-2xl">
                    <h4 className="font-black text-indigo-950 dark:text-white text-base mb-2">{faq.q}</h4>
                    <p className="text-sm font-semibold text-indigo-900/70 dark:text-indigo-100/70 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-[40px] p-8 border border-indigo-850 relative overflow-hidden shadow-xl shadow-indigo-950/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 text-left space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
                  <Calculator size={24} />
                </div>
                <h3 className="text-2xl font-black leading-tight tracking-tight">Predict Your Score Instantly</h3>
                <p className="text-xs text-indigo-100/70 leading-relaxed font-bold">
                  Use our real-time interactive AP Gov Score Calculator to adjust raw multiple-choice and free-response sliders, seeing your estimated score change instantly.
                </p>
                <Link
                  to="/ap-gov-calculator"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/20 text-center transition-all flex items-center justify-center gap-2 active:scale-95 inline-block"
                >
                  Open Score Predictor
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-indigo-900/20 border border-indigo-50 dark:border-indigo-800 rounded-[40px] space-y-6 text-left">
              <h3 className="font-black text-indigo-950 dark:text-white text-lg tracking-tight flex items-center gap-2">
                <Calendar size={18} className="text-indigo-500" />
                Exam Date & Logistics
              </h3>
              <div className="space-y-4 text-xs font-bold leading-relaxed">
                <div className="flex justify-between items-center py-2 border-b border-indigo-50 dark:border-indigo-800">
                  <span className="text-indigo-400">Month</span>
                  <span className="text-indigo-950 dark:text-white">May (Annually)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-indigo-50 dark:border-indigo-800">
                  <span className="text-indigo-400">Total Duration</span>
                  <span className="text-indigo-950 dark:text-white">3 Hours, 0 Mins</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-indigo-400">College Board Fee</span>
                  <span className="text-indigo-950 dark:text-white">~ $99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
