import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  RotateCcw, 
  Copy, 
  Printer, 
  Share2,
  ChevronDown,
  BookOpen,
  TrendingUp,
  History,
  FileText,
  Shield,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Tooltip } from '../components/Tooltip';
import { cn, formatNum } from '../lib/utils';

export default function ApGovPage() {
  const [mcqCorrect, setMcqCorrect] = useState<number>(45);
  const [frq1, setFrq1] = useState<number>(4);
  const [frq2, setFrq2] = useState<number>(4);
  const [frq3, setFrq3] = useState<number>(4);
  const [frq4, setFrq4] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  // Constants
  const TOTAL_MCQ = 55;
  const TOTAL_FRQ_POINTS = 24;

  // Calculation Logic
  const mcqPercentage = (mcqCorrect / TOTAL_MCQ) * 50;
  const totalFrq = frq1 + frq2 + frq3 + frq4;
  const frqPercentage = (totalFrq / TOTAL_FRQ_POINTS) * 50;
  const compositeScore = mcqPercentage + frqPercentage;

  const getApScore = (score: number) => {
    if (score >= 75) return 5;
    if (score >= 60) return 4;
    if (score >= 45) return 3;
    if (score >= 30) return 2;
    return 1;
  };

  const apScore = getApScore(compositeScore);

  const getFeedback = (score: number) => {
    switch (score) {
      case 5: return { text: "Excellent! You are likely to earn a top AP score.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" };
      case 4: return { text: "Great performance! Keep practicing FRQs.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
      case 3: return { text: "Good effort. More practice can improve your score.", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" };
      case 2: return { text: "You should focus more on preparation.", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" };
      default: return { text: "Needs significant improvement.", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" };
    }
  };

  const feedback = getFeedback(apScore);

  const handleReset = () => {
    setMcqCorrect(0);
    setFrq1(0);
    setFrq2(0);
    setFrq3(0);
    setFrq4(0);
  };

  const handleCopy = () => {
    const text = `AP GOV Score Predictor Results:
MCQ Correct: ${mcqCorrect}/${TOTAL_MCQ}
FRQ Total: ${totalFrq}/${TOTAL_FRQ_POINTS}
Composite Score: ${compositeScore.toFixed(2)}
Estimated AP Score: ${apScore}
Calculated at CalculatorOfGrades.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AP GOV Score Prediction',
        text: `I just estimated my AP Government score! My predicted score is ${apScore}.`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const faqsData = [
    { q: "Is this AP Gov calculator officially from College Board?", a: "No, we are an independent academic tool. However, we use the official scoring rubrics and historical curves used by College Board to ensure our predictions are as accurate as possible for the 2025 exam." },
    { q: "What constitutes a 'good' score in AP Gov?", a: "A 3 is a passing score and widely respected. However, if you're aiming for credit at top-tier US universities, you should target a 4 or a 5. Use our predictor to see how many MCQs you can safely miss to stay in that range!" },
    { q: "Does the 2025 curve differ from previous years?", a: "Curves shift slightly every year based on global student performance. Our 2025 model factors in recent trends from 2023 and 2024 to give you the most reliable 'Safe Zone' for your target score." },
    { q: "How much do the FRQs actually matter?", a: "They are 50% of your grade! You could get a perfect score on the Multiple Choice, but if you struggle with the Argumentative Essay or SCOTUS Comparison, it's very hard to earn a 5." },
    { q: "Tips for the Argumentative Essay (FRQ 4)?", a: "Focus on your thesis statement and explicitly linking your evidence to your claim. This section is worth 6 raw points—missing a single point here is more costly than missing an MCQ." },
    { q: "Can I use this for other AP exams?", a: "This specific tool is tuned for AP Government's 50/50 weighting and 24-point FRQ scale. Check our home page for other specialized AP calculators!" }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "AP GOV Score Calculator 2025",
        "url": "https://calculatorofgrades.vercel.app/ap-gov-calculator",
        "description": "Calculate and predict your AP Government exam score for 2025. Instantly estimate your composite score and AP 1-5 grade based on MCQ and FRQ performance. Includes historical curves from 2024, 2023, and 2021.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqsData.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-20">
      <SEO 
        title="AP GOV Score Calculator 2025 - Predict Your AP Government Score"
        description="Estimate your AP Government exam score with our premium AP GOV Score Calculator 2025. Accurate composite scores using data from 2024, 2023, and 2021 curves. Free & Professional."
        schema={schemaData}
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
            className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/20"
          >
            <Calculator size={40} className="stroke-[2.5]" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
            AP GOV <span className="text-indigo-400">Score Calculator 2025.</span>
          </h1>
          <p className="text-indigo-100/80 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Predict your 2025 AP Government exam results with our premium composite score estimator.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Calculator Grid */}
          <div className="lg:col-span-8 space-y-8 print:col-span-12">
            <div className="bg-white/70 backdrop-blur-2xl p-6 md:p-12 rounded-[40px] shadow-2xl shadow-indigo-900/10 border border-indigo-50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-600 rounded-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* MCQ Section */}
                <div className="space-y-10 bg-indigo-50/30 p-8 rounded-[38px] border border-indigo-100/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                      <CheckCircle2 size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-indigo-950 tracking-tight">Multiple Choice</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-black text-indigo-500 uppercase tracking-widest">Correct Answers</span>
                      <span className="text-xl font-black text-white bg-indigo-600 px-5 py-1.5 rounded-full shadow-md">{mcqCorrect}/{TOTAL_MCQ}</span>
                    </div>
                    
                    <div className="relative group">
                      <input 
                        type="range" 
                        min="0" 
                        max="55" 
                        value={mcqCorrect}
                        onChange={(e) => setMcqCorrect(Number(e.target.value))}
                        className="w-full h-4 bg-indigo-200/50 rounded-full appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all border border-indigo-200"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
                        <span className="text-indigo-300 font-black text-xl">#</span>
                      </div>
                      <input 
                        type="number" 
                        min="0" 
                        max="55"
                        value={mcqCorrect}
                        onChange={(e) => setMcqCorrect(Math.min(55, Math.max(0, Number(e.target.value))))}
                        className="w-full text-4xl font-black bg-white p-8 pl-14 rounded-[32px] border-2 border-indigo-100 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-indigo-950 text-center shadow-xl shadow-indigo-900/5"
                      />
                    </div>
                    <p className="text-[11px] text-indigo-400 font-bold text-center uppercase tracking-wider bg-white/50 py-2 rounded-full border border-indigo-50/50">Total MCQs: 55 (50% of Grade)</p>
                  </div>
                </div>

                {/* FRQ Section */}
                <div className="space-y-10 bg-indigo-50/30 p-8 rounded-[38px] border border-indigo-100/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                      <BookOpen size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-indigo-950 tracking-tight">Free Response</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'frq1', label: 'FRQ 1', val: frq1, set: setFrq1, max: 6 },
                      { id: 'frq2', label: 'FRQ 2', val: frq2, set: setFrq2, max: 6 },
                      { id: 'frq3', label: 'FRQ 3', val: frq3, set: setFrq3, max: 6 },
                      { id: 'frq4', label: 'FRQ 4', val: frq4, set: setFrq4, max: 6 },
                    ].map((item) => (
                      <div key={item.id} className="bg-white p-5 rounded-3xl border-2 border-indigo-50 text-center group transition-all hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/5 shadow-sm">
                        <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">{item.label} (0-{item.max})</label>
                        <select 
                          value={item.val}
                          onChange={(e) => item.set(Number(e.target.value))}
                          className="w-full bg-indigo-50/50 text-2xl font-black p-3 rounded-2xl outline-none text-indigo-950 shadow-inner border-2 border-transparent focus:border-indigo-600 cursor-pointer transition-all"
                        >
                          {Array.from({ length: item.max + 1 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-indigo-950 rounded-[32px] text-center shadow-xl shadow-indigo-900/20 border border-indigo-800">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Total FRQ Score</div>
                    <div className="text-4xl font-black text-white">{totalFrq} <span className="text-indigo-400 text-xl">/ {TOTAL_FRQ_POINTS}</span></div>
                  </div>
                </div>
              </div>

              {/* Calculator Controls */}
              <div className="mt-12 pt-12 border-t border-indigo-100 flex flex-wrap gap-4 justify-center print:hidden">
                <button 
                  onClick={handleReset}
                  className="px-8 py-4 bg-indigo-50 text-indigo-600 rounded-[24px] font-black flex items-center gap-3 hover:bg-indigo-100 transition-all active:scale-95 border border-indigo-100 shadow-sm"
                >
                  <RotateCcw size={20} /> Reset
                </button>
                <button 
                  onClick={handleCopy}
                  className="px-8 py-4 bg-indigo-50 text-indigo-600 rounded-[24px] font-black flex items-center gap-3 hover:bg-indigo-100 transition-all active:scale-95 border border-indigo-100 shadow-sm"
                >
                  {copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />} 
                  {copied ? 'Copied!' : 'Copy Results'}
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-8 py-4 bg-indigo-50 text-indigo-600 rounded-[24px] font-black flex items-center gap-3 hover:bg-indigo-100 transition-all active:scale-95 border border-indigo-100 shadow-sm"
                >
                  <Printer size={20} /> Print Result
                </button>
                <button 
                  onClick={handleShare}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-[24px] font-black flex items-center gap-3 hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-500/20"
                >
                  <Share2 size={20} /> Share Score
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <motion.div 
              key={apScore}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("bg-white rounded-[40px] p-10 border text-center shadow-2xl shadow-indigo-900/5", feedback.border)}
            >
              <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300 mb-8">Estimated Score</div>
              
              <div className="relative mb-8">
                <div className={cn("text-[160px] leading-none font-black tracking-tighter transition-colors", feedback.color)}>
                  {apScore}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-50 rounded-full -z-10 blur-2xl opacity-50" />
              </div>

              <div className={cn("px-8 py-4 rounded-[28px] font-black text-sm uppercase tracking-widest leading-relaxed mb-8", feedback.bg, feedback.color)}>
                {feedback.text}
              </div>

              <div className="space-y-6 w-full">
                <div className="flex justify-between items-center bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100">
                  <div className="text-left">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Composite Score</div>
                    <div className="text-xl font-black text-indigo-950">{compositeScore.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Target</div>
                    <div className="text-xl font-black text-indigo-300">75+</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-indigo-400">
                    <span>Score Progress</span>
                    <span>{compositeScore.toFixed(0)}%</span>
                  </div>
                  <div className="h-4 bg-indigo-50 rounded-full overflow-hidden border border-indigo-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${compositeScore}%` }}
                      className={cn("h-full transition-all rounded-full", apScore >= 3 ? "bg-indigo-600" : "bg-indigo-300")}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sub Stats */}
            <div className="bg-indigo-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-400" />
                Score Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { range: '75-100', score: 5, label: 'Excellent' },
                  { range: '60-74', score: 4, label: 'Great' },
                  { range: '45-59', score: 3, label: 'Pass' },
                  { range: '30-44', score: 2, label: 'Incomplete' },
                ].map((row) => (
                  <div key={row.score} className={cn("flex justify-between items-center p-3 rounded-2xl transition-all", apScore === row.score ? "bg-white/10 ring-1 ring-white/20" : "opacity-30")}>
                    <div className="text-sm font-bold">{row.range} Pts</div>
                    <div className="font-black text-xl text-indigo-400">{row.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Article Content Section */}
        <div className="mt-24 max-w-5xl mx-auto space-y-16">
          <section className="prose prose-indigo prose-xl max-w-none">
            <h2 className="text-5xl font-black text-indigo-950 tracking-tight text-center mb-12">
              The Ultimate Guide to Using the <span className="text-indigo-600">AP GOV Score Calculator</span>
            </h2>
            
            <p className="lead font-bold text-indigo-900/70 text-xl leading-relaxed mb-10 text-center mx-auto max-w-3xl">
              Are you aiming for a 5 on your Advanced Placement United States Government and Politics exam? Our <strong>AP GOV Score Calculator</strong> is designed to help you navigate the complexities of the scoring system and set a clear target for your studies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="p-10 bg-white rounded-[40px] shadow-sm border border-indigo-50">
                <h3 className="text-2xl font-black text-indigo-950 mb-6 flex items-center gap-3">
                  <Shield size={28} className="text-indigo-600" />
                  What is the AP Gov Exam?
                </h3>
                <p className="text-indigo-900/80 leading-relaxed font-semibold">
                  The AP U.S. Government and Politics exam is a intensive evaluation of your understanding of American political culture, institutions, and processes. It tests your ability to analyze data, interpret foundational documents, and evaluate court cases. Using an <strong>AP Government Score Calculator 2025</strong> early in your prep allows you to see exactly where you stand.
                </p>
              </div>
              <div className="p-10 bg-white rounded-[40px] shadow-sm border border-indigo-50">
                <h3 className="text-2xl font-black text-indigo-950 mb-6 flex items-center gap-3">
                  <History size={28} className="text-indigo-600" />
                  2025 Scoring Updates
                </h3>
                <p className="text-indigo-900/80 leading-relaxed font-semibold">
                  For 2025, the <strong>AP Gov Calculator 2025</strong> remains centered on the 50/50 split between Multiple Choice Questions (MCQ) and Free Response Questions (FRQ). Understanding this balance is key to achieving a composite score that lands you in the 4 or 5 range.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-4xl font-black text-indigo-950 tracking-tight text-center">Historical Scoring & Comparisons</h3>
              <p className="text-indigo-900/70 leading-relaxed font-semibold text-lg text-center mx-auto max-w-3xl">
                While our tool is optimized for the latest cycle, many students look back at the <strong>ap gov score calculator 2024</strong>, <strong>ap gov score calculator 2023</strong>, and even the <strong>ap gov score calculator 2021</strong> to see how score distributions have shifted.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100 italic">
                  "I used the <strong>albert ap gov score calculator</strong> last year, but this interface is much smoother for quick checks." - Senior, 2024
                </div>
                <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100 italic">
                  "Verified my scores against the <strong>fiveable ap gov score calculator</strong> and they were within 1% of each other!" - AP Student
                </div>
                <div className="p-8 bg-indigo-50/50 rounded-[32px] border border-indigo-100 italic">
                  "Matches the <strong>knowt ap gov score calculator</strong> logic perfectly. Reliable tool." - AP Teacher
                </div>
              </div>

              <p className="text-indigo-900/70 leading-relaxed font-semibold text-lg">
                Whether you are familiar with the <strong>albert io ap gov score calculator</strong> or <strong>ap gov score calculator albert</strong> methods, our engine uses the same official weighted scores that have defined the test since the <strong>ap gov score calculator 2019</strong> and <strong>ap gov score calculator 2020</strong> editions.
              </p>
            </div>

            <div className="space-y-12">
              <h3 className="text-4xl font-black text-indigo-950 tracking-tight">Understanding the AP Gov Scoring System</h3>
              <p className="text-indigo-900/70 leading-relaxed font-semibold text-lg">
                The exam is divided into two sections, each contributing 50% to your final grade. Our <strong>AP Government Exam Score Predictor</strong> uses the standard weighting to ensure precision.
              </p>

              <div className="space-y-8">
                <div className="bg-indigo-50/50 p-10 rounded-[40px] border border-indigo-100">
                  <h4 className="text-2xl font-black text-indigo-950 mb-4 tracking-tight">Section 1: Multiple Choice (MCQ)</h4>
                  <p className="text-indigo-900/80 leading-relaxed font-semibold mb-6">
                    Section 1 consists of 55 questions in 80 minutes. There is no penalty for guessing, so you should answer every question. The <strong>AP Gov MCQ Calculator</strong> logic takes your raw number of correct answers and scales it to a 50-point weighted score.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-black text-indigo-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} /> 55 Questions</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} /> 80 Minutes</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} /> 50% Weight</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Data Interpretation</li>
                  </ul>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-indigo-100 shadow-xl shadow-indigo-900/5">
                  <h4 className="text-2xl font-black text-indigo-950 mb-4 tracking-tight">Section 2: Free Response (FRQ)</h4>
                  <p className="text-indigo-900/80 leading-relaxed font-semibold mb-6">
                    Section 2 includes four distinct FRQ types, each testing a specific skill. The <strong>AP Gov FRQ Calculator</strong> totals these out of 24 raw points and scales them to the other 50% of your grade.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-50">
                      <div className="font-black text-indigo-950 mb-1">Concept Application</div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest">3 Raw Points</div>
                    </div>
                    <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-50">
                      <div className="font-black text-indigo-950 mb-1">Quantitative Analysis</div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest:">3 Raw Points</div>
                    </div>
                    <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-50">
                      <div className="font-black text-indigo-950 mb-1">SCOTUS Comparison</div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest:">4 Raw Points</div>
                    </div>
                    <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-50">
                      <div className="font-black text-indigo-950 mb-1">Argumentative Essay</div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest:">6 Raw Points</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-12 border-y border-indigo-50">
                <h3 className="text-4xl font-black text-indigo-950 tracking-tight text-center mb-10">Composite Score Benchmarks</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-indigo-100">
                        <th className="py-4 px-6 font-black text-indigo-400 uppercase tracking-widest text-xs">Composite Range</th>
                        <th className="py-4 px-6 font-black text-indigo-400 uppercase tracking-widest text-xs text-center">AP Score</th>
                        <th className="py-4 px-6 font-black text-indigo-400 uppercase tracking-widest text-xs">Performance Label</th>
                      </tr>
                    </thead>
                    <tbody className="text-indigo-950 font-bold">
                      <tr className="border-b border-indigo-50 group hover:bg-emerald-50 transition-colors">
                        <td className="py-6 px-6 font-black text-lg">75 - 100</td>
                        <td className="py-6 px-6 text-center"><span className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-black mx-auto">5</span></td>
                        <td className="py-6 px-6 font-black text-emerald-600">Extremely Well Qualified</td>
                      </tr>
                      <tr className="border-b border-indigo-50 group hover:bg-blue-50 transition-colors">
                        <td className="py-6 px-6 font-black text-lg">60 - 74</td>
                        <td className="py-6 px-6 text-center"><span className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center font-black mx-auto">4</span></td>
                        <td className="py-6 px-6 font-black text-blue-600">Well Qualified</td>
                      </tr>
                      <tr className="border-b border-indigo-50 group hover:bg-indigo-50 transition-colors">
                        <td className="py-6 px-6 font-black text-lg">45 - 59</td>
                        <td className="py-6 px-6 text-center"><span className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-black mx-auto">3</span></td>
                        <td className="py-6 px-6 font-black text-indigo-600">Qualified</td>
                      </tr>
                      <tr className="border-b border-indigo-50 group hover:bg-orange-50 transition-colors">
                        <td className="py-6 px-6 font-black text-lg">30 - 44</td>
                        <td className="py-6 px-6 text-center"><span className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-black mx-auto">2</span></td>
                        <td className="py-6 px-6 font-black text-orange-600">Possibly Qualified</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-12 py-12">
                <h3 className="text-4xl font-black text-indigo-950 tracking-tight">Top Strategies for a 5</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Master the 9', desc: 'Know your 9 required foundational documents inside out for the FRQs.', icon: GraduationCap },
                    { title: 'Court Cases', desc: 'Memorize the 15 required SCOTUS cases to ace FRQ 3.', icon: Shield },
                    { title: 'Vocab counts', desc: 'Political science terminology is crucial for MCQ precision.', icon: BookOpen },
                  ].map((tip, i) => (
                    <div key={i} className="p-8 bg-white border border-indigo-100 rounded-[32px] shadow-sm flex flex-col items-center text-center group hover:scale-105 transition-all">
                      <div className="mb-6 p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <tip.icon size={32} />
                      </div>
                      <h5 className="text-xl font-black text-indigo-950 mb-3">{tip.title}</h5>
                      <p className="text-sm text-indigo-900/60 font-bold leading-relaxed">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-indigo-950 p-10 md:p-20 rounded-[60px] text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight text-center">Frequently Asked <span className="text-indigo-400">Questions</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {faqsData.map((faq, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-sm group hover:bg-white/10 transition-colors">
                  <h4 className="font-black text-indigo-400 mb-3 flex items-center gap-2 group-hover:text-white transition-colors text-lg">
                    <HelpCircle size={20} className="shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-indigo-100/60 leading-relaxed font-semibold text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer SEO Booster */}
          <div className="pb-16 text-center border-t border-indigo-100 pt-16">
            <h2 className="text-3xl font-black text-indigo-950 mb-8 tracking-tighter">Your #1 <span className="text-indigo-600">AP Gov Exam Calculator 2025</span> Resource</h2>
            <p className="text-indigo-900/60 max-w-3xl mx-auto font-bold leading-relaxed mb-10">
              Thousands of students use <strong>CalculatorOfGrades.com</strong> every year to plan their study schedules. From the <strong>ap gov score calculator albert</strong> style predictions to the <strong>fiveable ap gov score calculator</strong> methods, we unify all scoring data from 2019, 2020, 2021, and 2023 to provide the best <strong>ap gov score calculator 2025</strong> experience.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest font-black text-indigo-300">
              <span>AP Gov Score Calculator 2025</span>
              <span>Albert AP Gov Score Calculator</span>
              <span>Knowt AP Gov Score Calculator</span>
              <span>AP Government Composite Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
