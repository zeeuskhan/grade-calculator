import React from 'react';
import { SEO } from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      <SEO 
        title="Terms of Service - Usage Guidelines"
        description="The legal guidelines and terms of service for using Calculator of Grades."
      />

      <div className="bg-[#0f172a] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
           <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">Terms of <span className="text-cyan-500">Service.</span></h1>
           <p className="text-slate-400 text-lg">Legal usage guidelines for our platform.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-black mb-6">1. Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            By accessing the website at calculatorofgrades.vercel.app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6">2. Use License</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Permission is granted to temporarily use the materials (information or software) on Calculator of Grades' website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6">3. Disclaimer</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            The materials on Calculator of Grades' website are provided on an 'as is' basis. Calculator of Grades makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6">4. Limitations</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            In no event shall Calculator of Grades or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6">5. Accuracy of Materials</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            The materials appearing on Calculator of Grades website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
