import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  GraduationCap, 
  Calculator, 
  Download, 
  History,
  Info,
  ChevronDown,
  BookOpen,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Tooltip } from '../components/Tooltip';
import { cn, formatNum, GRADES_US, GRADES_INDIA_CBSE } from '../lib/utils';

type ScaleSystem = 'US' | 'INDIA';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GPAPage = () => {
  const [scale, setScale] = useState<ScaleSystem>('US');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics', grade: 'A', credits: 4 },
    { id: '2', name: 'History', grade: 'B+', credits: 3 },
  ]);

  const gradeValues = useMemo(() => {
    if (scale === 'US') {
      return GRADES_US.reduce((acc, curr) => ({ ...acc, [curr.label]: curr.gpa }), {} as Record<string, number>);
    } else {
      return GRADES_INDIA_CBSE.reduce((acc, curr) => ({ ...acc, [curr.label]: curr.gp! }), {} as Record<string, number>);
    }
  }, [scale]);

  // Adjust default grades when scale changes
  useEffect(() => {
    const defaultGrade = scale === 'US' ? 'A' : 'A1';
    setCourses(prev => prev.map(c => ({
      ...c,
      grade: gradeValues[c.grade] !== undefined ? c.grade : defaultGrade
    })));
  }, [scale, gradeValues]);

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalPoints += (gradeValues[c.grade] || 0) * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [courses, gradeValues]);

  const addCourse = () => {
    const defaultGrade = scale === 'US' ? 'A' : 'A1';
    setCourses([...courses, { id: crypto.randomUUID(), name: '', grade: defaultGrade, credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    let sanitizedValue = value;
    if (field === 'credits') {
      sanitizedValue = Math.max(0, Number(value));
    }
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: sanitizedValue } : c));
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Professional College & High School GPA Calculator & CGPA Tool",
        "url": "https://calculatorofgrades.vercel.app/gpa-calculator",
        "description": "Calculate your semester and cumulative GPA with our free GPA calculator and calculator of cgpa. Supports weighted and unweighted scales, custom credit hours, and more.",
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
            "name": "How to calculate GPA manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate GPA, multiply your grade points for each course by its credit hours. Sum these products and then divide by the total number of credits attempted."
            }
          },
          {
            "@type": "Question",
            "name": "What is a 4.0 GPA scale?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 4.0 scale is the standard US grading system where an A is 4.0, B is 3.0, C is 2.0, D is 1.0, and F is 0.0. AP or IB courses may add weight (up to 5.0)."
            }
          },
          {
            "@type": "Question",
            "name": "What is CGPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CGPA stands for Cumulative Grade Point Average. It is the mean of the GPA obtained in all subjects over multiple semesters or years."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 pb-20">
      <SEO 
        title="GPA Calculator | Professional Calculator of CGPA & GPA"
        description="Calculate your semester GPA and cumulative CGPA with our free academic suite. The most accurate calculator of cgpa for college and school students."
        schema={schemaData}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-indigo-100 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto pb-8 border-b border-indigo-50 mb-8">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4 border border-indigo-200 shadow-sm transition-transform hover:rotate-6">
                <GraduationCap size={28} />
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tighter transition-all hover:scale-105 duration-300">The Ultimate <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Calculator of CGPA</span></h1>
             <p className="text-indigo-950 font-black uppercase tracking-widest text-[10px] md:text-xs">Professional calculator of cgpa suite for academic tracking.</p>
             
             {/* Scale Toggle */}
             <div className="inline-flex bg-indigo-50 p-1 rounded-2xl border border-indigo-100">
               <button
                 onClick={() => setScale('US')}
                 className={cn(
                   "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                   scale === 'US' ? "bg-white text-indigo-600 shadow-sm shadow-indigo-200" : "text-indigo-400 hover:text-indigo-600"
                 )}
               >
                 US 4.0 Scale
               </button>
               <button
                 onClick={() => setScale('INDIA')}
                 className={cn(
                   "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                   scale === 'INDIA' ? "bg-white text-indigo-600 shadow-sm shadow-indigo-200" : "text-indigo-400 hover:text-indigo-600"
                 )}
               >
                 Indian CBSE
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-8">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900">Course Name</h3>
                   <div className="flex gap-16">
                      <Tooltip content="Final letter grade received for the course">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900 w-24 text-center">Grade</h3>
                      </Tooltip>
                      <Tooltip content="The credit weight/hours assigned to this course">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900 w-16 text-center">Credits</h3>
                      </Tooltip>
                   </div>
                </div>

                <AnimatePresence initial={false}>
                  {courses.map((course) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col sm:flex-row items-center gap-4 bg-white p-5 rounded-[24px] border-2 border-indigo-50 hover:border-indigo-500/50 transition-all shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 group"
                    >
                      <div className="flex-1 flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                           <BookOpen size={20} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. Physics 101"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="flex-1 bg-indigo-50/30 border-2 border-transparent focus:border-indigo-500 rounded-xl px-4 py-3 font-black text-indigo-950 placeholder:text-indigo-300 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Tooltip content="Select your letter grade">
                          <select 
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            className="w-full sm:w-28 bg-white border-2 border-indigo-200 rounded-xl p-3 text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 appearance-none text-center cursor-pointer shadow-sm outline-none hover:border-indigo-400 transition-all"
                          >
                            {Object.keys(gradeValues).map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </Tooltip>
                        <Tooltip content="Credit hours (e.g. 3.0)">
                          <input 
                            type="number" 
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, 'credits', Math.max(0, Number(e.target.value)))}
                            className="w-24 bg-white border-2 border-indigo-200 rounded-xl p-3 text-sm font-black text-indigo-950 text-center focus:ring-4 focus:ring-indigo-100 shadow-sm outline-none hover:border-indigo-400 transition-all"
                          />
                        </Tooltip>
                        <button 
                          onClick={() => removeCourse(course.id)}
                          className="p-3 text-indigo-400 hover:text-white hover:bg-red-500 transition-all bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Tooltip content="Add another course to your GPA calculation" className="w-full">
                  <button 
                    onClick={addCourse}
                    className="w-full flex items-center justify-center gap-3 p-8 border-2 border-dashed border-indigo-100 hover:border-indigo-500/50 hover:bg-indigo-50/50 rounded-[32px] text-indigo-300 font-black transition-all group active:scale-95 shadow-sm"
                  >
                    <Plus size={24} className="group-hover:text-indigo-600" /> 
                    <span className="group-hover:text-indigo-950 uppercase tracking-widest text-xs">Add New Course Row</span>
                  </button>
                </Tooltip>
              </div>
                              <div className="bg-white rounded-[48px] border border-indigo-50 p-10 md:p-16 shadow-sm space-y-16">
                <div className="prose prose-indigo max-w-none font-bold text-indigo-950/80 leading-relaxed">
                  <h2 className="text-4xl font-black text-indigo-950 tracking-tight mb-8">Ultimate Calculator of CGPA & Academic Success Guide</h2>
                  <p className="text-lg">
                    Whether you are a college student aiming for the Dean's List or a high schooler planning your college applications, understanding your <strong>calculator of cgpa</strong> performance is critical. Our <strong>free GPA calculator</strong> handles complex conversions including <strong>calculate cgpa cbse</strong> and <strong>calculate cgpa ktu</strong> with professional accuracy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
                    <div className="not-prose p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50">
                       <h3 className="text-2xl font-black mb-4 text-indigo-950">Calculate CGPA Formula</h3>
                       <p className="text-sm font-semibold mb-6">The basic formula for <strong>calculate cgpa from marks</strong> or grades is:</p>
                       <div className="bg-indigo-950 p-6 rounded-3xl text-indigo-100 font-mono text-xs shadow-xl flex items-center justify-center text-center">
                          CGPA = (Sum of Grade Points) / Total Subjects
                       </div>
                    </div>
                    <div className="not-prose p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50">
                       <h3 className="text-2xl font-black mb-4 text-indigo-950">CGPA to Percentage Calculator</h3>
                       <p className="text-sm font-semibold leading-relaxed">
                         Need to find <strong>8 cgpa in percentage</strong>? In CBSE, the formula is (CGPA × 9.5). This means 8 CGPA is 76%, and <strong>8.2cgpa in percentage</strong> is 77.9%.
                       </p>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-indigo-950 mt-16 mb-8">Professional Calculator of CGPA for Engineering & Global Students</h3>
                  <p>
                    Our tools are designed to be the leading <strong>calculate cgpa online</strong> resource for various boards and universities:
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">Engineering & Tech</h4>
                      <p className="text-[10px] text-indigo-900/70 font-bold leading-relaxed">Specific support for KTU, SPPU, and standard 10-pointer engineering scales.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">Calculate CGPA from Grades</h4>
                      <p className="text-[10px] text-indigo-900/70 font-bold leading-relaxed">Instantly convert letter grades (A+, A, B) into a cumulative pointer.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">CGPA Table Online</h4>
                      <p className="text-[10px] text-indigo-900/70 font-bold leading-relaxed">View common values like <strong>6 cgpa in percentage</strong> (57%) or <strong>5 cgpa in percentage</strong> (47.5%).</p>
                    </div>
                  </div>

                  <div className="not-prose mt-12 p-10 bg-indigo-950 rounded-[40px] text-white">
                    <h3 className="text-2xl font-black mb-6">CGPA to Percentage Quick Conversion Table</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>9.8 CGPA to Percentage</span> <span className="font-mono text-indigo-400">93.1%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>9.5 CGPA in Percentage</span> <span className="font-mono text-indigo-400">90.25%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>9.0 CGPA in Percentage</span> <span className="font-mono text-indigo-400">85.5%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>85 to CGPA</span> <span className="font-mono text-indigo-400">8.95</span></div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>8.2 CGPA to Percentage</span> <span className="font-mono text-indigo-400">77.9%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>8.0 CGPA to Percentage</span> <span className="font-mono text-indigo-400">76.0%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>6.0 CGPA in Percentage</span> <span className="font-mono text-indigo-400">57.0%</span></div>
                            <div className="flex justify-between border-b border-indigo-800 pb-2"><span>84 Percent in CGPA</span> <span className="font-mono text-indigo-400">8.84</span></div>
                        </div>
                    </div>
                  </div>

                  <p className="mt-8">
                    Our <strong>calculate cgpa cbse</strong> engine uses the official 9.5 multiplier for percentage conversion. For engineering students (KTU, SPPU), please use our credit-weighted mode to ensure accuracy for each semester.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">My Grades Calculator</h4>
                      <p className="text-xs text-indigo-900/70 font-bold leading-relaxed">Keep track of your individual semester performance with our clean and fast interface.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <h4 className="font-black text-indigo-950 mb-2">Calculator of Grades</h4>
                      <p className="text-xs text-indigo-900/70 font-bold leading-relaxed">The ultimate suite for all your scoring needs, including test percentages and final exam predictions.</p>
                    </div>
                  </div>
                  <p className="mt-8">
                    Our tool works as both a **semester GPA calculator** and a **cumulative GPA tool**. Simply group your courses by year and input them to see your overall standing.
                  </p>

                  <h3 className="text-3xl font-black text-indigo-950 mt-16 mb-8">Frequently Asked Questions</h3>
                  <div className="not-prose space-y-6">
                    {[
                      { q: "How is my US GPA actually calculated?", a: "We use the weighted average method: (Grade Points × Credits) / Total Credits. An 'A' in a 4-credit course has more impact than an 'A' in a 1-credit lab. Our tool handles this weightage automatically!" },
                      { q: "What's the difference between Weighted and Unweighted?", a: "Unweighted GPA scales everyone on a 4.0 max. Weighted GPA (often up to 5.0) rewards you for taking tougher classes like AP, IB, or Honors. You can simulate both by adjusting your grade values here." },
                      { q: "How do I calculate my cumulative GPA (all semesters)?", a: "To find your overall CGPA, simply add all your courses from every semester into the list. The tool will calculate the total weighted average across your entire academic history." },
                      { q: "Is a 3.5 GPA good for US college admissions?", a: "A 3.5 is a solid 'B+/A-' average. While 'good' depends on your target school, most selective US universities look for a 3.5 or higher. Use our tool to see how one more 'A' can boost your standing!" },
                      { q: "Does this support the Indian CBSE 9.5 multiplier?", a: "Yes! If you switch to the India Scale, we use the official (CGPA × 9.5) formula to give you your percentage equivalent, perfect for study abroad applications." },
                      { q: "Can I export this for my common app or resume?", a: "Definitely. Click 'Export Sheet' to get a clean PDF or CSV. It's a great way to double-check the 'Self-Reported Academic Record' (SRAR) section of your college applications." }
                    ].map((faq, i) => (
                      <div key={i} className="p-8 bg-white border border-indigo-100 rounded-[32px] shadow-sm">
                        <h4 className="font-black text-indigo-950 mb-3">{faq.q}</h4>
                        <p className="text-sm text-indigo-800 font-bold leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 p-10 bg-indigo-600 rounded-[40px] text-white shadow-2xl shadow-indigo-500/20">
                    <h3 className="text-2xl font-black mb-4">Ready to reach your target GPA?</h3>
                    <p className="text-indigo-100 mb-8 font-medium">Use our Final Grade Predictor to see what scores you need on your remaining exams to hit your goal.</p>
                    <Link to="/final-grade-predictor" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all">
                      Try Final Grade Predictor
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-indigo-600 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[48px] p-12 text-white text-center shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-100 mb-6 font-mono">
                      {scale === 'US' ? 'ESTIMATED GPA' : 'ESTIMATED CGPA'}
                    </div>
                    <div className="text-9xl font-black mb-6 tracking-tighter transition-transform group-hover:scale-110 duration-700">
                      {formatNum(gpa)}
                    </div>
                    <div className="text-sm font-bold text-indigo-50/80 uppercase tracking-widest">
                      {courses.reduce((a,b) => a + b.credits, 0)} TOTAL CREDITS
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="bg-white rounded-[32px] border border-indigo-100 p-8 space-y-4 shadow-sm">
                   <Tooltip content="Cloud storage for your academic record (Pro)" className="w-full">
                     <button className="w-full py-5 bg-indigo-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                        Save to History
                     </button>
                   </Tooltip>
                   <Tooltip content="Export your GPA sheet to CSV or PDF" className="w-full">
                     <button className="w-full py-5 bg-white border-2 border-indigo-50 text-indigo-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 group">
                        <Download size={20} className="group-hover:text-indigo-600" /> Export Sheet
                     </button>
                   </Tooltip>
                </div>

                <div className="bg-indigo-50 border border-indigo-100/50 rounded-[32px] p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                        <TrendingUp size={20} />
                     </div>
                     <div>
                        <h4 className="font-black text-indigo-900 text-sm mb-1">Performance Insight</h4>
                        <p className="text-xs text-indigo-800/70 font-semibold leading-relaxed">Keep it up! Your GPA is tracking well for this semester.</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPAPage;
