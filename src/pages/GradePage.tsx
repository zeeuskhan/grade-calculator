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
  const [method, setMethod] = useState<'WEIGHTED' | 'SIMPLE'>('WEIGHTED');
  const [inputMode, setInputMode] = useState<'PERCENT' | 'POINTS'>('PERCENT');
  const [system, setSystem] = useState<'US' | 'INDIA'>('US');
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Quiz 1', grade: 85, weight: 20, maxPoints: 100, receivedPoints: 85 },
    { id: '2', name: 'Midterm', grade: 92, weight: 30, maxPoints: 100, receivedPoints: 92 },
  ]);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Professional Grade Calculator & Weighted Average Tool",
        "url": "https://calculatorofgrades.vercel.app/grade-calculator",
        "description": "Calculate your grades with surgical precision using our free online grade calculator. Features include- weighted grade calculations, test score percentage tools, and detailed gradebook management for students and teachers.",
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
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to calculate grades manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your grade, divide the total points earned by the total points possible. Then, multiply by 100 to get a percentage. For weighted grades, multiply each grade by its weight percentage."
            }
          },
          {
            "@type": "Question",
            "name": "What is a test grade calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A test grade calculator is a tool used to determine the percentage score on an exam based on the number of correct answers and the total number of questions. It helps students understand their standing instantly."
            }
          },
          {
            "@type": "Question",
            "name": "What is 18 out of 25 as a percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "18 out of 25 is exactly 72%. In the standard US grading scale, this is a C-."
            }
          },
          {
            "@type": "Question",
            "name": "How to calculate weighted average grade?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Multiply each assignment's percentage by its weight (as a decimal), sum these products together, and then divide by the total weight (usually 1 or 100%)."
            }
          }
        ]
      }
    ]
  };

  const totalPossibleWeight = useMemo(() => assignments.reduce((acc, curr) => acc + curr.weight, 0), [assignments]);
  
  const currentGrade = useMemo(() => {
    if (assignments.length === 0) return 0;
    
    if (method === 'WEIGHTED') {
      const weightedSum = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.receivedPoints / curr.maxPoints) * 100;
        return acc + (score * curr.weight);
      }, 0);
      return totalPossibleWeight > 0 ? weightedSum / totalPossibleWeight : 0;
    } else {
      const avg = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.receivedPoints / curr.maxPoints) * 100;
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
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
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
        title="Grade Calculator | Final Grade & Weighted Average Calculator"
        description="The #1 Grade Calculator for students. Calculate test scores, weighted averages, and class grades. Support for 18 out of 25 percentage and college grading scales."
        schema={schemaData}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white p-6 md:p-8 rounded-3xl border border-indigo-100/50 shadow-sm">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-indigo-950 mb-2 tracking-tight">{title}</h1>
            <p className="text-indigo-950/70 font-bold text-sm md:text-base">Add your assignments below to see your real-time academic results.</p>
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
                                className="w-full bg-transparent border-none focus:ring-0 font-black text-indigo-950 text-sm"
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
                                    className="w-20 px-3 py-2 bg-indigo-50/50 border-none rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-indigo-500 text-indigo-950"
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
                                      className="w-16 px-2 py-2 bg-indigo-50/50 border border-transparent focus:border-indigo-500 rounded-xl text-sm font-mono font-black focus:ring-0 text-indigo-950"
                                    />
                                  </Tooltip>
                                  <span className="text-indigo-400 font-black">/</span>
                                  <Tooltip content="Total possible points">
                                    <input 
                                      type="number" 
                                      value={a.maxPoints}
                                      placeholder="Total"
                                      onChange={(e) => updateAssignment(a.id, 'maxPoints', Number(e.target.value))}
                                      className="w-16 px-2 py-2 bg-indigo-50/50 border border-transparent focus:border-indigo-500 rounded-xl text-sm font-mono font-black focus:ring-0 text-indigo-950"
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
                                    "w-20 px-3 py-2 bg-indigo-50/50 border-none rounded-xl text-sm font-mono font-bold focus:ring-2 text-indigo-950",
                                    totalPossibleWeight > 100 ? "text-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
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
                  <h2 className="text-4xl font-black tracking-tight text-indigo-950 mb-6">Expert Grade Calculator & Test Scoring Tool</h2>
                  <p className="text-lg text-indigo-950/80 leading-relaxed font-black">
                    Searching for a reliable **grade calculator** to track your academic performance? Whether you need a **test grade calculator** for a single exam or a comprehensive **class grade calculator** for the entire semester, our platform provides professional-grade accuracy. We simplify complex math like **weighted averages** and **percentage conversions** so you can focus on studying.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                     <div className="not-prose p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950">Test Score Percentage</h3>
                        <ul className="space-y-4 text-sm font-bold text-indigo-800/60">
                           <li className="flex justify-between"><span>18 out of 25:</span> <span className="text-indigo-600">72.0% (C-)</span></li>
                           <li className="flex justify-between"><span>45 out of 50:</span> <span className="text-indigo-600">90.0% (A-)</span></li>
                           <li className="flex justify-between"><span>12 out of 15:</span> <span className="text-indigo-600">80.0% (B-)</span></li>
                           <li className="flex justify-between"><span>13 out of 20:</span> <span className="text-indigo-600">65.0% (D)</span></li>
                           <li className="flex justify-between"><span>29 out of 35:</span> <span className="text-indigo-600">82.9% (B)</span></li>
                        </ul>
                     </div>
                     <div className="not-prose p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950">Why Use Our Marker Calculator?</h3>
                        <p className="text-sm font-semibold leading-relaxed text-indigo-800/60">
                           Our **marking calculator** is used by teachers and students alike to verify scores. Unlike basic **online grade calculators**, we support multiple grading systems (US 4.0 and CBSE) and provide an **online gradebook calculator** experience that tracks your progress in real-time.
                        </p>
                     </div>
                  </div>

                  <h3 className="text-2xl font-black text-indigo-950 mt-12 mb-6">How to Calculate a Weighted Grade</h3>
                  <p className="text-indigo-950/70 leading-relaxed font-bold mb-6">
                    Calculating a weighted grade manually can be tricky. Here is the formula our **weighted grade calculator** uses:
                  </p>
                  <div className="not-prose bg-indigo-950 p-6 rounded-2xl text-indigo-100 font-mono text-sm shadow-xl mb-6 text-center">
                    (Score 1 × Weight 1) + (Score 2 × Weight 2) + ... [Divide by Total Weight]
                  </div>

                  <h3 className="text-2xl font-black text-indigo-950 mt-12 mb-6">The Best Free Calculator for Grading</h3>
                  <p className="text-indigo-800/60 leading-relaxed font-semibold">
                    1. **Simple Grade Average**: Use this mode if all assignments have the same weight. Just enter your scores. <br/>
                    2. **Weighted Assignment Calculator**: Best for college courses where finals and labs carry more weight. <br/>
                    3. **Test Grade & Easy Grader**: Quickly find out your score by entering raw points. <br/>
                    4. **PDF Export**: Generate a report to share with parents or teachers.
                  </p>

                  <div className="not-prose mt-12 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                    <h4 className="font-black text-indigo-950 mb-4">Related Academic Tools:</h4>
                    <div className="flex flex-wrap gap-4 text-sm font-black">
                      <Link to="/gpa-calculator" className="text-indigo-600 hover:underline">GPA Calculator</Link>
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
                     {[
                       { q: "Is this grading calculator free?", a: "Yes, our site offers a 100% free online gradebook calculator for all students." },
                       { q: "Can I use this for university grades?", a: "Absolutely. Our tools support US GPA (4.0) and custom weighted scales used in universities." },
                       { q: "How do I calculate 18 out of 25 as a percentage?", a: "18 divided by 25 equals 0.72, which is 72.0%. In most US schools, this is a C-." },
                       { q: "What is a 'calculator of grades' used for?", a: "It's used by teachers and students to track progress, predict final outcomes, and manage classroom scores." }
                     ].map((faq, i) => (
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
