import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  RotateCcw, 
  Save, 
  ChevronDown, 
  HelpCircle,
  TrendingUp,
  Settings,
  Scale
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { SEO } from '../components/SEO';
import { Tooltip } from '../components/Tooltip';
import { cn, getLetterGrade, formatNum, GRADES_US, GRADES_INDIA_CBSE } from '../lib/utils';

interface Assignment {
  id: string;
  name: string;
  grade: number;
  weight: number;
  maxPoints: number;
  receivedPoints: number;
}

const GradePage = ({ title = "Grade Calculator" }) => {
  const isPercentageMode = title.toLowerCase().includes('percentage');
  const [method, setMethod] = useState<'WEIGHTED' | 'SIMPLE'>(isPercentageMode ? 'SIMPLE' : 'WEIGHTED');
  const [inputMode, setInputMode] = useState<'PERCENT' | 'POINTS'>(isPercentageMode ? 'POINTS' : 'PERCENT');
  const [system, setSystem] = useState<'US' | 'INDIA'>('US');
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: isPercentageMode ? 'Quiz 1' : 'Quiz 1', grade: 85, weight: isPercentageMode ? 0 : 20, maxPoints: 100, receivedPoints: 85 },
  ]);

  const faqsData = isPercentageMode ? [
    { q: "How do I calculate 18 out of 25 as a percentage?", a: "To calculate 18 out of 25 as a percentage, divide 18 by 25 to get 0.72, then multiply by 100 to get 72.0%. It's a standard simple percentage calculation." },
    { q: "What is 12 out of 15 as a percentage?", a: "12 divided by 15 is 0.8, which is exactly 80.0%. In most US schools, this results in a B- grade." },
    { q: "How to calculate test percentage?", a: "Divide your earned points by the maximum possible points and multiply the result by 100. Our tool automates this for any test or quiz score." },
    { q: "What grade is 14 out of 20?", a: "14 out of 20 is 70.0%, which is typically a C- on the standard US grading scale." }
  ] : [
    { q: "Is this class grade calculator accurate for finals?", a: "Yes. Use the 'Weighted' mode to set your final exam's specific weight (e.g., 20%). It will calculate exactly how your final performance impacts your overall grade." },
    { q: "What's the difference between Simple and Weighted Average?", a: "Simple Average treats every assignment as equal. Weighted Average respects that a 'Midterm' usually counts for more than a 'Quiz'. Most US universities use Weighted Average." },
    { q: "How do I calculate 'points' grades (e.g. 18/25)?", a: "Switch the input mode to 'Points'. Enter your score and the max points possible. We'll instantly convert it to a percentage (72% in this case) and factor it into your grade." },
    { q: "Can I save my gradebook for multiple classes?", a: "By default, your data is saved in your browser. For tracking multiple classes or syncing across devices, stay tuned for our 'Academic Dashboard' update!" }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": isPercentageMode ? "Free Test Grade & Percentage Calculator" : "Professional Grade Calculator & Weighted Average Tool",
        "url": isPercentageMode ? "https://calculatorofgrades.vercel.app/percentage-calculator" : "https://calculatorofgrades.vercel.app/grade-calculator",
        "description": isPercentageMode 
          ? "Calculate your test score as a percentage instantly. Enter raw points to see your percentage grade and letter grade. Perfect for students and teachers."
          : "Calculate your grades with surgical precision using our free online grade calculator. Features include- weighted grade calculations, test score percentage tools, and detailed gradebook management for students and teachers.",
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

  const totalPossibleWeight = useMemo(() => assignments.reduce((acc, curr) => acc + curr.weight, 0), [assignments]);
  
  const currentGrade = useMemo(() => {
    if (assignments.length === 0) return 0;
    
    if (method === 'WEIGHTED') {
      const weightedSum = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.maxPoints > 0 ? (curr.receivedPoints / curr.maxPoints) * 100 : 0);
        return acc + (score * (curr.weight || 0));
      }, 0);
      return totalPossibleWeight > 0 ? weightedSum / totalPossibleWeight : 0;
    } else {
      const avg = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.maxPoints > 0 ? (curr.receivedPoints / curr.maxPoints) * 100 : 0);
        return acc + score;
      }, 0);
      return avg / assignments.length;
    }
  }, [assignments, method, inputMode, totalPossibleWeight]);

  const letterGrade = useMemo(() => getLetterGrade(currentGrade, system), [currentGrade, system]);

  const chartData = useMemo(() => [
    { name: 'Current', value: currentGrade },
    { name: 'Remaining', value: Math.max(0, 100 - currentGrade) },
  ], [currentGrade]);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { 
        id: crypto.randomUUID(), 
        name: `Assignment ${assignments.length + 1}`, 
        grade: 0, 
        weight: 0,
        maxPoints: 100,
        receivedPoints: 0
      }
    ]);
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: any) => {
    let sanitizedValue = value;
    if (typeof value === 'number') {
      if (field === 'grade' || field === 'weight' || field === 'receivedPoints') {
        sanitizedValue = Math.max(0, value);
      }
      if (field === 'maxPoints') {
        sanitizedValue = Math.max(1, value);
      }
    }
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: sanitizedValue } : a));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('CalculatorOfGrades Report Card', 20, 20);
    doc.setFontSize(14);
    doc.text(`Result: ${formatNum(currentGrade)}% (${letterGrade})`, 20, 35);
    doc.text(`Grading System: ${system === 'US' ? 'US 4.0' : 'Indian CBSE'}`, 20, 45);
    
    doc.line(20, 55, 190, 55);
    
    let y = 65;
    doc.text('Assignments:', 20, y);
    y += 10;
    assignments.forEach((a, i) => {
      doc.text(`${i+1}. ${a.name}: ${formatNum(a.grade)}% (Weight: ${a.weight}%)`, 25, y);
      y += 10;
    });
    
    doc.save('Calculator_Report.pdf');
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 pb-20">
      <SEO 
        title={`${title} | Free Academic Grading Tool`}
        description={`Calculate your grades with our free ${title} tool. Supports ${isPercentageMode ? 'test score percentages like 18 out of 25' : 'weighted global averages'} and detailed gradebook management for students.`}
        schema={schemaData}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white p-6 md:p-8 rounded-3xl border border-indigo-100/50 shadow-sm">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-indigo-950 mb-2 tracking-tight group flex items-center gap-3">
              {title} <span className="text-indigo-600">Expert.</span>
            </h1>
            <p className="text-indigo-950/70 font-bold text-sm md:text-base italic">Professional academic grade tracking for precise score calculations.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tooltip content="Switch between US 4.0 and Indian CBSE grading scales">
              <button 
                onClick={() => setSystem(system === 'US' ? 'INDIA' : 'US')}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-indigo-100"
              >
                <Scale size={16} /> {system === 'US' ? 'US Scale' : 'India Scale'}
              </button>
            </Tooltip>
            <Tooltip content="Download your progress as a professional PDF report">
              <button 
                onClick={exportPDF}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <Download size={16} /> Export PDF
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] border border-indigo-100 overflow-hidden shadow-sm">
              <div className="px-6 py-4 flex items-center justify-between border-b border-indigo-50">
                <div className="flex gap-4">
                   <Tooltip content="Calculate grade based on assignment weightage">
                    <button 
                      onClick={() => setMethod('WEIGHTED')}
                      className={cn("text-sm font-black px-4 py-2 rounded-xl transition-all", method === 'WEIGHTED' ? "bg-indigo-50 text-indigo-700" : "text-indigo-400 hover:text-indigo-900")}
                    >
                      Weighted
                    </button>
                   </Tooltip>
                   <Tooltip content="Calculate grade as simple mathematical average">
                    <button 
                      onClick={() => setMethod('SIMPLE')}
                      className={cn("text-sm font-black px-4 py-2 rounded-xl transition-all", method === 'SIMPLE' ? "bg-indigo-50 text-indigo-700" : "text-indigo-400 hover:text-indigo-900")}
                    >
                      Simple Avg
                    </button>
                   </Tooltip>
                </div>
                <div className="hidden sm:flex bg-indigo-50 p-1 rounded-xl border border-indigo-100">
                   <Tooltip content="Enter grades as direct percentages (0-100)">
                    <button 
                      onClick={() => setInputMode('PERCENT')}
                      className={cn("px-4 py-1.5 rounded-lg text-xs font-black transition-all", inputMode === 'PERCENT' ? "bg-white text-indigo-900 shadow-sm" : "text-indigo-400 hover:text-indigo-900")}
                    >
                      Percent (%)
                    </button>
                   </Tooltip>
                   <Tooltip content="Enter raw scores (e.g. 18 out of 25)">
                    <button 
                      onClick={() => setInputMode('POINTS')}
                      className={cn("px-4 py-1.5 rounded-lg text-xs font-black transition-all", inputMode === 'POINTS' ? "bg-white text-indigo-900 shadow-sm" : "text-indigo-400 hover:text-indigo-900")}
                    >
                      Points
                    </button>
                   </Tooltip>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-indigo-50/50 text-[10px] uppercase tracking-[0.2em] font-black text-indigo-900 border-b border-indigo-100">
                      <th className="px-6 py-5">Assignment Name</th>
                      <th className="px-6 py-5">
                        <Tooltip content={inputMode === 'PERCENT' ? 'The percentage you earned on this assignment' : 'Received Points / Maximum Points possible'}>
                          <span className="flex items-center gap-1">{inputMode === 'PERCENT' ? 'Grade (%)' : 'Points (R/M)'} <HelpCircle size={10} className="text-indigo-400" /></span>
                        </Tooltip>
                      </th>
                      {method === 'WEIGHTED' && (
                        <th className="px-6 py-5 text-center">
                          <Tooltip content="The weight of this assignment relative to 100% of your total grade">
                            <span className="flex items-center justify-center gap-1 mx-auto">Weight (%) <HelpCircle size={10} className="text-indigo-400" /></span>
                          </Tooltip>
                        </th>
                      )}
                      <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50">
                    <AnimatePresence initial={false}>
                      {assignments.map((a) => (
                        <motion.tr 
                          key={a.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, x: -20 }}
                          className="hover:bg-indigo-50/20 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <Tooltip content="Assignment or Exam title" className="w-full">
                              <input 
                                type="text" 
                                value={a.name}
                                onChange={(e) => updateAssignment(a.id, 'name', e.target.value)}
                                className="w-full bg-indigo-50/50 border-2 border-transparent focus:border-indigo-600 rounded-xl px-4 py-3 font-black text-indigo-950 text-sm outline-none transition-all shadow-inner"
                              />
                            </Tooltip>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {inputMode === 'PERCENT' ? (
                                <Tooltip content="Enter your grade as a percentage (0-100)">
                                  <input 
                                    type="number" 
                                    value={a.grade}
                                    onChange={(e) => updateAssignment(a.id, 'grade', Number(e.target.value))}
                                    className="w-24 px-4 py-3 bg-white border-2 border-indigo-200 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 text-indigo-950 outline-none hover:border-indigo-400 transition-all shadow-sm"
                                  />
                                </Tooltip>
                              ) : (
                                <>
                                  <Tooltip content="Points earned">
                                    <input 
                                      type="number" 
                                      value={a.receivedPoints}
                                      placeholder="Got"
                                      onChange={(e) => updateAssignment(a.id, 'receivedPoints', Number(e.target.value))}
                                      className="w-20 px-3 py-3 bg-white border-2 border-indigo-200 focus:border-indigo-600 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 text-indigo-950 outline-none transition-all shadow-sm"
                                    />
                                  </Tooltip>
                                  <span className="text-indigo-400 font-black text-xl">/</span>
                                  <Tooltip content="Total possible points">
                                    <input 
                                      type="number" 
                                      value={a.maxPoints}
                                      placeholder="Total"
                                      onChange={(e) => updateAssignment(a.id, 'maxPoints', Number(e.target.value))}
                                      className="w-20 px-3 py-3 bg-white border-2 border-indigo-200 focus:border-indigo-600 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 text-indigo-950 outline-none transition-all shadow-sm"
                                    />
                                  </Tooltip>
                                </>
                              )}
                            </div>
                          </td>
                          {method === 'WEIGHTED' && (
                            <td className="px-6 py-4 text-center">
                              <Tooltip content="Contribution to total grade (0-100)">
                                <input 
                                  type="number" 
                                  value={a.weight}
                                  onChange={(e) => updateAssignment(a.id, 'weight', Number(e.target.value))}
                                  className={cn(
                                    "w-24 px-4 py-3 bg-white border-2 rounded-xl text-sm font-mono font-black focus:ring-4 transition-all shadow-sm outline-none",
                                    totalPossibleWeight > 100 
                                      ? "border-red-300 text-red-600 focus:border-red-500 focus:ring-red-100" 
                                      : "border-indigo-200 text-indigo-950 focus:border-indigo-600 focus:ring-indigo-100"
                                  )}
                                />
                              </Tooltip>
                            </td>
                          )}
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => removeAssignment(a.id)}
                              className="p-2 text-indigo-300 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-indigo-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Tooltip content="Add a new row for your assignments or exams" className="w-full sm:w-auto">
                  <button 
                    onClick={addAssignment}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    <Plus size={18} /> Add Assignment
                  </button>
                </Tooltip>
                {method === 'WEIGHTED' && (
                  <div className={cn(
                    "text-xs font-black px-6 py-3 rounded-2xl shadow-sm border",
                    totalPossibleWeight === 100 ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-orange-50 text-orange-700 border-orange-100"
                  )}>
                    Total Weight: {totalPossibleWeight}% {totalPossibleWeight !== 100 && "(MUST BE 100%)"}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed SEO Long-form Content Section */}
            <div className="bg-white rounded-[32px] border border-indigo-50 p-10 shadow-sm space-y-12">
               <div className="prose max-w-none">
                  <h2 className="text-4xl font-black tracking-tight text-indigo-950 mb-6">
                    {isPercentageMode ? "Expert Percentage Calculator for Grading" : "Professional Grade Calculator & Online Gradebook"}
                  </h2>
                  <p className="text-lg text-indigo-950/80 leading-relaxed font-black">
                    {isPercentageMode 
                      ? "Need to find your test score fast? Our **percentage grades calculator** is the ultimate tool for students and teachers. Whether you're calculating **18 out of 25 percentage** or **12 out of 15 percentage**, our **grading calculator percentage** engine provides instant results."
                      : "Searching for a reliable **grade calculator** to track your academic performance? Whether you need a **test grade calculator** for a single exam or a comprehensive **class grade calculator** for the entire semester, our platform provides professional-grade accuracy."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                     <div className="not-prose p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950">Common Test Percentage Results</h3>
                        <ul className="space-y-4 text-sm font-bold text-indigo-800/60">
                           <li className="flex justify-between"><span>18 out of 25 percentage:</span> <span className="text-indigo-600 font-black">72.0% (C-)</span></li>
                           <li className="flex justify-between"><span>12 out of 15 percentage:</span> <span className="text-indigo-600 font-black">80.0% (B-)</span></li>
                           <li className="flex justify-between"><span>13 out of 20 percentage:</span> <span className="text-indigo-600 font-black">65.0% (D)</span></li>
                           <li className="flex justify-between"><span>14 out of 20 percentage:</span> <span className="text-indigo-600 font-black">70.0% (C-)</span></li>
                           <li className="flex justify-between"><span>29 out of 35 as a percentage:</span> <span className="text-indigo-600 font-black">82.9% (B)</span></li>
                           <li className="flex justify-between"><span>12 out of 20:</span> <span className="text-indigo-600 font-black">60.0% (D-)</span></li>
                           <li className="flex justify-between"><span>16 out of 20 percentage:</span> <span className="text-indigo-600 font-black">80.0% (B-)</span></li>
                        </ul>
                     </div>
                     <div className="not-prose p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950">The Best Marking Calculator Online</h3>
                        <p className="text-sm font-semibold leading-relaxed text-indigo-800/60">
                           Our **marking calculator** and **scoring a test calculator** are used worldwide. This **grading percentage calculator** supports both simple and weighted averages, giving you a full **my grades calculator** experience.
                        </p>
                     </div>
                  </div>

                  <h3 className="text-2xl font-black text-indigo-950 mt-12 mb-6">Expert Grading Cal & Calculator of Grades</h3>
                  <p className="text-indigo-800/60 leading-relaxed font-semibold">
                    Our platform is more than just a **calculator for grades**; it is a full **online gradebook calculator**. Designed for flexibility, it supports multiple input modes. If you are a teacher looking for an **easy grader**, simply switch to the "Points" mode to calculate test score percentages instantly.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">1. Grading Calculator Online</h4>
                      <p className="text-xs text-indigo-900/70 font-bold leading-relaxed">Calculate class grades where certain items have different weights.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">2. Gradebook Calculator Online</h4>
                      <p className="text-xs text-indigo-900/70 font-bold leading-relaxed">Convert raw points (e.g. 18/25) into percentages and letter grades for quick feedback.</p>
                    </div>
                  </div>
                  <p className="text-indigo-800/60 leading-relaxed font-semibold leading-[1.8]">
                    1. **Grades Calculator**: Use this if all assignments have the same weight. <br/>
                    2. **Grading Cal**: Best for college courses where finals carry more weight. <br/>
                    3. **Scoring a Test Calculator**: Quickly find out your score by entering raw points. <br/>
                    4. **PDF Gradebook**: Generate a report to share with parents or teachers.
                  </p>

                  <div className="not-prose mt-12 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                    <h4 className="font-black text-indigo-950 mb-4">Related Academic Tools:</h4>
                    <div className="flex flex-wrap gap-4 text-sm font-black">
                      <Link to="/gpa-calculator" className="text-indigo-600 hover:underline">GPA Calculator</Link>
                      <span className="text-indigo-300">•</span>
                      <Link to="/gpa-calculator" className="text-indigo-600 hover:underline">Calculator of CGPA</Link>
                      <span className="text-indigo-300">•</span>
                      <Link to="/final-grade-predictor" className="text-indigo-600 hover:underline">Final Grade Predictor</Link>
                      <span className="text-indigo-300">•</span>
                      <Link to="/percentage-calculator" className="text-indigo-600 hover:underline">Percentage Tool</Link>
                      <span className="text-indigo-300">•</span>
                      <Link to="/faq" className="text-indigo-600 hover:underline">Grading FAQ</Link>
                    </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-indigo-50">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-indigo-950">
                    <HelpCircle className="text-indigo-600" /> Frequently Asked Questions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {faqsData.map((faq, i) => (
                        <div key={i} className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
                          <h4 className="font-black text-indigo-950 mb-3">{faq.q}</h4>
                          <p className="text-sm text-indigo-950/80 font-bold leading-relaxed">{faq.a}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] border border-indigo-100 p-8 shadow-2xl shadow-indigo-900/5 sticky top-24">
              <div className="text-center mb-8">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Current Results</div>
                <div className="text-8xl font-black text-indigo-600 mb-4 leading-none tracking-tighter">
                  {formatNum(currentGrade)}<span className="text-4xl opacity-40">%</span>
                </div>
                <div className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-50 text-indigo-700 rounded-2xl text-2xl font-black shadow-inner">
                   GRADE: {letterGrade}
                </div>
              </div>

              <div className="h-56 w-full mb-8 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#6366f1" />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <TrendingUp className="text-indigo-600 opacity-20 mb-2" size={48} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Projected</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setAssignments([])}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl font-black text-sm transition-all border border-indigo-100"
                >
                  <RotateCcw size={18} /> Reset Data
                </button>
                <button className="w-full flex items-center justify-center gap-3 py-5 border-2 border-indigo-50 hover:border-indigo-500/50 text-indigo-900 rounded-2xl font-black text-sm transition-all group">
                  <Share2 size={18} className="group-hover:text-indigo-600" /> Share Live
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-indigo-50">
                <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6">Scale Distribution</h4>
                <div className="space-y-4">
                  {(system === 'US' ? GRADES_US : GRADES_INDIA_CBSE).slice(0, 5).map(g => (
                    <div key={g.label} className="flex justify-between items-center text-xs">
                      <span className="font-black text-indigo-950 w-8">{g.label}</span>
                      <div className="flex-1 mx-4 h-2 bg-indigo-50 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 opacity-60" style={{ width: `${g.min}%` }} />
                      </div>
                      <span className="font-mono font-bold text-indigo-700">{g.min}%+</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pro Sidebar */}
            <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="font-black text-2xl mb-3 tracking-tight">Go Pro</h4>
                 <p className="text-indigo-100 text-sm mb-8 font-medium leading-relaxed">Save reports to cloud, track multiple semesters, and get AI grade predictions.</p>
                 <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-xl active:scale-95">
                    Unlock Premium
                 </button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for dark mode detection within component
function isDark() {
  return document.documentElement.classList.contains('dark');
}

export default GradePage;
