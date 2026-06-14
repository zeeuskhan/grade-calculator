import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  RotateCcw, 
  Save, 
  ChevronDown, 
  HelpCircle,
  TrendingUp,
  Settings,
  Scale
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { SEO } from '../components/SEO';
import { Tooltip } from '../components/Tooltip';
import { cn, getLetterGrade, formatNum, GRADES_US, GRADES_INDIA_CBSE } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

interface Assignment {
  id: string;
  name: string;
  grade: number;
  weight: number;
  maxPoints: number;
  receivedPoints: number;
}

const GradePage = ({ title = "Grade Calculator" }) => {
  const isPercentageMode = title.toLowerCase().includes('percentage');
  const { theme } = useTheme();
  const [method, setMethod] = useState<'WEIGHTED' | 'SIMPLE'>(isPercentageMode ? 'SIMPLE' : 'WEIGHTED');
  const [inputMode, setInputMode] = useState<'PERCENT' | 'POINTS'>(isPercentageMode ? 'POINTS' : 'PERCENT');
  const [system, setSystem] = useState<'US' | 'INDIA'>('US');
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: isPercentageMode ? 'Quiz 1' : 'Quiz 1', grade: 85, weight: isPercentageMode ? 0 : 20, maxPoints: 100, receivedPoints: 85 },
  ]);

  const faqsData = isPercentageMode ? [
    { q: "How do I calculate 18 out of 25 as a percentage in the US?", a: "To find the percentage for 18 out of 25, divide 18 by 25 to get 0.72, then multiply by 100 which equals 72.0%. This is the standard American grading method for quick quiz results." },
    { q: "What is 12 out of 15 as a percentage score?", a: "12 divided by 15 is 0.8, which translates to exactly 80.0%. On most US high school grading curves, this would be considered a B- minus." },
    { q: "How to calculate test percentage for midterms?", a: "To calculate your test percentage, take your total points earned and divide them by the total points possible. Multiply that decimal by 100 for your final percent score." },
    { q: "What grade is 14 out of 20 in most US schools?", a: "A score of 14 out of 20 results in a 70.0%, which is generally a C- grade in the United States." },
    { q: "Is 16 out of 20 a good score?", a: "16 out of 20 is an 80%, which is typically a B- grade. It shows solid understanding but room for improvement on technical points." }
  ] : [
    { q: "How accurate is this weighted class grade calculator?", a: "Our algorithm uses the standard weighted average formula (Grade x Weight) used by US colleges. If you set your 'Final Exam' to the correct percentage, it will provide a surgical prediction of your GPA." },
    { q: "Simple vs Weighted Average: Which should I use?", a: "Use 'Simple' if every assignment has equal value. Use 'Weighted' if your course syllabus assigns specific percentages to categories like Homework (30%) and Exams (70%)." },
    { q: "How do I calculate 'points' based grades like 18/25?", a: "Switch to 'Points' mode in our calculator. Enter your earned points and the max possible. We handle the math to give you a percentage and letter grade instantly." },
    { q: "Can I track multiple classes in this gradebook?", a: "Currently, your data is saved locally to your device. We are working on a cloud-sync feature for full semester tracking soon!" }
  ];

  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": isPercentageMode ? "Free US Test Grade Calculator" : "Professional Weighted Grade Calculator",
      "url": isPercentageMode ? "https://calculatorofgrades.vercel.app/percentage-calculator" : "https://calculatorofgrades.vercel.app/grade-calculator",
      "description": isPercentageMode 
        ? "Instantly calculate any test score percentage for your exams. Built for US students and teachers to convert points to grades."
        : "The most accurate weighted grade calculator online. Manage your assignments and predict your final grade with our professional academic tool.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqsData.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  const totalPossibleWeight = useMemo(() => assignments.reduce((acc, curr) => acc + curr.weight, 0), [assignments]);
  
  const currentGrade = useMemo(() => {
    if (assignments.length === 0) return 0;
    
    if (method === 'WEIGHTED') {
      const weightedSum = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.maxPoints > 0 ? (curr.receivedPoints / curr.maxPoints) * 100 : 0);
        return acc + (score * (curr.weight || 0));
      }, 0);
      return totalPossibleWeight > 0 ? weightedSum / totalPossibleWeight : 0;
    } else {
      const avg = assignments.reduce((acc, curr) => {
        const score = inputMode === 'PERCENT' ? curr.grade : (curr.maxPoints > 0 ? (curr.receivedPoints / curr.maxPoints) * 100 : 0);
        return acc + score;
      }, 0);
      return avg / assignments.length;
    }
  }, [assignments, method, inputMode, totalPossibleWeight]);

  const letterGrade = useMemo(() => getLetterGrade(currentGrade, system), [currentGrade, system]);

  const chartData = useMemo(() => [
    { name: 'Current', value: currentGrade },
    { name: 'Remaining', value: Math.max(0, 100 - currentGrade) },
  ], [currentGrade]);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { 
        id: crypto.randomUUID(), 
        name: `Assignment ${assignments.length + 1}`, 
        grade: 0, 
        weight: 0,
        maxPoints: 100,
        receivedPoints: 0
      }
    ]);
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: any) => {
    let sanitizedValue = value;
    if (typeof value === 'number') {
      if (field === 'grade' || field === 'weight' || field === 'receivedPoints') {
        sanitizedValue = Math.max(0, value);
      }
      if (field === 'maxPoints') {
        sanitizedValue = Math.max(1, value);
      }
    }
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: sanitizedValue } : a));
  };

  const exportPDF = () => {
    // A4 dimensions: 210mm x 297mm
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Theme Colors
    const primaryColor = [30, 27, 75];    // #1e1b4b (Deep Indigo)
    const secondaryColor = [79, 70, 229]; // #4f46e5 (Indigo Accent)
    const textColor = [30, 27, 75];        // Main dark grey text
    const grayText = [100, 116, 139];     // Slate Gray
    const borderGray = [226, 232, 240];    // Border Light Gray
    const lightBg = [248, 250, 252];      // Slate 50 (Row Alternating)
    const accentRed = [239, 68, 68];      // Red alert color

    // Page dimension helpers
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // 1. TOP BRANDING & HEADER
    // Custom Accent top border strip
    doc.setFillColor(79, 70, 229); // Indigo top bar accent
    doc.rect(0, 0, pageWidth, 5, 'F');

    // Title / Brand Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 27, 75);
    doc.text('CALCULATOR OF GRADES', margin, 22);
    
    // Tagline
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Professional Academic Performance Report', margin, 27);

    // Timestamp with pill background
    const now = new Date();
    const timestampStr = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(pageWidth - margin - 75, 14, 75, 14, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text('GENERATED SECURELY', pageWidth - margin - 70, 19);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(timestampStr, pageWidth - margin - 70, 24);

    // Divider Line below Header
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, 34, pageWidth - margin, 34);

    // 2. SUMMARY OVERVIEW BOX (Bento Design style)
    const summaryBoxY = 38;
    const summaryBoxHeight = 44;
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(224, 231, 255); // indigo-100
    doc.roundedRect(margin, summaryBoxY, contentWidth, summaryBoxHeight, 3, 3, 'FD');

    // Left side: Big Letter Grade display panel
    doc.setFillColor(79, 70, 229); // indigo dark background
    doc.roundedRect(margin + 8, summaryBoxY + 8, 40, summaryBoxHeight - 16, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('GRADE SCALE', margin + 11, summaryBoxY + 16);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text(letterGrade, margin + 28, summaryBoxY + 32, { align: 'center' });

    // Center area: Numerical Grade details
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('CUMULATIVE PERFORMANCE', margin + 56, summaryBoxY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(30, 27, 75);
    doc.text(`${formatNum(currentGrade)}%`, margin + 56, summaryBoxY + 28);

    // Right side: Report metadata
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Evaluation Method:', margin + 118, summaryBoxY + 16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 27, 75);
    doc.text(method === 'WEIGHTED' ? 'Weighted Average' : 'Simple Average', margin + 152, summaryBoxY + 16);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Grading System:', margin + 118, summaryBoxY + 23);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 27, 75);
    doc.text(system === 'US' ? 'US GPA (4.0 Scale)' : 'Indian CBSE System', margin + 152, summaryBoxY + 23);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Total Records:', margin + 118, summaryBoxY + 30);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 27, 75);
    doc.text(`${assignments.length} Course Items`, margin + 152, summaryBoxY + 30);

    // Validation or alert line at the bottom of Summary
    if (method === 'WEIGHTED' && totalPossibleWeight !== 100) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(accentRed[0], accentRed[1], accentRed[2]);
      doc.text(`Warning: Category weights total ${totalPossibleWeight}%. Standard calculations require 100%.`, margin + 56, summaryBoxY + 36);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(16, 185, 129); // emerald green
      doc.text('✓ All entries correspond to verified gradebook weight scales.', margin + 56, summaryBoxY + 36);
    }

    // 3. TABLE OF GRADED ACTIVITIES
    let tableStartY = 92;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 27, 75);
    doc.text('ACADEMIC GRADEBOOK ENTRIES', margin, tableStartY);

    // Table Header drawing
    const headerY = tableStartY + 4;
    const headerHeight = 10;
    
    doc.setFillColor(30, 27, 75); // Indigo dark background
    doc.rect(margin, headerY, contentWidth, headerHeight, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    
    // Grid layout positions: No, Name, Mark, Weight/Contrib
    const colIdx = margin + 4;
    const colName = margin + 18;
    const colScore = margin + 100;
    const colWeight = margin + 140;

    doc.text('NO.', colIdx, headerY + 6.5);
    doc.text('ASSIGNMENT / CATEGORY', colName, headerY + 6.5);
    doc.text(inputMode === 'PERCENT' ? 'SCORE / RATE' : 'RAW POINTS (REC/MAX)', colScore, headerY + 6.5);
    doc.text(method === 'WEIGHTED' ? 'WEIGHT CONTRIB.' : 'RELATIVE WT', colWeight, headerY + 6.5);

    // Render each assignment item
    let currentY = headerY + headerHeight;
    const rowHeight = 11;

    assignments.forEach((a, index) => {
      // Alternate light silver and lavender backgrounds for premium aesthetics
      if (index % 2 === 0) {
        doc.setFillColor(252, 251, 254);
      } else {
        doc.setFillColor(248, 250, 252);
      }
      doc.rect(margin, currentY, contentWidth, rowHeight, 'F');

      // Light bottom borders separating rows
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

      // Render cell text values
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(115, 115, 115); // medium gray index
      doc.text(`${(index + 1).toString().padStart(2, '0')}`, colIdx, currentY + 7);

      // Assignment Name text (Safely truncated to fit cleanly on Page width)
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 27, 75);
      const displayName = a.name.length > 40 ? a.name.substring(0, 37) + '...' : a.name;
      doc.text(displayName, colName, currentY + 7);

      // Performance Score / Percent
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 27, 75);
      if (inputMode === 'PERCENT') {
        doc.text(`${formatNum(a.grade)}%`, colScore, currentY + 7);
      } else {
        const calculatedPercent = a.maxPoints > 0 ? (a.receivedPoints / a.maxPoints) * 100 : 0;
        doc.text(`${a.receivedPoints} / ${a.maxPoints} (${formatNum(calculatedPercent)}%)`, colScore, currentY + 7);
      }

      // Weights contribution field
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      if (method === 'WEIGHTED') {
        doc.text(`${a.weight}%`, colWeight, currentY + 7);
      } else {
        doc.text(`${formatNum(100 / assignments.length)}%`, colWeight, currentY + 7);
      }

      currentY += rowHeight;
    });

    // 4. FOOTER FINE-PRINT & SIGNATURE ROW
    // Position signature lines cleanly past the items grid, or lock elements on bottom margin
    const footerStartY = Math.max(currentY + 15, pageHeight - 50);

    // Left block: Official disclaimer and verification
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text('TRANSCRIPT RATINGS & VERIFICATION', margin, footerStartY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const disclaimerParas = [
      'This report showcases academic progress metrics generated securely in real-time by the CalculatorOfGrades.',
      'Weighted scores are evaluated continuously utilizing default mathematical averages compiled via school datasets.',
      'Verify course syllabi weight proportions directly with administrators before official credit validations.'
    ];
    disclaimerParas.forEach((paragraphLine, idx) => {
      doc.text(paragraphLine, margin, footerStartY + 5 + (idx * 3.5));
    });

    // Right block: Signature bar
    const sigLineX = pageWidth - margin - 52;
    doc.setDrawColor(161, 161, 170); // neutral-400 border line
    doc.setLineWidth(0.4);
    doc.line(sigLineX, footerStartY + 12, pageWidth - margin, footerStartY + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 27, 75);
    doc.text('Student / Advisor Verification Seal', sigLineX + 2, footerStartY + 16);

    // Bottom margin system watermark
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(161, 161, 170);
    doc.text('Calculator of Grades — Dynamic Report System', margin, pageHeight - 7);
    doc.text('Page 1 of 1', pageWidth - margin - 15, pageHeight - 7);

    // Export the finalized document
    const sanitTitle = title.replace(/\s+/g, '_');
    doc.save(`${sanitTitle}_Report_Card.pdf`);
  };

  return (
    <div className="min-h-screen bg-indigo-50/20 dark:bg-indigo-950/20 pb-20 transition-colors duration-300">
      <SEO 
        title={`${title} | Free Academic Grading Tool`}
        description={`Calculate your grades with our free ${title} tool. Supports ${isPercentageMode ? 'test score percentages like 18 out of 25' : 'weighted global averages'} and detailed gradebook management for students.`}
        schema={schemaData}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white dark:bg-indigo-900/20 p-6 md:p-8 rounded-3xl border border-indigo-100/50 dark:border-indigo-800/50 shadow-sm transition-colors backdrop-blur-sm">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-indigo-950 dark:text-white mb-2 tracking-tight group flex items-center gap-3">
              {title} <span className="text-indigo-600 dark:text-indigo-400">Expert.</span>
            </h1>
            <p className="text-indigo-950/70 dark:text-indigo-100/70 font-bold text-sm md:text-base italic transition-colors">Professional academic grade tracking for precise score calculations.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tooltip content="Switch between US 4.0 and Indian CBSE grading scales">
              <button 
                onClick={() => setSystem(system === 'US' ? 'INDIA' : 'US')}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-400 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-indigo-100 dark:border-indigo-800/50"
              >
                <Scale size={16} /> {system === 'US' ? 'US Scale' : 'India Scale'}
              </button>
            </Tooltip>
            <Tooltip content="Download your progress as a professional PDF report">
              <button 
                onClick={exportPDF}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <Download size={16} /> Export PDF
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-indigo-900/20 rounded-[32px] border border-indigo-100 dark:border-indigo-800/50 overflow-hidden shadow-sm transition-colors backdrop-blur-sm">
              <div className="px-6 py-4 flex items-center justify-between border-b border-indigo-50 dark:border-indigo-900/50 transition-colors">
                <div className="flex gap-4">
                   <Tooltip content="Calculate grade based on assignment weightage">
                    <button 
                      onClick={() => setMethod('WEIGHTED')}
                      className={cn("text-sm font-black px-4 py-2 rounded-xl transition-all", method === 'WEIGHTED' ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400" : "text-indigo-400 dark:text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-200")}
                    >
                      Weighted
                    </button>
                   </Tooltip>
                   <Tooltip content="Calculate grade as simple mathematical average">
                    <button 
                      onClick={() => setMethod('SIMPLE')}
                      className={cn("text-sm font-black px-4 py-2 rounded-xl transition-all", method === 'SIMPLE' ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400" : "text-indigo-400 dark:text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-200")}
                    >
                      Simple Avg
                    </button>
                   </Tooltip>
                </div>
                <div className="hidden sm:flex bg-indigo-50 dark:bg-indigo-900/50 p-1 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                   <Tooltip content="Enter grades as direct percentages (0-100)">
                    <button 
                      onClick={() => setInputMode('PERCENT')}
                      className={cn("px-4 py-1.5 rounded-lg text-xs font-black transition-all", inputMode === 'PERCENT' ? "bg-white dark:bg-indigo-950 text-indigo-900 dark:text-white shadow-sm" : "text-indigo-400 dark:text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-200")}
                    >
                      Percent (%)
                    </button>
                   </Tooltip>
                   <Tooltip content="Enter raw scores (e.g. 18 out of 25)">
                    <button 
                      onClick={() => setInputMode('POINTS')}
                      className={cn("px-4 py-1.5 rounded-lg text-xs font-black transition-all", inputMode === 'POINTS' ? "bg-white dark:bg-indigo-950 text-indigo-900 dark:text-white shadow-sm" : "text-indigo-400 dark:text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-200")}
                    >
                      Points
                    </button>
                   </Tooltip>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-indigo-50/50 dark:bg-indigo-900/30 text-[10px] uppercase tracking-[0.2em] font-black text-indigo-900 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/50 transition-colors">
                      <th className="px-6 py-5">Assignment Name</th>
                      <th className="px-6 py-5">
                        <Tooltip content={inputMode === 'PERCENT' ? 'The percentage you earned on this assignment' : 'Received Points / Maximum Points possible'}>
                          <span className="flex items-center gap-1">{inputMode === 'PERCENT' ? 'Grade (%)' : 'Points (R/M)'} <HelpCircle size={10} className="text-indigo-400" /></span>
                        </Tooltip>
                      </th>
                      {method === 'WEIGHTED' && (
                        <th className="px-6 py-5 text-center">
                          <Tooltip content="The weight of this assignment relative to 100% of your total grade">
                            <span className="flex items-center justify-center gap-1 mx-auto">Weight (%) <HelpCircle size={10} className="text-indigo-400" /></span>
                          </Tooltip>
                        </th>
                      )}
                      <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50 dark:divide-indigo-900/50">
                    <AnimatePresence initial={false}>
                      {assignments.map((a) => (
                        <motion.tr 
                          key={a.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, x: -20 }}
                          className="hover:bg-indigo-50/20 dark:hover:bg-indigo-900/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <Tooltip content="Assignment or Exam title" className="w-full">
                              <input 
                                type="text" 
                                value={a.name}
                                onChange={(e) => updateAssignment(a.id, 'name', e.target.value)}
                                className="w-full bg-indigo-50/50 dark:bg-indigo-950/50 border-2 border-transparent focus:border-indigo-600 dark:focus:border-indigo-500 rounded-xl px-4 py-3 font-black text-indigo-950 dark:text-white text-sm outline-none transition-all shadow-inner"
                              />
                            </Tooltip>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {inputMode === 'PERCENT' ? (
                                <Tooltip content="Enter your grade as a percentage (0-100)">
                                  <input 
                                    type="number" 
                                    value={a.grade}
                                    onChange={(e) => updateAssignment(a.id, 'grade', Number(e.target.value))}
                                    className="w-24 px-4 py-3 bg-white dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-indigo-950 dark:text-white outline-none hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-sm"
                                  />
                                </Tooltip>
                              ) : (
                                <>
                                  <Tooltip content="Points earned">
                                    <input 
                                      type="number" 
                                      value={a.receivedPoints}
                                      placeholder="Got"
                                      onChange={(e) => updateAssignment(a.id, 'receivedPoints', Number(e.target.value))}
                                      className="w-20 px-3 py-3 bg-white dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-indigo-950 dark:text-white outline-none transition-all shadow-sm"
                                    />
                                  </Tooltip>
                                  <span className="text-indigo-400 font-black text-xl">/</span>
                                  <Tooltip content="Total possible points">
                                    <input 
                                      type="number" 
                                      value={a.maxPoints}
                                      placeholder="Total"
                                      onChange={(e) => updateAssignment(a.id, 'maxPoints', Number(e.target.value))}
                                      className="w-20 px-3 py-3 bg-white dark:bg-indigo-950 border-2 border-indigo-200 dark:border-indigo-800 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-xl text-sm font-mono font-black focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-indigo-950 dark:text-white outline-none transition-all shadow-sm"
                                    />
                                  </Tooltip>
                                </>
                              )}
                            </div>
                          </td>
                          {method === 'WEIGHTED' && (
                            <td className="px-6 py-4 text-center">
                              <Tooltip content="Contribution to total grade (0-100)">
                                <input 
                                  type="number" 
                                  value={a.weight}
                                  onChange={(e) => updateAssignment(a.id, 'weight', Number(e.target.value))}
                                  className={cn(
                                    "w-24 px-4 py-3 bg-white dark:bg-indigo-950 border-2 rounded-xl text-sm font-mono font-black focus:ring-4 transition-all shadow-sm outline-none px-4",
                                    totalPossibleWeight > 100 
                                      ? "border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/50" 
                                      : "border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-indigo-100 dark:focus:ring-indigo-900/50"
                                  )}
                                />
                              </Tooltip>
                            </td>
                          )}
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => removeAssignment(a.id)}
                              className="p-2 text-indigo-300 dark:text-indigo-700 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-indigo-50 dark:border-indigo-900/50 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors">
                <Tooltip content="Add a new row for your assignments or exams" className="w-full sm:w-auto">
                  <button 
                    onClick={addAssignment}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                  >
                    <Plus size={18} /> Add Assignment
                  </button>
                </Tooltip>
                {method === 'WEIGHTED' && (
                  <div className={cn(
                    "text-xs font-black px-6 py-3 rounded-2xl shadow-sm border transition-colors",
                    totalPossibleWeight === 100 
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/50" 
                    : "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900/50"
                  )}>
                    Total Weight: {totalPossibleWeight}% {totalPossibleWeight !== 100 && "(MUST BE 100%)"}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed SEO Long-form Content Section */}
            <div className="bg-white dark:bg-indigo-900/20 rounded-[32px] border border-indigo-50 dark:border-indigo-800/50 p-10 shadow-sm space-y-12 transition-colors backdrop-blur-sm">
               <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-4xl font-black tracking-tight text-indigo-950 dark:text-white mb-6">
                    {isPercentageMode ? "Expert Percentage Calculator for Grading" : "Professional Grade Calculator & Online Gradebook"}
                  </h2>
                  <p className="text-lg text-indigo-950/80 dark:text-indigo-100/70 leading-relaxed font-black font-sans">
                    {isPercentageMode 
                      ? "Need to find your test score fast? Our **percentage grades calculator** is the ultimate tool for students and teachers. Whether you're calculating **18 out of 25 percentage** or **12 out of 15 percentage**, our **grading calculator percentage** engine provides instant results."
                      : "Searching for a reliable **grade calculator** to track your academic performance? Whether you need a **test grade calculator** for a single exam or a comprehensive **class grade calculator** for the entire semester, our platform provides professional-grade accuracy."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                     <div className="not-prose p-8 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100/50 dark:border-indigo-800/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950 dark:text-white">Common Test Percentage Results</h3>
                        <ul className="space-y-4 text-sm font-bold text-indigo-800/60 dark:text-indigo-100/60">
                           <li className="flex justify-between"><span>18 out of 25 percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">72.0% (C-)</span></li>
                           <li className="flex justify-between"><span>12 out of 15 percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">80.0% (B-)</span></li>
                           <li className="flex justify-between"><span>13 out of 20 percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">65.0% (D)</span></li>
                           <li className="flex justify-between"><span>14 out of 20 percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">70.0% (C-)</span></li>
                           <li className="flex justify-between"><span>29 out of 35 as a percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">82.9% (B)</span></li>
                           <li className="flex justify-between"><span>12 out of 20:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">60.0% (D-)</span></li>
                           <li className="flex justify-between"><span>16 out of 20 percentage:</span> <span className="text-indigo-600 dark:text-indigo-400 font-black">80.0% (B-)</span></li>
                        </ul>
                     </div>
                     <div className="not-prose p-8 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100/50 dark:border-indigo-800/50">
                        <h3 className="text-xl font-black mb-4 text-indigo-950 dark:text-white">The Best Marking Calculator Online</h3>
                        <p className="text-sm font-bold leading-relaxed text-indigo-800/60 dark:text-indigo-100/60 font-sans">
                           Our **marking calculator** and **scoring a test calculator** are used worldwide. This **grading percentage calculator** supports both simple and weighted averages, giving you a full **my grades calculator** experience.
                        </p>
                     </div>
                  </div>

                  <h3 className="text-2xl font-black text-indigo-950 dark:text-white mt-12 mb-6">Expert Grading Cal & Calculator of Grades</h3>
                  <p className="text-indigo-800/60 dark:text-indigo-100/60 leading-relaxed font-bold font-sans">
                    Our platform is more than just a **calculator for grades**; it is a full **online gradebook calculator**. Designed for flexibility, it supports multiple input modes. If you are a teacher looking for an **easy grader**, simply switch to the "Points" mode to calculate test score percentages instantly.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
                      <h4 className="font-black text-indigo-950 dark:text-white mb-2">1. Grading Calculator Online</h4>
                      <p className="text-xs text-indigo-900/70 dark:text-indigo-100/60 font-bold leading-relaxed font-sans">Calculate class grades where certain items have different weights.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
                      <h4 className="font-black text-indigo-950 dark:text-white mb-2">2. Gradebook Calculator Online</h4>
                      <p className="text-xs text-indigo-900/70 dark:text-indigo-100/60 font-bold leading-relaxed font-sans">Convert raw points (e.g. 18/25) into percentages and letter grades for quick feedback.</p>
                    </div>
                  </div>
                  <p className="text-indigo-800/60 dark:text-indigo-100/60 leading-relaxed font-bold font-sans leading-[1.8]">
                    1. **Grades Calculator**: Use this if all assignments have the same weight. <br/>
                    2. **Grading Cal**: Best for college courses where finals carry more weight. <br/>
                    3. **Scoring a Test Calculator**: Quickly find out your score by entering raw points. <br/>
                    4. **PDF Gradebook**: Generate a report to share with parents or teachers.
                  </p>

                  <div className="not-prose mt-12 p-6 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-800 rounded-2xl">
                    <h4 className="font-black text-indigo-950 dark:text-white mb-4">Related Academic Tools:</h4>
                    <div className="flex flex-wrap gap-4 text-sm font-black">
                      <Link to="/gpa-calculator" className="text-indigo-600 dark:text-indigo-400 hover:underline">GPA Calculator</Link>
                      <span className="text-indigo-300 dark:text-indigo-700">•</span>
                      <Link to="/gpa-calculator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Calculator of CGPA</Link>
                      <span className="text-indigo-300 dark:text-indigo-700">•</span>
                      <Link to="/final-grade-predictor" className="text-indigo-600 dark:text-indigo-400 hover:underline">Final Grade Predictor</Link>
                      <span className="text-indigo-300 dark:text-indigo-700">•</span>
                      <Link to="/percentage-calculator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Percentage Tool</Link>
                      <span className="text-indigo-300 dark:text-indigo-700">•</span>
                      <Link to="/faq" className="text-indigo-600 dark:text-indigo-400 hover:underline">Grading FAQ</Link>
                    </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-indigo-50 dark:border-indigo-900/50 transition-colors">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-indigo-950 dark:text-white">
                    <HelpCircle className="text-indigo-600 dark:text-indigo-400" /> Frequently Asked Questions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {faqsData.map((faq, i) => (
                        <div key={i} className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800 transition-colors">
                          <h4 className="font-black text-indigo-950 dark:text-white mb-3 tracking-tight">{faq.q}</h4>
                          <p className="text-sm text-indigo-950/80 dark:text-indigo-100/70 font-bold leading-relaxed font-sans">{faq.a}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-indigo-900/30 rounded-[32px] border border-indigo-100 dark:border-indigo-800 p-8 shadow-2xl shadow-indigo-900/5 dark:shadow-none transition-colors backdrop-blur-sm sticky top-24">
              <div className="text-center mb-8">
                <div className="text-xs font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-[0.2em] mb-4">Current Results</div>
                <div className="text-8xl font-black text-indigo-600 dark:text-indigo-400 mb-4 leading-none tracking-tighter transition-colors">
                  {formatNum(currentGrade)}<span className="text-4xl opacity-40">%</span>
                </div>
                <div className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded-2xl text-2xl font-black shadow-inner">
                   GRADE: {letterGrade}
                </div>
              </div>

              <div className="h-56 w-full mb-8 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#6366f1" />
                      <Cell fill={theme === 'dark' ? '#1e1b4b' : '#f1f5f9'} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <TrendingUp className="text-indigo-600 dark:text-indigo-400 opacity-20 mb-2 transition-colors" size={48} />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 dark:text-indigo-600">Projected</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setAssignments([])}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-400 rounded-2xl font-black text-sm transition-all border border-indigo-100 dark:border-indigo-800/50"
                >
                  <RotateCcw size={18} /> Reset Data
                </button>
                <button className="w-full flex items-center justify-center gap-3 py-5 border-2 border-indigo-50 dark:border-indigo-900/40 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 text-indigo-900 dark:text-indigo-100 rounded-2xl font-black text-sm transition-all group">
                  <Share2 size={18} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" /> Share Live
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-indigo-50 dark:border-indigo-900/50 transition-colors">
                <h4 className="text-[10px] font-black text-indigo-300 dark:text-indigo-600 uppercase tracking-widest mb-6">Scale Distribution</h4>
                <div className="space-y-4">
                  {(system === 'US' ? GRADES_US : GRADES_INDIA_CBSE).slice(0, 5).map(g => (
                    <div key={g.label} className="flex justify-between items-center text-xs">
                      <span className="font-black text-indigo-950 dark:text-indigo-100 w-8">{g.label}</span>
                      <div className="flex-1 mx-4 h-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden transition-colors">
                        <div className="h-full bg-indigo-600 dark:bg-indigo-400 opacity-60" style={{ width: `${g.min}%` }} />
                      </div>
                      <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400">{g.min}%+</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pro Sidebar */}
            <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="font-black text-2xl mb-3 tracking-tight">Go Pro</h4>
                 <p className="text-indigo-100 text-sm mb-8 font-medium leading-relaxed font-sans">Save reports to cloud, track multiple semesters, and get AI grade predictions.</p>
                 <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-xl active:scale-95">
                    Unlock Premium
                 </button>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for dark mode detection within component
function isDark() {
  return document.documentElement.classList.contains('dark');
}

export default GradePage;
