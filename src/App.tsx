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
  Loader2,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { cn } from './lib/utils';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AdBanner } from './components/AdBanner';
import ScrollToTop from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';

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
const ApGovPage = lazy(() => import('./pages/ApGovPage'));
const ApGovGuidePage = lazy(() => import('./pages/ApGovGuidePage'));
const VtuCgpaPage = lazy(() => import('./pages/VtuCgpaPage'));
const AnnaUniversityCgpaPage = lazy(() => import('./pages/AnnaUniversityCgpaPage'));
const MumbaiUniversityCgpaPage = lazy(() => import('./pages/MumbaiUniversityCgpaPage'));
const AktuCgpaPage = lazy(() => import('./pages/AktuCgpaPage'));
const JntuCgpaPage = lazy(() => import('./pages/JntuCgpaPage'));
const SppuCgpaPage = lazy(() => import('./pages/SppuCgpaPage'));
const RgpvCgpaPage = lazy(() => import('./pages/RgpvCgpaPage'));
const DuCgpaPage = lazy(() => import('./pages/DuCgpaPage'));
const SemesterGpaPage = lazy(() => import('./pages/SemesterGpaPage'));
const AttendancePercentagePage = lazy(() => import('./pages/AttendancePercentagePage'));

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
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Grade Calculator', path: '/grade-calculator', icon: Calculator },
    { name: 'GPA Calculator', path: '/gpa-calculator', icon: GraduationCap },
    { name: 'Final Grade', path: '/final-grade-predictor', icon: Target },
    { name: 'Percentage', path: '/percentage-calculator', icon: Percent },
    { name: 'Blog', path: '/blog', icon: FileText },
  ];

  const universitySubItems = [
    { name: "VTU CGPA", path: "/vtu-cgpa-to-percentage-calculator" },
    { name: "Anna Uni CGPA", path: "/anna-university-cgpa-to-percentage-calculator" },
    { name: "Mumbai Uni CGPA", path: "/mumbai-university-cgpa-to-percentage-calculator" },
    { name: "AKTU CGPA", path: "/aktu-cgpa-to-percentage-calculator" },
    { name: "JNTU CGPA", path: "/jntu-cgpa-to-percentage-calculator" },
    { name: "SPPU CGPA", path: "/sppu-cgpa-to-percentage-calculator" },
    { name: "RGPV CGPA", path: "/rgpv-cgpa-to-percentage-calculator" },
    { name: "Delhi Uni CGPA", path: "/du-cgpa-to-percentage-calculator" }
  ];

  const toolsSubItems = [
    { name: "Semester GPA", path: "/semester-gpa-calculator" },
    { name: "Attendance %", path: "/attendance-percentage-calculator" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-indigo-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                S+
              </div>
              <span className="text-2xl font-black text-indigo-950 dark:text-white tracking-tight">
                CalculatorOfGrades<span className="text-indigo-600 font-black">.com</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 items-center font-black text-indigo-900 dark:text-indigo-100 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative py-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400",
                    location.pathname === item.path
                      ? "text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 dark:after:bg-indigo-400 after:rounded-full"
                      : ""
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* University dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                  University CGPA <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 space-y-1">
                  {universitySubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-4 py-2 text-xs font-bold text-indigo-950 dark:text-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-xl transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Tools dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                  Related <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2 space-y-1">
                  {toolsSubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-4 py-2 text-xs font-bold text-indigo-950 dark:text-indigo-100 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-xl transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button className="hidden lg:block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                Install
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-indigo-600 dark:text-indigo-400"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-indigo-950 dark:text-white"
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
            className="md:hidden bg-white dark:bg-indigo-950 border-b border-indigo-100 dark:border-indigo-900/50 overflow-y-auto max-h-[85vh]"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold",
                      location.pathname === item.path
                      ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                      : "text-indigo-900 dark:text-indigo-100 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile University links */}
              <div className="space-y-1">
                <span className="block px-4 text-[10px] font-black uppercase tracking-widest text-indigo-400">University CGPA</span>
                <div className="grid grid-cols-2 gap-1 px-2">
                  {universitySubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-xs font-bold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 rounded-lg"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Related tools */}
              <div className="space-y-1">
                <span className="block px-4 text-[10px] font-black uppercase tracking-widest text-indigo-400 font-sans">Related Tools</span>
                <div className="grid grid-cols-2 gap-1 px-2">
                  {toolsSubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-xs font-bold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/30 rounded-lg"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-indigo-950 border-t border-indigo-100 dark:border-indigo-900/50 py-16 px-4 transition-colors duration-300">
    <div className="max-w-7xl mx-auto mb-12">
      <AdBanner />
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-indigo-950 dark:text-white">CalculatorOfGrades</span>
        </Link>
        <p className="text-sm text-indigo-900/80 dark:text-indigo-100/80 leading-relaxed font-bold">
          The #1 <strong>calculatorofgrade</strong> tool for teachers and students worldwide. Precise, fast, and secure. Built for academic excellence.
        </p>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 dark:text-white uppercase tracking-[0.2em] text-[11px]">Calculators</h4>
        <ul className="space-y-4 text-sm text-indigo-900 dark:text-indigo-100 font-bold">
          <li><Link to="/grade-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Grade Calculator</Link></li>
          <li><Link to="/gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">GPA Calculator</Link></li>
          <li><Link to="/final-grade-predictor" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Final Grade Predictor</Link></li>
          <li><Link to="/ap-gov-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all font-black text-indigo-600 dark:text-indigo-400 italic underline decoration-wavy underline-offset-4">AP GOV Calculator</Link></li>
          <li><Link to="/percentage-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Percentage Calculator</Link></li>
          <li><Link to="/semester-gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-xs text-indigo-500/80">Semester GPA Suite</Link></li>
          <li><Link to="/attendance-percentage-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-xs text-indigo-500/80">Attendance Tracker</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 dark:text-white uppercase tracking-[0.2em] text-[11px]">Support</h4>
        <ul className="space-y-4 text-sm text-indigo-900 dark:text-indigo-100 font-bold">
          <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">About Us</Link></li>
          <li><Link to="/faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">FAQ</Link></li>
          <li><Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-all">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black mb-8 text-indigo-950 dark:text-white uppercase tracking-[0.2em] text-[11px]">Newsletter</h4>
        <p className="text-xs text-indigo-900 dark:text-indigo-100 mb-6 font-bold">Join 100k+ students getting study tips delivered weekly.</p>
        <div className="flex gap-2">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="flex-1 px-4 py-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/30 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-indigo-900/50 text-sm outline-none transition-all font-bold text-indigo-950 dark:text-white"
          />
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-500/20 transition-all active:scale-95">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-indigo-50 dark:border-indigo-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[11px] text-indigo-400 dark:text-indigo-500 font-black uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} CalculatorOfGrades.com. All Rights Reserved.
      </p>
      <div className="flex gap-8">
         <Link to="/contact" className="text-indigo-300 dark:text-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform hover:scale-110"><Mail size={22} /></Link>
         <Link to="/faq" className="text-indigo-300 dark:text-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform hover:scale-110"><HelpCircle size={22} /></Link>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#fbfbfe] dark:bg-indigo-950 selection:bg-indigo-500/30 selection:text-indigo-900 transition-colors duration-300">
          <Navigation />
          <AdBanner />
          <div className="flex justify-center max-w-[1600px] mx-auto w-full px-4 overflow-x-hidden">
            <main className="flex-grow min-w-0">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/grade-calculator" element={<GradePage />} />
                    <Route path="/gpa-calculator" element={<GPAPage />} />
                    <Route path="/final-grade-predictor" element={<FinalGradePage />} />
                    <Route path="/percentage-calculator" element={<GradePage title="Percentage" />} />
                    <Route path="/ap-gov-calculator" element={<ApGovPage />} />
                    <Route path="/ap-gov-exam-guide" element={<ApGovGuidePage />} />
                    <Route path="/vtu-cgpa-to-percentage-calculator" element={<VtuCgpaPage />} />
                    <Route path="/anna-university-cgpa-to-percentage-calculator" element={<AnnaUniversityCgpaPage />} />
                    <Route path="/mumbai-university-cgpa-to-percentage-calculator" element={<MumbaiUniversityCgpaPage />} />
                    <Route path="/aktu-cgpa-to-percentage-calculator" element={<AktuCgpaPage />} />
                    <Route path="/jntu-cgpa-to-percentage-calculator" element={<JntuCgpaPage />} />
                    <Route path="/sppu-cgpa-to-percentage-calculator" element={<SppuCgpaPage />} />
                    <Route path="/rgpv-cgpa-to-percentage-calculator" element={<RgpvCgpaPage />} />
                    <Route path="/du-cgpa-to-percentage-calculator" element={<DuCgpaPage />} />
                    <Route path="/semester-gpa-calculator" element={<SemesterGpaPage />} />
                    <Route path="/attendance-percentage-calculator" element={<AttendancePercentagePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="*" element={<div className="flex items-center justify-center h-96 dark:text-white">404 - Not Found</div>} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
          </div>
          <AdBanner />
          <Footer />
          <BackToTop />
        </div>
      </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}
