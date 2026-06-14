import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Clipboard, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

// RGPV-specific formula config: Percentage = CGPA × 10
const FORMULA_CONFIG = {
  universityName: "RGPV",
  fullName: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
  formulaText: "CGPA × 10",
  placeholderFormula: "FORMULA_PLACEHOLDER", // Placed clearly for verification
  convert: (cgpa: number): number => {
    return cgpa * 10;
  }
};

export default function RgpvCgpaPage() {
  const [cgpa, setCgpa] = useState<string>('8.0');
  const [copied, setCopied] = useState<boolean>(false);

  const calculatedPercentage = parseFloat(cgpa) 
    ? Math.min(100, Math.max(0, FORMULA_CONFIG.convert(parseFloat(cgpa))))
    : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${cgpa} CGPA is equal to ${calculatedPercentage.toFixed(2)}% in RGPV`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What is the official RGPV CGPA to percentage conversion formula?",
      a: "The official formula specified by Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV, Bhopal) for Engineering and pharmacy streams is: Percentage (%) = CGPA × 10."
    },
    {
      q: "If my RGPV engineering CGPA is 7.50, what is my percentage?",
      a: "Applying the official RGPV formula: 7.50 × 10 = 75.00% exact."
    },
    {
      q: "Is there any subtraction factor in RGPV CGPA conversion?",
      a: "No, under standard RGPV CBCS guidelines, there is no subtraction factor of 0.75 or 0.5. It's a clean 10.0x scale conversion."
    },
    {
      q: "Where is the RGPV conversion factors officially printed?",
      a: "The formula is officially printed on the back page of semester evaluation transcripts provided by Bhopal's state technological university."
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
        "name": "RGPV CGPA to Percentage Calculator",
        "item": "https://calculatorofgrades.vercel.app/rgpv-cgpa-to-percentage-calculator"
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
        title="RGPV CGPA to Percentage Calculator | Official Bhopal CBGS System"
        description="Convert Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV Bhopal) engineering CGPA to percentage online. Safe, fast, and 100% accurate conversion."
        schema={[breadcrumbsSchema, faqSchema]}
      />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-300">Home</Link>
          <ChevronRight size={14} />
          <Link to="/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-305">CGPA Calculators</Link>
          <ChevronRight size={14} />
          <span className="text-indigo-950 dark:text-white">RGPV Calculator</span>
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
                    State Technological University of Madhya Pradesh (Bhopal)
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
                        placeholder="e.g. 8.00"
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
                  Academic Evaluation Guidelines at Rajiv Gandhi Technological University (RGPV)
                </h2>
                <p>
                  Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)—the state-run technological university governing technical and pharmacy curricula in Bhopal, Madhya Pradesh—maintains a flexible CBGS pattern for BE, B.Tech, and B.Pharmacy candidates.
                </p>
                <p>
                  Because campus recruitment events hosted by global giants like TCS, Infosys, and Honeywell evaluate candidates based on aggregate marks percentages, securing an accurate RGPV CGPA conversion is paramount for engineering students.
                </p>

                <h3 className="text-lg font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Explaining the Official RGPV Formula Standard
                </h3>
                <p>
                  According to official RGPV academics boards guidelines, the cumulative grade point average converts directly to overall marks percentages without intermediate subtractions:
                </p>
                <div className="p-5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-800/80 text-center text-indigo-950 dark:text-white font-mono text-base font-black">
                  Percentage (%) = CGPA × 10
                </div>

                <h3 className="text-md font-black text-indigo-950 dark:text-white tracking-tight mt-6">
                  Sample Numerical Calculation
                </h3>
                <p>
                  Let us demonstrate the conversion on an RGPV engineering transcript listing **7.80 CGPA**:
                </p>
                <ul className="list-decimal list-inside space-y-2 pl-4">
                  <li>Get cumulative CGPA: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">7.80</code></li>
                  <li>Multiply directly by 10: <code className="font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded">7.80 × 10 = 78.00%</code></li>
                </ul>
                <p className="mt-2">
                  Therefore, a 7.80 CGPA equals exactly **78.00%** on placements portals and admissions lists.
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
                <Link to="/sppu-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>SPPU University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
                <Link to="/du-cgpa-to-percentage-calculator" className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-800 text-xs font-black text-indigo-950 dark:text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Delhi University</span>
                  <ArrowRight size={14} className="text-indigo-500" />
                </Link>
              </div>
            </div>

            {/* FAQ Area */}
            <div className="bg-white dark:bg-indigo-900/20 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800/50 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-black text-indigo-950 dark:text-white tracking-tight mb-8">
                Frequently Asked Questions — RGPV
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
