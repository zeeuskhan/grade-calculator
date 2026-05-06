import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, ShieldCheck, Users } from 'lucide-react';
import { SEO } from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="bg-indigo-50/20 pb-20">
      <SEO 
        title="About Our Grade Calculation Mission"
        description="Learn more about Calculator of Grades, the mission to provide precision academic tools to students and teachers globally."
      />

      <div className="bg-indigo-950 py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Precision <span className="text-indigo-400">Grading.</span></h1>
           <p className="text-indigo-100/80 text-xl font-black">Empowering the next generation of academic high-performers.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[40px] border border-indigo-100 p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-indigo-950 tracking-tight">Our Mission</h2>
              <p className="text-indigo-950/80 leading-relaxed font-bold">
                Calculator of Grades was founded with a simple goal: to eliminate the anxiety of "what do I need on my final?" and "what's my cumulative GPA?". We believe that academic clarity leads to academic success.
              </p>
              <p className="text-indigo-950/80 leading-relaxed font-bold">
                Our suite of tools is engineered to support global standards, including US 4.0 GPA scales and Indian CBSE percentages, making us the go-to resource for millions of international students.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: '100k+', sub: 'Active Students' },
                { icon: ShieldCheck, label: '99.9%', sub: 'Accuracy Rate' },
                { icon: Award, label: '500+', sub: 'Universities' },
                { icon: GraduationCap, label: 'Free', sub: 'Always for Students' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 text-center group hover:border-indigo-500/20 transition-all">
                  <stat.icon className="mx-auto mb-3 text-indigo-600" size={24} />
                  <div className="text-xl font-black text-indigo-950">{stat.label}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-indigo-50">
            <h3 className="text-2xl font-black mb-8 text-center tracking-tight text-indigo-950">Why Use Our Calculator?</h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-2 text-indigo-950">Surgical Precision</h4>
                  <p className="text-sm text-indigo-900 leading-relaxed font-bold">Our algorithms leverage the same logic used by university registrar systems, ensuring your GPA and grades are calculated exactly as your school would.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg mb-2 text-indigo-950">Student First</h4>
                  <p className="text-sm text-indigo-900 leading-relaxed font-bold">We don't just give you numbers; we provide actionable insights. From final grade targets to personalized study urgency alerts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
