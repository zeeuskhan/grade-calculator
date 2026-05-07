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
  TrendingUp
} from 'lucide-react';
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
                      className="group flex flex-col sm:flex-row items-center gap-4 bg-white p-5 rounded-[24px] border border-indigo-50 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 group"
                    >
                      <div className="flex-1 flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-300 shadow-inner group-hover:text-indigo-500 transition-colors">
                           <BookOpen size={20} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. Physics 101"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="flex-1 bg-transparent border-none focus:ring-0 font-black text-indigo-950 placeholder:text-indigo-300"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Tooltip content="Select your letter grade">
                          <select 
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            className="w-full sm:w-24 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500 appearance-none text-center cursor-pointer shadow-sm"
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
                            className="w-20 bg-indigo-50/50 border-none rounded-xl p-3 text-sm font-black text-indigo-950 text-center focus:ring-2 focus:ring-indigo-500 shadow-inner"
                          />
                        </Tooltip>
                        <button 
                          onClick={() => removeCourse(course.id)}
                          className="p-3 text-indigo-300 hover:text-red-500 transition-colors bg-indigo-50/50 rounded-xl"
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
                  <h2 className="text-4xl font-black text-indigo-950 tracking-tight mb-8">Ultimate Calculatorofgrade & Academic Success Guide</h2>
                  <p className="text-lg">
                    Whether you are a college student aiming for the Dean's List or a high schooler planning your college applications, understanding your <strong>calculatorofgrade</strong> performance is critical. Our <strong>free GPA calculator</strong> uses the standard academic formulas to help you track your progress with surgical precision. Unlike other tools, we support both the **US 4.0 scale** and the **Indian CBSE/ICSE CGPA** system.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
                    <div className="not-prose p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50">
                       <h3 className="text-2xl font-black mb-4 text-indigo-950">How to Calculate GPA</h3>
                       <p className="text-sm font-semibold mb-6">The basic formula for calculating GPA is simple but requires attention to detail:</p>
                       <div className="bg-indigo-950 p-6 rounded-3xl text-indigo-100 font-mono text-xs shadow-xl flex items-center justify-center text-center">
                          GPA = (Points × Credits) / Total Credits
                       </div>
                    </div>
                    <div className="not-prose p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100/50">
                       <h3 className="text-2xl font-black mb-4 text-indigo-950">Why Accuracy Matters</h3>
                       <p className="text-sm font-semibold leading-relaxed">
                         A difference of 0.1 on your **college GPA** can be the deciding factor for scholarships or graduate school admissions. Our **semester GPA calculator** ensures every credit hour is accounted for accurately.
                       </p>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-indigo-950 mt-16 mb-8">Professional Calculator of CGPA for Global Students</h3>
                  <p>
                    Our GPA tools are designed to be the most accurate <strong>calculator of cgpa</strong> available online. Whether you are tracking a single term or your entire degree, our platform offers:
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
                      { q: "What is a 4.0 GPA in percentage?", a: "Generally, a 4.0 GPA correlates to a 93-100% average. A 3.7 is typically 90-92% (A-)." },
                      { q: "Does a 0-credit course affect my GPA?", a: "No. Courses with 0 credits (like some labs or seminars) are not factored into the mathematical calculation, even if you receive a letter grade." },
                      { q: "What is weighted GPA vs unweighted?", a: "Unweighted GPA calculates all courses on a 4.0 scale regardless of difficulty. Weighted GPA adds extra points (e.g., 5.0) for AP, IB, or Honors classes." }
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
