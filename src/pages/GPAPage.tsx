import React, { useState, useMemo } from 'react';
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
import { cn, formatNum, GRADES_US } from '../lib/utils';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GPAPage = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics', grade: 'A', credits: 4 },
    { id: '2', name: 'History', grade: 'B+', credits: 3 },
  ]);

  const gradeValues: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalPoints += (gradeValues[c.grade] || 0) * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [courses]);

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', grade: 'A', credits: 3 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 pb-20">
      <SEO 
        title="GPA Calculator - Free College & High School Tool"
        description="Calculate your semester and cumulative GPA with our free GPA calculator. Supports weighted and unweighted scales."
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="bg-white p-6 md:p-8 rounded-[40px] border border-indigo-100 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto pb-8 border-b border-indigo-50 mb-8">
             <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4 border border-indigo-200 shadow-sm transition-transform hover:rotate-6">
                <GraduationCap size={28} />
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-indigo-950 mb-4 tracking-tighter transition-all hover:scale-105 duration-300">GPA <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Quest</span></h1>
             <p className="text-indigo-950 font-black uppercase tracking-widest text-[10px] md:text-xs">Join 50,000+ students tracking academic progress.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
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
                            <div className="mt-12 p-8 bg-indigo-50 rounded-[32px] border border-indigo-100">
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3 tracking-tight text-indigo-950">
                    <Info className="text-indigo-600" size={24} /> Calculation Guide
                 </h3>
                 <p className="text-indigo-900 text-sm leading-relaxed mb-8 font-bold">
                    GPA (Grade Point Average) represents the average value of accumulated grades. We calculate this by dividing total grade points by total credits attempted.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-3xl border border-indigo-100 shadow-sm transition-transform hover:scale-105">
                       <h4 className="font-black text-indigo-950 mb-2 text-sm uppercase tracking-widest">Standard 4.0</h4>
                       <p className="text-xs text-indigo-900 font-bold leading-relaxed">Used by most US schools. A = 4, B = 3, C = 2, D = 1, F = 0.</p>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-indigo-100 shadow-sm transition-transform hover:scale-105">
                       <h4 className="font-black text-indigo-950 mb-2 text-sm uppercase tracking-widest">Weighted GPA</h4>
                       <p className="text-xs text-indigo-900 font-bold leading-relaxed">AP/IB courses often add +1.0 point (A = 5.0) for difficulty.</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-indigo-600 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[48px] p-12 text-white text-center shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-100 mb-6 font-mono">ESTIMATED GPA</div>
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
