import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Clipboard, Sparkles, BookOpen, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function AttendancePercentagePage() {
  const [total, setTotal] = useState<string>('40');
  const [attended, setAttended] = useState<string>('26');
  const [target, setTarget] = useState<string>('75');
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const t = parseInt(total) || 0;
    const a = parseInt(attended) || 0;
    const goal = parseFloat(target) || 75;

    if (t <= 0) return { percent: 0, status: 'invalid', count: 0 };
    if (a > t) return { percent: 100, status: 'overlimit', count: 0 };

    const percent = (a / t) * 100;
    
    if (percent < goal) {
      // Classes to attend: Math.ceil((target * total - 100 * attended) / (100 - target))
      const needed = Math.ceil((goal * t - 100 * a) / (100 - goal));
      return {
        percent,
        status: 'below',
        count: Math.max(0, needed)
      };
    } else {
      // Classes to skip: Math.floor((100 * attended - target * total) / target)
      const canMiss = Math.floor((100 * a - goal * t) / goal);
      return {
        percent,
        status: 'above',
        count: Math.max(0, canMiss)
      };
    }
  }, [total, attended, target]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`My class attendance is ${stats.percent.toFixed(1)}%.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What is the 75% attendance rule?",
      a: "Most universities across India (including VTU, Anna University, and DU) enforce a mandatory 75% minimum classroom attendance to qualify for writing semester-end examinations. Falling below this mark can lead to detaining or debarment."
    },
    {
      q: "How does the attendance percentage calculator estimate required classes?",
      a: "The tool works out the mathematical ratio: Attended Classes / Total Classes. If below your target (e.g., 75%), it calculates how many consecutive upcoming classes you must attend to satisfy that percentage."
    },
    {
      q: "How many classes can I safely miss if my attendance is high?",
      a: "If your current attendance exceeds your target, our tool applies the inverse equation to find the maximum buffer classes you can skip consecutively without dropping below the target threshold."
    }
  ];

  const breadcrumbsSchema = {
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
        "name": "Related Tools",
        "item": "https://calculatorofgrades.vercel.app/attendance-percentage-calculator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Attendance Percentage Calculator",
        "item": "https://calculatorofgrades.vercel.app/attendance-percentage-calculator"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#fbfbfe] dark:bg-indigo-950 pb-20 transition-colors duration-300">
      <SEO 
        title="Attendance Percentage Calculator | Classes Needed to Reach 75%"
        description="Verify your classroom attendance percentage dynamically. Calculate classes needed to reach 75% target or number of classes you can safely skip."
        schema={[breadcrumbsSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <ChevronRight size={14} />
          <span className="text-indigo-950 dark:text-white">Attendance Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800 shadow-sm">
                  <Calculator size={28} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-indigo-950 dark:text-white tracking-tight">
                    Attendance Percentage Calculator
                  </h1>
                  <p className="text-indigo-500 dark:text-indigo-300 text-xs font-black tracking-widest uppercase mt-1">
                    Track class criteria, target bounds, and skip limits
                  </p>
                </div>
              </div>

              {/* Interactive Panel */}
              <div className="bg-indigo-50/30 dark:bg-indigo-950/40 rounded-3xl p-6 border border-indigo-100/50 dark:border-indigo-900/50 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest mb-3">
                      Total Classes Held
                    </label>
                    <input 
                      type="number"
                      min="1"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      placeholder="e.g. 40"
                      className="w-full px-5 py-3 rounded-2xl bg-white dark:bg-indigo-950 border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-500 text-md font-black outline-none transition-all text-indigo-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest mb-3">
                      Classes You Attended
                    </label>
                    <input 
                      type="number"
                      min="0"
                      value={attended}
                      onChange={(e) => setAttended(e.target.value)}
                      placeholder="e.g. 26"
                      className="w-full px-5 py-3 rounded-2xl bg-white dark:bg-indigo-950 border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-500 text-md font-black outline-none transition-all text-indigo-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest mb-3">
                      Target Attendance %
                    </label>
                    <input 
                      type="number"
                      min="10"
                      max="100"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="e.g. 75"
                      className="w-full px-5 py-3 rounded-2xl bg-white dark:bg-indigo-950 border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-500 text-md font-black outline-none transition-all text-indigo-950 dark:text-white"
                    />
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-indigo-950 text-white text-center flex flex-col justify-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-1">
                      Current Attendance Status
                    </span>
                    <span className="text-4xl font-black block">
                      {stats.percent.toFixed(1)}%
                    </span>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button 
                        onClick={handleCopy}
                        className="text-[10px] font-black bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg uppercase tracking-wider transition-all"
                      >
                        {copied ? 'Copied' : 'Copy result'}
                      </button>
                    </div>
                  </div>

                  {/* Recommendation Analysis Box */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-indigo-900/30 border border-indigo-105/50 flex flex-col justify-center">
                    {stats.status === 'below' && (
                      <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center gap-2 text-rose-500 font-black text-xs uppercase tracking-widest justify-center md:justify-start">
                          <AlertTriangle size={16} /> Attention Required
                        </div>
                        <p className="text-sm font-bold text-indigo-950 dark:text-white leading-relaxed">
                          You need to attend premium classes consecutively to satisfy target requirements:
                        </p>
                        <span className="text-2xl font-black text-rose-500 block">
                          Attend {stats.count} more classes
                        </span>
                      </div>
                    )}

                    {stats.status === 'above' && (
                      <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest justify-center md:justify-start">
                          <CheckCircle2 size={16} /> Good standing
                        </div>
                        <p className="text-sm font-bold text-indigo-950 dark:text-white leading-relaxed">
                          Your metric holds strong! You can safely skip classes before falling:
                        </p>
                        <span className="text-2xl font-black text-emerald-500 block">
                          Can miss {stats.count} classes
                        </span>
                      </div>
                    )}

                    {stats.status === 'overlimit' && (
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-bold text-indigo-950 dark:text-white">
                          Attended classes cannot exceed total classes held. Verify your inputs.
                        </p>
                      </div>
                    )}

                    {stats.status === 'invalid' && (
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-bold text-indigo-950 dark:text-white">
                          Please fill class counts to calculate recommendations.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Informative Article - 350 words unique */}
              <div className="mt-10 space-y-6 text-indigo-950/80 dark:text-indigo-100/80 text-sm leading-relaxed font-sans font-bold">
                <h2 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight">
                  Academic Guidelines Surrounding Classroom Attendance
                </h2>
                <p>
                  Classroom attendance is a cornerstone of academic discipline globally. Inside universities and degree colleges—spanning technical institutions, liberal arts campuses, and corporate training divisions—satisfying a core attendance target (most typically **75%** or **80%**) represents a firm prerequisite for sitting exams.
                </p>
                <p>
                  This Attendance Percentage Calculator provides immediate clarity regarding your current classroom standing. Rather than basic averages, our recommendation algorithm delivers actionable metrics: defining exactly how many upcoming lectures you must attend consecutively, or indicating your safe skip margin.
                </p>

                <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Understanding the Mathematical Equations
                </h3>
                <p>
                  Calculations differ dynamically based on your current status compared to the target percentage threshold ($P_{target}$):
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80">
                    <span className="block text-xs font-black uppercase tracking-wider text-rose-500 mb-1">When Below Target (Classes to Attend consecutively):</span>
                    <p className="font-mono text-sm font-black text-indigo-950 dark:text-white">Upcoming = ⌈ (Target % × Total - 100 × Attended) / (100 - Target %) ⌉</p>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80">
                    <span className="block text-xs font-black uppercase tracking-wider text-emerald-500 mb-1">When Above Target (Classes you can safely miss):</span>
                    <p className="font-mono text-sm font-black text-indigo-950 dark:text-white">Can Skip = ⌊ (100 × Attended - Target % × Total) / Target % ⌋</p>
                  </div>
                </div>

                <h3 className="text-md font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Real-world Sample Worked Scenario
                </h3>
                <p>
                  Suppose a student currently has **26 out of 40** classes attended, aiming to reach a target of **75%**:
                </p>
                <ul className="list-decimal list-inside space-y-2 pl-4">
                  <li>Current Attendance %: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">(26 / 40) × 100 = 65%</code></li>
                  <li>Applying consecutive attendance equation: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">⌈ (75 × 40 - 100 × 26) / (100 - 75) ⌉</code></li>
                  <li>Math result: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">⌈ (3000 - 2600) / 25 ⌉ = 400 / 25 = 16</code></li>
                </ul>
                <p className="mt-2">
                  Thus, the student must attend exactly **16 upcoming classes consecutively** (without single misses) to raise their standing to exactly 75%.
                </p>
              </div>
            </div>

            {/* Explore Directory */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mb-6">
                Explore Sibling Grade Computations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/semester-gpa-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Semester GPA Calculator</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/vtu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>VTU CGPA Converter</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/anna-university-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Anna University CGPA</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight mb-8">
                Frequently Asked Inquiries — Attendance Matrix
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-indigo-50 dark:border-indigo-900/50 pb-6 last:border-0 last:pb-0">
                    <h4 className="font-black text-indigo-950 dark:text-white mb-2 text-base">
                      {faq.q}
                    </h4>
                    <p className="text-sm text-indigo-900/70 dark:text-indigo-100/60 font-bold font-sans">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-950 text-white p-8 rounded-[32px] shadow-lg relative overflow-hidden">
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-400 block mb-2">
                Exam Warning
              </span>
              <h4 className="font-black tracking-tight text-lg mb-2 leading-tight">
                Academic Hall Ticket Clearances
              </h4>
              <p className="text-xs text-indigo-200/85 leading-relaxed font-medium">
                Most premier university boards refuse clearance of hall tickets if classroom metrics drop under target thresholds. Use this planner to secure your exam entrance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
