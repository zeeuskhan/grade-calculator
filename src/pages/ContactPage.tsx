import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      <SEO 
        title="Contact Us - Support & Feedback"
        description="Get in touch with the Calculator of Grades team for support, feature requests, or partnership inquiries."
      />

      <div className="bg-[#0f172a] py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Get in <span className="text-cyan-500">Touch.</span></h1>
           <p className="text-slate-400 text-xl font-medium">Have a question or a feature request? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
               <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                  <Mail size={24} />
               </div>
               <h3 className="text-xl font-black mb-2 dark:text-white">Email Us</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-semibold">Our team typically responds within 24 hours.</p>
               <a href="mailto:support@calculatorofgrades.com" className="text-cyan-600 font-black hover:underline">support@calculatorofgrades.com</a>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
               <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                  <MessageSquare size={24} />
               </div>
               <h3 className="text-xl font-black mb-2 dark:text-white">Community</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-semibold">Join our student community on Reddit or Twitter.</p>
               <div className="flex gap-4">
                  <a href="#" className="text-cyan-600 font-bold hover:underline">Twitter/X</a>
                  <a href="#" className="text-cyan-600 font-bold hover:underline">Discord</a>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 md:p-12 shadow-xl h-full">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 rounded-[32px] flex items-center justify-center text-cyan-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black dark:text-white">Message Received!</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-semibold">Thanks for reaching out. We've received your request and will be in touch shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-200 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Feature Recommendation"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-[28px] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 active:scale-95">
                    Send Message <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
