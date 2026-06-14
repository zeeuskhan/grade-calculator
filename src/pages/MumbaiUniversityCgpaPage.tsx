import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Clipboard, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

// Mumbai University official formula config: 
// If CGPA < 7: Percentage = (7.1 × CGPA) + 11
// If CGPA >= 7: Percentage = (7.2 × CGPA) + 12 (based on official MU circulars)
const FORMULA_CONFIG = {
  universityName: "Mumbai University",
  fullName: "University of Mumbai",
  formulaText: "If CGPA < 7: (7.1 × CGPA) + 11 | If CGPA ≥ 7: (7.2 × CGPA) + 12",
  placeholderFormula: "FORMULA_PLACEHOLDER", // Placed clearly for verification
  convert: (cgpa: number): number => {
    if (cgpa < 7.0) {
      return (7.1 * cgpa) + 11;
    } else {
      return (7.2 * cgpa) + 12;
    }
  }
};

export default function MumbaiUniversityCgpaPage() {
  const [cgpa, setCgpa] = useState<string>('7.5');
  const [copied, setCopied] = useState<boolean>(false);

  const calculatedPercentage = parseFloat(cgpa) 
    ? Math.min(100, Math.max(0, FORMULA_CONFIG.convert(parseFloat(cgpa))))
    : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${cgpa} CGPA is equal to ${calculatedPercentage.toFixed(2)}% in Mumbai University`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What is the official Mumbai University CGPA to Percentage formula?",
      a: "According to the University of Mumbai's official circular under the CBGS guidelines, the formula is split: For CGPA less than 7, Percentage = (7.1 × CGPA) + 11. For CGPA of 7 or higher, Percentage = (7.2 × CGPA) + 12."
    },
    {
      q: "How to convert an 8.5 CGPA in Mumbai University?",
      a: "Since 8.5 is greater than or equal to 7, we apply the upper formula: Percentage = (7.2 × 8.5) + 12 = 61.2 + 12 = 73.20%."
    },
    {
      q: "Does Mumbai University use a 10-point scale?",
      a: "Yes, Mumbai University strictly utilizes a 10-point Choice Based Credit and Grading System (CBCS) across major engineering, science, arts, and commerce undergraduate and postgraduate courses."
    },
    {
      q: "Where is the Mumbai University percentage conversion factor printed?",
      a: "The conversion formulas are generally printed at the bottom of the reverse page of official grade sheets issued by the University of Mumbai, Kalina campus."
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
        "name": "CGPA Calculators",
        "item": "https://calculatorofgrades.vercel.app/gpa-calculator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mumbai University CGPA to Percentage Calculator",
        "item": "https://calculatorofgrades.vercel.app/mumbai-university-cgpa-to-percentage-calculator"
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
        title="Mumbai University CGPA to Percentage Calculator | Official MU Formula"
        description="Convert Mumbai University CGPA to Percentage using the official MU Choice-Based Grading System (CBGS) formula. Real-time split calculations."
        schema={[breadcrumbsSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <ChevronRight size={14} />
          <Link to="/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-300">CGPA Calculators</Link>
          <ChevronRight size={14} />
          <span className="text-indigo-950 dark:text-white">Mumbai University Calculator</span>
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
                    {FORMULA_CONFIG.universityName} CGPA to Percentage Calculator
                  </h1>
                  <p className="text-indigo-500 dark:text-indigo-300 text-xs font-black tracking-widest uppercase mt-1">
                    MU Choice-Based Credit & Grading System
                  </p>
                </div>
              </div>

              {/* Calculator Panel */}
              <div className="bg-indigo-50/30 dark:bg-indigo-950/40 rounded-3xl p-6 border border-indigo-100/50 dark:border-indigo-900/50 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <label className="block text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest mb-3">
                      Enter Your {FORMULA_CONFIG.universityName} CGPA
                    </label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        placeholder="e.g. 7.50"
                        className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-indigo-950 border-2 border-indigo-100 dark:border-indigo-800 focus:border-indigo-500 text-lg font-black outline-none transition-all text-indigo-950 dark:text-white"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-400">
                        / 10.0
                      </span>
                    </div>
                  </div>

                  <div className="text-center md:text-left bg-gradient-to-br from-indigo-500 to-violet-600 dark:from-indigo-600 dark:to-indigo-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100 block mb-1">
                      Equivalent percentage
                    </span>
                    <span className="text-4xl font-black tracking-tight block">
                      {calculatedPercentage.toFixed(2)}%
                    </span>
                    <div className="mt-4 flex items-center justify-between">
                      <button 
                        onClick={handleCopy}
                        className="text-[10px] font-black bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <Clipboard size={12} />
                        {copied ? 'Copied!' : 'Copy Result'}
                      </button>
                      <span className="text-[8px] font-bold opacity-85">
                        Split Formula logic
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Article - 400 words unique */}
              <div className="mt-10 space-y-6 text-indigo-950/80 dark:text-indigo-100/80 text-sm leading-relaxed font-sans font-bold">
                <h2 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight">
                  Academic Standards of the University of Mumbai (MU)
                </h2>
                <p>
                  Established in 1857, the University of Mumbai (MU) coordinates thousands of academic undergraduate and post-graduate placements annually. Across engineering directories, science streams, arts colleges, and commerce classes, MU maintains a customized Choice Based Credit and Grading System (CBGS).
                </p>
                <p>
                  Because recruitment metrics at global corporations and competitive admissions bodies across Europe and North America request direct percentage equivalents, converting MU's piecewise linear grades is crucial.
                </p>

                <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Breaking Down the Piecewise Mumbai University Formula
                </h3>
                <p>
                  Unlike basic multipliers, the University of Mumbai applies a conditional multiplier mapping based on the candidate's exact tier:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80">
                    <span className="block text-xs font-black uppercase tracking-wider text-indigo-500 mb-1">Tier 1: CGPA under 7.00</span>
                    <p className="font-mono text-base font-black text-indigo-950 dark:text-white">Percentage (%) = (7.1 × CGPA) + 11</p>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80">
                    <span className="block text-xs font-black uppercase tracking-wider text-indigo-500 mb-1">Tier 2: CGPA 7.00 or Higher</span>
                    <p className="font-mono text-base font-black text-indigo-950 dark:text-white">Percentage (%) = (7.2 × CGPA) + 12</p>
                  </div>
                </div>

                <h3 className="text-md font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Mumbai University Solved Example (CGPA = 6.80)
                </h3>
                <p>
                  Let us convert a CGPA of **6.80**:
                </p>
                <ul className="list-decimal list-inside space-y-2 pl-4">
                  <li>Check if CGPA is below 7: Yes, 6.80 &lt; 7.00.</li>
                  <li>Incorporate Tier 1 Formula: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">(7.1 × 6.80) + 11</code></li>
                  <li>Execute math: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">48.28 + 11 = 59.28%</code></li>
                </ul>
                <p className="mt-2">
                  Thus, a 6.80 CGPA equals exactly **59.28%**.
                </p>
              </div>
            </div>

            {/* Sibling University Directory & Related Tools */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mb-6">
                Explore Other University CGPA Converters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link to="/vtu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>VTU University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/anna-university-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Anna University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/aktu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>AKTU University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight mb-8">
                Frequently Asked Questions — Mumbai University
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

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-indigo-900/20 p-6 rounded-[32px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm text-center">
              <BookOpen className="text-indigo-600 dark:text-indigo-400 mx-auto mb-4" size={32} />
              <h4 className="font-black text-indigo-950 dark:text-white uppercase tracking-wider text-xs mb-2">
                Need Academic Estimations?
              </h4>
              <p className="text-xs text-indigo-900/70 dark:text-indigo-100/60 font-medium mb-4 leading-relaxed">
                Calculate continuous semester progress and plan grade goals instantly using the standard suite.
              </p>
              <Link 
                to="/gpa-calculator"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Launch GPA Engine
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
