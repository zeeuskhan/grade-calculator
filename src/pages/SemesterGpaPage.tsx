import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Calculator, Share2, Clipboard, Sparkles, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoints: number; // 0 to 10 scale
}

export default function SemesterGpaPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Engineering Mathematics', credits: 4, gradePoints: 9 },
    { id: '2', name: 'Physics Lab', credits: 2, gradePoints: 10 },
    { id: '3', name: 'Computer Programming', credits: 3, gradePoints: 8 },
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const calculateGpa = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;
    subjects.forEach((sub) => {
      totalCredits += sub.credits;
      totalPoints += sub.credits * sub.gradePoints;
    });
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [subjects]);

  const addSubject = () => {
    const uniqueId = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    setSubjects([
      ...subjects,
      { id: uniqueId, name: '', credits: 3, gradePoints: 8 }
    ]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects(subjects.map(sub => {
      if (sub.id === id) {
        if (field === 'credits') {
          return { ...sub, credits: Math.max(1, Number(value)) };
        }
        if (field === 'gradePoints') {
          return { ...sub, gradePoints: Math.min(10, Math.max(0, Number(value))) };
        }
        return { ...sub, [field]: value };
      }
      return sub;
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`My average GPA in this semester is ${calculateGpa.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "How is Cumulative Semester GPA calculated in college?",
      a: "Semester GPA is calculated using the weighted credit hours formula: Sum of (Course Credits × Grade Points obtained) divided by (Total Credit Hours taken). This rewards heavier credit classes proportionally."
    },
    {
      q: "Does an F grade or arrear affect Semester GPA?",
      a: "Yes. An F grade carries 0 grade points, but the credit hours are still added to the total denominator. This significantly pulls down your semester GPA average until cleared."
    },
    {
      q: "What is a good Semester GPA out of a 10.0 scale?",
      a: "A Semester GPA of 8.0 or higher is generally considered excellent, reflecting an average of 'A' grades. In highly competitive branches, keeping score above 8.5 unlocks scholarship/distinction status."
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
        "name": "GPA Calculators",
        "item": "https://calculatorofgrades.vercel.app/gpa-calculator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Semester GPA Calculator",
        "item": "https://calculatorofgrades.vercel.app/semester-gpa-calculator"
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
        title="Semester GPA Calculator | Calculate SGPA from Credits"
        description="Verify your semester GPA/SGPA instantly. Input subject credits and grade points for fast weighted average calculation."
        schema={[breadcrumbsSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <ChevronRight size={14} />
          <Link to="/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-300">GPA Calculators</Link>
          <ChevronRight size={14} />
          <span className="text-indigo-950 dark:text-white">Semester GPA Calculator</span>
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
                    Semester GPA Calculator (SGPA)
                  </h1>
                  <p className="text-indigo-500 dark:text-indigo-300 text-xs font-black tracking-widest uppercase mt-1">
                    Calculate your exact university weights dynamically
                  </p>
                </div>
              </div>

              {/* Dynamic Interactive Panel */}
              <div className="mt-8 space-y-4">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-black text-indigo-400 uppercase tracking-widest">
                  <span className="col-span-6">Subject / Course Name</span>
                  <span className="col-span-3">Credits</span>
                  <span className="col-span-2">Grade Points</span>
                  <span className="col-span-1 text-center">Action</span>
                </div>

                <AnimatePresence mode="popLayout">
                  {subjects.map((sub) => (
                    <motion.div 
                      key={sub.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-3 bg-indigo-50/20 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/50 items-center"
                    >
                      <div className="col-span-1 md:col-span-6">
                        <input 
                          type="text"
                          value={sub.name}
                          onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                          placeholder="e.g. Mathematics"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-sm font-bold text-indigo-950 dark:text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:block gap-2 items-center">
                        <span className="md:hidden text-xs font-black uppercase text-indigo-400">Credits:</span>
                        <input 
                          type="number"
                          min="1"
                          max="15"
                          value={sub.credits}
                          onChange={(e) => updateSubject(sub.id, 'credits', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-sm font-black text-indigo-950 dark:text-white outline-none focus:border-indigo-500 text-center"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:block gap-2 items-center">
                        <span className="md:hidden text-xs font-black uppercase text-indigo-400">G.P. (0-10):</span>
                        <input 
                          type="number"
                          min="0"
                          max="10"
                          value={sub.gradePoints}
                          onChange={(e) => updateSubject(sub.id, 'gradePoints', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-sm font-black text-indigo-950 dark:text-white outline-none focus:border-indigo-500 text-center"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-1 flex justify-center">
                        <button 
                          onClick={() => removeSubject(sub.id)}
                          className="p-2 text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-xl hover:bg-rose-100 hover:text-rose-600 transition-all active:scale-90"
                          aria-label="Delete Class"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                  <button 
                    onClick={addSubject}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Subject
                  </button>

                  <div className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-violet-600 dark:from-indigo-600 dark:to-indigo-800 text-white px-8 py-4 rounded-3xl text-center sm:text-right shadow-md">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100 block mb-1">
                      Calculated Semester GPA
                    </span>
                    <span className="text-3xl font-black">
                      {calculateGpa.toFixed(2)} / 10.00
                    </span>
                    <div className="mt-2">
                      <button 
                        onClick={handleCopy}
                        className="text-[9px] font-black uppercase tracking-widest text-white/80 hover:text-white underline cursor-pointer"
                      >
                        {copied ? 'Copied' : 'Copy result'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Article */}
              <div className="mt-10 space-y-6 text-indigo-950/80 dark:text-indigo-100/80 text-sm leading-relaxed font-sans font-bold">
                <h2 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight">
                  How is a Semester GPA Formulated in Universities?
                </h2>
                <p>
                  A Semester GPA (often termed SGPA or Semester Grade Point Average) evaluates an undergraduate's comprehensive academic performance over a single term or college semester. Broadly utilized by global universities and colleges in India, Sri Lanka, and the US, SGPA structures offer academic advisors immediate measures of course progression.
                </p>
                <p>
                  Because classes are not weighted identically—a core lecture carry double the credits of a brief weekly computing lab—basic arithmetic means are insufficient. Hence, the system implements a weighted product model.
                </p>

                <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  The Weighted Multiplier Math Formula
                </h3>
                <p>
                  Calculating your final weighted semester GPA requires dividing the sum of total points by total cumulative credit hours:
                </p>
                <div className="p-5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80 text-center text-indigo-950 dark:text-white font-mono text-base font-black">
                  SGPA = Σ (Course Credits × Grade Points) / Σ (Total Credits)
                </div>

                <h3 className="text-md font-black text-indigo-950 dark:text-white tracking-tight mt-6 font-sans">
                  Sample Conversion Table Case Study
                </h3>
                <p>
                  Let us demonstrate using a common 3-subject configuration:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Subject A: 4 Credits × 9 Grade Points = 36 points</li>
                  <li>Subject B: 3 Credits × 8 Grade Points = 24 points</li>
                  <li>Subject C: 2 Credits × 10 Grade Points = 20 points</li>
                </ul>
                <p className="mt-4">
                  Add metrics together: Total points = 36 + 24 + 20 = 80 points. Total credit sum: 4 + 3 + 2 = 9 credits.
                  SGPA = 80 / 9 = **8.89**.
                </p>
              </div>
            </div>

            {/* Sibling Links */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mb-6">
                Check Out Other Core Academic Estimators
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link to="/attendance-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70 border border-indigo-105 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Attendance Calculator</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/vtu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>VTU CGPA Converter</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/du-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>DU CGPA Converter</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight mb-8">
                Frequently Asked Inquiries — Semesters GPAList
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
                GPA Strategy
              </span>
              <h4 className="font-black tracking-tight text-lg mb-2 leading-tight">
                Cumulative vs Term GPA
              </h4>
              <p className="text-xs text-indigo-200/85 leading-relaxed font-medium">
                Keep an eye on individual credit distributions. Excelling in heavy credit lectures is the single most optimal strategy to raise your overall academic standings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
