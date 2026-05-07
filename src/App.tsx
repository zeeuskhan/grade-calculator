import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  GraduationCap, 
  Target, 
  Percent, 
  History, 
  Settings, 
  Menu, 
  X, 
  Home as HomeIcon,
  FileText,
  HelpCircle,
  Mail,
  Loader2
} from 'lucide-react';
import { cn } from './lib/utils';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const GradePage = lazy(() => import('./pages/GradePage'));
const GPAPage = lazy(() => import('./pages/GPAPage'));
const FinalGradePage = lazy(() => import('./pages/FinalGradePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-indigo-600">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 size={48} />
    </motion.div>
    <p className="font-black text-sm uppercase tracking-widest animate-pulse">Calculating Excellence...</p>
  </div>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Grade Calculator', path: '/grade-calculator', icon: Calculator },
    { name: 'GPA Calculator', path: '/gpa-calculator', icon: GraduationCap },
    { name: 'Final Grade', path: '/final-grade-predictor', icon: Target },
    { name: 'Percentage', path: '/percentage-calculator', icon: Percent },
    { name: 'Blog', path: '/blog', icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-indigo-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                S+
              </div>
              <span className="text-2xl font-black text-indigo-950 tracking-tight">
                CalculatorOfGrades<span className="text-indigo-600 font-black">.com</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 font-black text-indigo-900">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative py-2 transition-colors hover:text-indigo-600",
                    location.pathname === item.path
                      ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:rounded-full"
                      : ""
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <button className="hidden lg:block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                Install
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-indigo-950"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-indigo-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium",
                    location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-indigo-900 hover:bg-indigo-50/50"
                  )}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-indigo-100 py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-indigo-950">CalculatorOfGrades</span>
        </Link>
        <p className="text-sm text-indigo-900/80 leading-relaxed font-bold">
          The #1 <strong>calculatorofgrade</strong> tool for teachers and students worldwide. Precise, fast, and secure. Built for academic excellence.
        </p>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 uppercase tracking-[0.2em] text-[11px]">Calculators</h4>
        <ul className="space-y-4 text-sm text-indigo-900 font-bold">
          <li><Link to="/grade-calculator" className="hover:text-indigo-600 transition-all">Grade Calculator</Link></li>
          <li><Link to="/gpa-calculator" className="hover:text-indigo-600 transition-all">GPA Calculator</Link></li>
          <li><Link to="/final-grade-predictor" className="hover:text-indigo-600 transition-all">Final Grade Predictor</Link></li>
          <li><Link to="/percentage-calculator" className="hover:text-indigo-600 transition-all">Percentage Calculator</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 uppercase tracking-[0.2em] text-[11px]">Support</h4>
        <ul className="space-y-4 text-sm text-indigo-900 font-bold">
          <li><Link to="/about" className="hover:text-indigo-600 transition-all">About Us</Link></li>
          <li><Link to="/faq" className="hover:text-indigo-600 transition-all">FAQ</Link></li>
          <li><Link to="/privacy" className="hover:text-indigo-600 transition-all">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-indigo-600 transition-all">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition-all">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 uppercase tracking-[0.2em] text-[11px]">Newsletter</h4>
        <p className="text-xs text-indigo-900 mb-6 font-bold">Join 100k+ students getting study tips delivered weekly.</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-1 px-4 py-3 rounded-2xl bg-indigo-50/50 border-2 border-transparent focus:border-indigo-500 focus:bg-white text-sm outline-none transition-all font-bold text-indigo-950"
          />
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-500/20 transition-all active:scale-95">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-indigo-50 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[11px] text-indigo-400 font-black uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} CalculatorOfGrades.com. All Rights Reserved.
      </p>
      <div className="flex gap-8">
         <Link to="/contact" className="text-indigo-300 hover:text-indigo-600 transition-transform hover:scale-110"><Mail size={22} /></Link>
         <Link to="/faq" className="text-indigo-300 hover:text-indigo-600 transition-transform hover:scale-110"><HelpCircle size={22} /></Link>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-900">
          <Navigation />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/grade-calculator" element={<GradePage />} />
                  <Route path="/gpa-calculator" element={<GPAPage />} />
                  <Route path="/final-grade-predictor" element={<FinalGradePage />} />
                  <Route path="/percentage-calculator" element={<GradePage title="Percentage" />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<div className="flex items-center justify-center h-96">404 - Not Found</div>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
