import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Clipboard, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

// AKTU-specific formula config: Percentage = (CGPA - 0.75) × 10
const FORMULA_CONFIG = {
  universityName: "AKTU",
  fullName: "Dr. A.P.J. Abdul Kalam Technical University",
  formulaText: "(CGPA - 0.75) × 10",
  placeholderFormula: "FORMULA_PLACEHOLDER", // Placed clearly for verification
  convert: (cgpa: number): number => {
    if (cgpa < 0.75) return 0;
    return (cgpa - 0.75) * 10;
  }
};

export default function AktuCgpaPage() {
  const [cgpa, setCgpa] = useState<string>('8.2');
  const [copied, setCopied] = useState<boolean>(false);

  const calculatedPercentage = parseFloat(cgpa) 
    ? Math.min(100, Math.max(0, FORMULA_CONFIG.convert(parseFloat(cgpa))))
    : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${cgpa} CGPA is equal to ${calculatedPercentage.toFixed(2)}% in AKTU`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What is the official formula for AKTU CGPA to Percentage?",
      a: "The official formula mandated by Dr. A.P.J. Abdul Kalam Technical University (AKTU) for all engineering streams under the CBCS curriculum is: Percentage = (CGPA - 0.75) × 10."
    },
    {
      q: "Does AKTU use different formulas for older batches?",
      a: "Yes, for legacy batches under the non-CBCS scheme, different calculation cards might apply, but for all modern programs starting from 2016-17 onwards, the (CGPA - 0.75) factor is uniformly enforced."
    },
    {
      q: "If my CGPA is 7.5, what is my percentage in AKTU?",
      a: "Applying the official formula: (7.5 - 0.75) × 10 = 6.75 × 10 = 67.50%."
    },
    {
      q: "Do I need the AKTU CGPA converter for competitive government exam registrations?",
      a: "Absolutely. Competitive national exams such as UPSC, GATE, and major public sector enterprise forms require the exact converted percentages."
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
        "name": "AKTU CGPA to Percentage Calculator",
        "item": "https://calculatorofgrades.vercel.app/aktu-cgpa-to-percentage-calculator"
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
        title="AKTU CGPA to Percentage Calculator | Official CBCS Formula"
        description="Convert your AKTU Lucknow CGPA to Marks Percentage instantly. Accurate calculation based on the official (CGPA - 0.75) x 10 guidelines."
        schema={[breadcrumbsSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <ChevronRight size={14} />
          <Link to="/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-300">CGPA Calculators</Link>
          <ChevronRight size={14} />
          <span className="text-indigo-950 dark:text-white">AKTU Calculator</span>
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
                    Dr. A.P.J. Abdul Kalam Technical University Formula
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
                        placeholder="e.g. 8.20"
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
                      <span className="text-[9px] font-bold opacity-85">
                        Formula: {FORMULA_CONFIG.formulaText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative Article - 350 words unique */}
              <div className="mt-10 space-y-6 text-indigo-950/80 dark:text-indigo-100/80 text-sm leading-relaxed font-sans font-bold">
                <h2 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight">
                  Brief Overview of the academic evaluation of AKTU Lucknow
                </h2>
                <p>
                  Dr. A.P.J. Abdul Kalam Technical University (AKTU), headquartered in Lucknow, Uttar Pradesh, governs technical education standards across Northern India. Standardizing cumulative engineering evaluations, AKTU employs the cumulative grading point average standard.
                </p>
                <p>
                  Converting AKTU CGPA is critical when applying for postgraduate qualifications like M.Tech or MBA, participating in Campus Placements, or filling up centralized public recruitment forms like UPSC or State Commissions.
                </p>

                <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  AKTU Lucknow CGPA Calculation Guidelines
                </h3>
                <p>
                  By official decree, AKTU specifies the conversion factor of 10 applied on top of a flat subtraction coefficient. This ensures global alignment with traditional marking indexes:
                </p>
                <div className="p-5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80 text-center text-indigo-950 dark:text-white font-mono text-base font-black">
                  Percentage (%) = (CGPA - 0.75) × 10
                </div>

                <h3 className="text-md font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Step-by-Step Sample Conversion
                </h3>
                <p>
                  Let us demonstrate the conversion using a target CGPA of **7.20**:
                </p>
                <ul className="list-decimal list-inside space-y-2 pl-4">
                  <li>Get cumulative CGPA: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">7.20</code></li>
                  <li>Subtract offset: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">7.20 - 0.75 = 6.45</code></li>
                  <li>Amplify the remaining value: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">6.45 × 10 = 64.50%</code></li>
                </ul>
                <p className="mt-2">
                  Hence, a candidate with 7.20 CGPA holds an exact average of **64.50%** across all semesters.
                </p>
              </div>
            </div>

            {/* Sibling University Directory & Related Tools */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mb-6">
                Explore Other University CGPA Converters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link to="/mumbai-university-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Mumbai University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/anna-university-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Anna University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/sppu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>SPPU University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight mb-8">
                Frequently Asked Questions — AKTU
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
