import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronRight, Search, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';

const posts = [
  {
    id: 1,
    title: "How to Calculate Weighted Grades Like a Pro",
    excerpt: "Learn the exact math behind weighted assignments and how categories like 'Final Exam' or 'Homework' affect your GPA.",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    category: "Study Tips",
    author: "Alex Johnson",
    slug: "calculate-weighted-grades"
  },
  {
    id: 2,
    title: "The Ultimate Guide to US vs Indian Grading Systems",
    excerpt: "A comprehensive look at GPA (4.0 scale) vs CGPA (10.0 scale) and how to convert your marks for study abroad applications.",
    date: "Nov 05, 2023",
    readTime: "8 min read",
    category: "Admissions",
    author: "Dr. Meera Rao",
    slug: "us-vs-indian-grading"
  },
  {
    id: 3,
    title: "5 Strategies to Boost Your GPA in Final Semester",
    excerpt: "Struggling to bring up your average? These five proven strategies helped 90% of our student beta-testers hit their goal.",
    date: "Dec 15, 2023",
    readTime: "6 min read",
    category: "Motivation",
    author: "Sam Wilson",
    slug: "boost-gpa-strategies"
  },
  {
    id: 4,
    title: "Understanding the 'Bell Curve' in University Grading",
    excerpt: "What does it mean when a professor 'curves' the grades? We break down the normal distribution and its impact on your class rank.",
    date: "Jan 10, 2024",
    readTime: "7 min read",
    category: "Academics",
    author: "Prof. Sarah Lane",
    slug: "bell-curve-grading"
  },
  {
    id: 5,
    title: "Finals Week Survival Guide: Stress Management for Students",
    excerpt: "Managing your mental health while aiming for a 4.0. Tips on sleep, nutrition, and efficient study sessions.",
    date: "Feb 22, 2024",
    readTime: "10 min read",
    category: "Wellness",
    author: "Emma White",
    slug: "finals-survival-guide"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-indigo-50/20 pb-24">
      <SEO 
        title="Student Success Blog - Study Tips, Grade Hacks & More"
        description="Read the latest articles on grade calculation, study strategies, and academic success from our academic editors."
      />

      {/* Header */}
      <div className="bg-indigo-950 py-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Expert <span className="text-indigo-400">Insights</span></h1>
            <p className="text-indigo-100/80 text-lg max-w-2xl mx-auto font-black">Master your academics with our research-backed guides and student success stories.</p>
          </motion.div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 gap-12">
              {posts.map((post, idx) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col md:flex-row gap-8 items-start bg-white p-6 rounded-[40px] border border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all"
                >
                  <div className="w-full md:w-64 h-48 bg-indigo-50 rounded-[32px] overflow-hidden flex-shrink-0 relative">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="w-full h-full flex items-center justify-center text-indigo-200">
                        <Tag size={48} className="group-hover:scale-110 transition-transform duration-500" />
                     </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{post.category}</span>
                      <span className="text-xs text-indigo-300 font-bold flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-black text-indigo-950 mb-4 group-hover:text-indigo-600 transition-colors tracking-tight">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-indigo-950/80 mb-6 leading-relaxed line-clamp-2 md:line-clamp-3 font-bold">
                       {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 overflow-hidden border border-indigo-100" />
                          <span className="text-xs font-black text-indigo-950">{post.author}</span>
                       </div>
                       <Link to={`/blog/${post.slug}`} className="text-indigo-600 font-black text-sm flex items-center hover:translate-x-1 transition-transform">
                          Read More <ChevronRight size={16} />
                       </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-12">
            <div className="bg-white p-8 rounded-[40px] border border-indigo-100 shadow-sm">
               <h4 className="text-xl font-black mb-6 text-indigo-950">Search Articles</h4>
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Keywords..."
                    className="w-full p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-black text-indigo-950 pr-12 placeholder:text-indigo-200"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300" size={20} />
               </div>
            </div>

            <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl shadow-indigo-500/10 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-xl font-black mb-4">Suggest a Topic</h4>
                 <p className="text-indigo-100/70 text-sm mb-6 leading-relaxed font-bold">Want us to cover a specific academic topic? Send us your ideas and we might feature you.</p>
                 <button className="w-full py-4 bg-white text-indigo-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-50 transition-all active:scale-95">
                    Submit Idea
                 </button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/50 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest px-4">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                 {['GPA', 'StudyAbroad', 'Calculus', 'Motivation', 'ExamHacks', 'Psychology', 'CollegeLife'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-black text-indigo-600 cursor-pointer hover:border-indigo-500 hover:text-indigo-700 transition-colors shadow-sm">
                      #{tag}
                    </span>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
