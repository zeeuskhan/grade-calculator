import React from 'react';
import { SEO } from '../components/SEO';

const PrivacyPage = () => {
  return (
    <div className="bg-indigo-50/20 pb-20">
      <SEO 
        title="Privacy Policy - Your Data Security"
        description="Learn how Calculator of Grades protects your academic data and personal information."
      />

      <div className="bg-indigo-950 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
           <h1 className="text-5xl font-black text-white mb-6 tracking-tighter">Privacy <span className="text-indigo-400">Security.</span></h1>
           <p className="text-indigo-100/80 text-lg font-black">Detailed information on how we handle your academic data.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[40px] border border-indigo-100 p-8 md:p-12 shadow-xl prose max-w-none">
          <h2 className="text-2xl font-black mb-6 text-indigo-950">Introduction</h2>
          <p className="text-indigo-950/80 font-bold leading-relaxed">
            At Calculator of Grades (accessible from calculatorofgrades.vercel.app), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6 text-indigo-950">Log Files</h2>
          <p className="text-indigo-950/80 font-bold leading-relaxed">
            We follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-2xl font-black mt-12 mb-6 text-indigo-950">What Data Do We Collect?</h2>
          <ul className="text-indigo-950 font-bold space-y-4 leading-relaxed">
            <li><strong>Calculation Data:</strong> The grades, weights, and course names you enter are stored locally on your device (using LocalStorage) and are not sent to our servers unless you explicitly sign up for a Pro account.</li>
            <li><strong>Account Information:</strong> If you create an account, we collect your name and email address.</li>
            <li><strong>Cookies:</strong> Like any other website, we use 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</li>
          </ul>

          <h2 className="text-2xl font-black mt-12 mb-6 text-indigo-950">Privacy Rights</h2>
          <p className="text-indigo-950/80 font-bold leading-relaxed">
            You have the right to request that we erase any personal data we hold about you. You can also request that we provide you with a copy of your personal data.
          </p>

          <div className="mt-12 p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
            <h3 className="text-xl font-black text-indigo-900 mb-4">Questions?</h3>
            <p className="text-sm text-indigo-800/60 font-black mb-0">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at privacy@calculatorofgrades.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
