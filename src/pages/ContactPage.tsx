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
    <div className="bg-indigo-50/20 pb-20">
      <SEO 
        title="Contact Us - Support & Feedback"
        description="Get in touch with the Calculator of Grades team for support, feature requests, or partnership inquiries."
      />

      <div className="bg-indigo-950 py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Get in <span className="text-indigo-400">Touch.</span></h1>
           <p className="text-indigo-100/60 text-xl font-bold">Have a question or a feature request? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[40px] border border-indigo-100 p-8 shadow-xl">
               <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <Mail size={24} />
               </div>
               <h3 className="text-xl font-black mb-2 text-indigo-950">Email Us</h3>
               <p className="text-sm text-indigo-800/60 mb-4 font-black">Our team typically responds within 24 hours.</p>
               <a href="mailto:support@calculatorofgrades.com" className="text-indigo-600 font-black hover:underline">support@calculatorofgrades.com</a>
            </div>

            <div className="bg-white rounded-[40px] border border-indigo-100 p-8 shadow-xl">
               <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <MessageSquare size={24} />
               </div>
               <h3 className="text-xl font-black mb-2 text-indigo-950">Community</h3>
               <p className="text-sm text-indigo-800/60 mb-4 font-black">Join our student community on Reddit or Twitter.</p>
               <div className="flex gap-4">
                  <a href="#" className="text-indigo-600 font-bold hover:underline">Twitter/X</a>
                  <a href="#" className="text-indigo-600 font-bold hover:underline">Discord</a>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[40px] border border-indigo-100 p-10 md:p-12 shadow-xl h-full">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-indigo-100 rounded-[32px] flex items-center justify-center text-indigo-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-indigo-950">Message Received!</h2>
                  <p className="text-indigo-800/60 max-w-sm mx-auto font-black leading-relaxed">Thanks for reaching out. We've received your request and will be in touch shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-indigo-50 rounded-2xl font-black text-xs uppercase tracking-widest text-indigo-900 hover:bg-indigo-100 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-2">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-indigo-50/50 border-none text-indigo-950 font-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 rounded-2xl bg-indigo-50/50 border-none text-indigo-950 font-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-2">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Feature Recommendation"
                      className="w-full px-6 py-4 rounded-2xl bg-indigo-50/50 border-none text-indigo-950 font-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 ml-2">Your Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full px-6 py-4 rounded-2xl bg-indigo-50/50 border-none text-indigo-950 font-black focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[28px] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95">
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
