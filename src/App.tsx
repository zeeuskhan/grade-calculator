import React, { useState, useEffect } from 'react';
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
  Mail
} from 'lucide-react';
import { cn } from './lib/utils';

// Pages (will be created in separate files)
import HomePage from './pages/HomePage';
import GradePage from './pages/GradePage';
import GPAPage from './pages/GPAPage';
import FinalGradePage from './pages/FinalGradePage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';

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
            <div className="flex gap-8 font-semibold text-indigo-800/80">
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
              className="p-2 text-indigo-800"
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
  <footer className="bg-indigo-50/30 border-t border-indigo-100 py-12 px-4 shadow-inner">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-1">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-xl font-black tracking-tight text-indigo-950">CalculatorOfGrades</span>
        </Link>
        <p className="text-sm text-indigo-800/80 leading-relaxed font-semibold">
          The #1 tool for teachers and students worldwide. Precise, fast, and secure.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-indigo-950 uppercase tracking-widest text-[10px]">Calculators</h4>
        <ul className="space-y-3 text-sm text-indigo-800 font-bold">
          <li><Link to="/grade-calculator" className="hover:text-indigo-600 transition-colors">Grade Calculator</Link></li>
          <li><Link to="/gpa-calculator" className="hover:text-indigo-600 transition-colors">GPA Calculator</Link></li>
          <li><Link to="/final-grade-predictor" className="hover:text-indigo-600 transition-colors">Final Grade Predictor</Link></li>
          <li><Link to="/percentage-calculator" className="hover:text-indigo-600 transition-colors">Percentage Calculator</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-indigo-950 uppercase tracking-widest text-[10px]">Support</h4>
        <ul className="space-y-3 text-sm text-indigo-800 font-bold">
          <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
          <li><Link to="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link></li>
          <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-indigo-950 uppercase tracking-widest text-[10px]">Newsletter</h4>
        <p className="text-[11px] text-indigo-800 mb-4 font-bold">Join 100k+ students getting study tips.</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-1 px-4 py-2 rounded-xl bg-white border border-indigo-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold text-indigo-950"
          />
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} CalculatorOfGrades.com. Precision Academic Engineering.
      </p>
      <div className="flex gap-6">
         <Link to="/contact" className="text-indigo-400 hover:text-indigo-600 transition-colors"><Mail size={20} /></Link>
         <Link to="/faq" className="text-indigo-400 hover:text-indigo-600 transition-colors"><HelpCircle size={20} /></Link>
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
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
