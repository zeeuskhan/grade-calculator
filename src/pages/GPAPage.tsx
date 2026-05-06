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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <SEO 
        title="GPA Calculator - Free College & High School Tool"
        description="Calculate your semester and cumulative GPA with our free GPA calculator. Supports weighted and unweighted scales."
      />

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto pb-8 border-b border-slate-100 dark:border-slate-800 mb-8">
             <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-600 mx-auto mb-4 border border-cyan-200 dark:border-cyan-800 shadow-sm transition-transform hover:rotate-6">
                <GraduationCap size={32} />
             </div>
             <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter transition-all hover:scale-105 duration-300">GPA <span className="text-cyan-600 dark:text-cyan-400 underline decoration-cyan-200 dark:decoration-cyan-900 underline-offset-8">Quest</span></h1>
             <p className="text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest text-xs opacity-80">Join 50,000+ students tracking progress.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-8">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Course Name</h3>
                   <div className="flex gap-16">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 w-24">Grade</h3>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 w-16">Credits</h3>
                   </div>
                </div>

                <AnimatePresence initial={false}>
                  {courses.map((course) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-800 p-5 rounded-[24px] border border-slate-100 dark:border-slate-700 hover:border-cyan-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-cyan-500/5 group"
                    >
                      <div className="flex-1 flex items-center gap-4 w-full">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 shadow-inner group-hover:text-cyan-500 transition-colors">
                           <BookOpen size={20} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. Physics 101"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="flex-1 bg-transparent border-none focus:ring-0 font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-500"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <select 
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          className="w-full sm:w-24 bg-slate-50 dark:bg-slate-700 border-none rounded-xl p-3 text-sm font-black text-cyan-600 dark:text-cyan-400 focus:ring-2 focus:ring-cyan-500 appearance-none text-center cursor-pointer shadow-inner"
                        >
                          {Object.keys(gradeValues).map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        <input 
                          type="number" 
                          value={course.credits}
                          onChange={(e) => updateCourse(course.id, 'credits', Math.max(0, Number(e.target.value)))}
                          className="w-20 bg-slate-50 dark:bg-slate-700 border-none rounded-xl p-3 text-sm font-black text-slate-900 dark:text-white text-center focus:ring-2 focus:ring-cyan-500 shadow-inner"
                        />
                        <button 
                          onClick={() => removeCourse(course.id)}
                          className="p-3 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 dark:bg-slate-700 rounded-xl"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button 
                  onClick={addCourse}
                  className="w-full flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-50/10 rounded-[32px] text-slate-500 font-black transition-all group active:scale-95 shadow-sm"
                >
                  <Plus size={24} className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400" /> 
                  <span className="group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-widest text-xs">Add New Course Row</span>
                </button>
              </div>
              
              <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-800/80 rounded-[32px] border border-slate-200 dark:border-slate-700">
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3 tracking-tight text-slate-900 dark:text-white">
                    <Info className="text-cyan-600 dark:text-cyan-400" size={24} /> Calculation Guide
                 </h3>
                 <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed mb-8 font-medium">
                    GPA (Grade Point Average) represents the average value of accumulated grades. We calculate this by dividing total grade points by total credits attempted.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:scale-105">
                       <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest">Standard 4.0</h4>
                       <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Used by most US schools. A = 4, B = 3, C = 2, D = 1, F = 0.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm transition-transform hover:scale-105">
                       <h4 className="font-black text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-widest">Weighted GPA</h4>
                       <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">AP/IB courses often add +1.0 point (A = 5.0) for difficulty.</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-cyan-600 rounded-[48px] p-12 text-white text-center shadow-2xl shadow-cyan-500/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-100 mb-6 font-mono">ESTIMATED GPA</div>
                    <div className="text-9xl font-black mb-6 tracking-tighter transition-transform group-hover:scale-110 duration-700">
                      {formatNum(gpa)}
                    </div>
                    <div className="text-sm font-bold text-cyan-50/80 uppercase tracking-widest">
                      {courses.reduce((a,b) => a + b.credits, 0)} TOTAL CREDITS
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 space-y-4 shadow-sm">
                   <button className="w-full py-5 bg-slate-900 dark:bg-cyan-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                      Save to History
                   </button>
                   <button className="w-full py-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 group">
                      <Download size={20} className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400" /> Export Sheet
                   </button>
                </div>

                <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50 rounded-[32px] p-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 rounded-xl">
                        <TrendingUp size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-cyan-900 dark:text-cyan-400 text-sm mb-1">Performance Insight</h4>
                        <p className="text-xs text-cyan-700 dark:text-cyan-500 font-medium">Keep it up! Your GPA is 0.2 points higher than last semester's average.</p>
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
