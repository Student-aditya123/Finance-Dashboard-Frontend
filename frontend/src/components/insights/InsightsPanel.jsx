import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Download, RotateCcw, Share2, 
  MoreHorizontal, ChevronRight, PieChart, 
  Target, Zap, ArrowUpRight 
} from 'lucide-react';
import transactions from '../../data/transactions';
import exportToCSV from '../../utils/exportToCSV';

const AnalyticsIllustration = () => (
  <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <rect x="20" y="100" width="30" height="40" rx="4" fill="#6366F1" fillOpacity="0.2" />
    <rect x="60" y="70" width="30" height="70" rx="4" fill="#6366F1" fillOpacity="0.4" />
    <rect x="100" y="40" width="30" height="100" rx="4" fill="#6366F1" fillOpacity="0.6" />
    <rect x="140" y="85" width="30" height="55" rx="4" fill="#6366F1" fillOpacity="0.3" />
    <path d="M20 90L60 60L100 30L145 75" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="145" cy="75" r="6" fill="#6366F1" />
  </svg>
);


const InsightsPage = () => {
  // --- DATA PROCESSING ENGINE ---
  const insights = useMemo(() => {
    const now = new Date();
    const currMonth = now.getMonth();
    const prevMonth = currMonth === 0 ? 11 : currMonth - 1;

    const getMonthlyExp = (m) => transactions
      .filter(t => new Date(t.date).getMonth() === m && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const currTotal = getMonthlyExp(currMonth);
    const prevTotal = getMonthlyExp(prevMonth);
    const diff = currTotal - prevTotal;
    const percentageInc = prevTotal === 0 ? 100 : ((diff / prevTotal) * 100).toFixed(0);

    // Group by category for the breakdown
    const catTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCats[0] || ["N/A", 0];

    return { topCat, currTotal, prevTotal, diff, percentageInc, sortedCats };
  }, []);

  return (
    <div className="ml-64 min-h-screen from-slate-900/90 via-slate-800/80 to-slate-900/90 border-white/10 p-8 flex flex-col gap-8">
      
      {/* Header Area */}
      <header className="flex justify-between items-center px-4 bg-gray-700 rounded-2xl py-6 shadow-sm border border-gray-600">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Insights</h1>
          {/* <p className="text-slate-500 font-medium">Detailed analysis of your spending behavior.</p> */}
        </div>
        <div className="flex gap-3">
           <button className="p-3 bg-gray-600 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-500 transition-colors">
              <RotateCcw size={20} />
           </button>
           <button className="p-3 bg-gray-600 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-500 transition-colors">
              <Share2 size={20} />
           </button>
        </div>
      </header>

      {/* Main Content Grid: Covers the remaining space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Your Specific Insight Card (4 of 12 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 bg-gray-800 rounded-2xl p-8  shadow-xl shadow-blue-900/5 border border-gray-600 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-extrabold text-md tracking-tight">Insights</h2>
            <MoreHorizontal className="text-slate-300 cursor-pointer" />
          </div>

          {/* Top Spending Category */}
          <div className="space-y-1 mb-4">
            <p className="text-slate-400 text-sm font-normal uppercase tracking-wider">Top Spending Category</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-900 capitalize">{insights.topCat[0]}</span>
                <TrendingUp size={30} className="text-emerald-500" />
              </div>
              <span className="text-emerald-500 font-black text-xl">
                +₹{insights.topCat[1].toLocaleString()}
              </span>
            </div>
          </div>

          <hr className="border-gray-600 mb-6" />

          {/* Expense Trend */}
          <div className="space-y-3 mb-8">
            <p className="text-white font-extrabold text-md tracking-tight">Expense Trend</p>
            <p className="text-sm font-normal text-slate-400">
              Increased by <span className="text-emerald-500 underline  underline-offset-4 font-bold">₹{insights.diff.toLocaleString()}</span> this month
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              You've spent most on {insights.topCat[0].toLowerCase()} this month, setting a budget might help you save.
            </p>
          </div>
          
          <hr className="border-gray-600 mb-6" />

          {/* Monthly Comparison */}
          <div className="space-y-4 mb-8">
            <p className="text-white font-extrabold text-md tracking-tight">Monthly Comparison</p>
            <div className="from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-gray-900 rounded-1xl p-6 shadow-lg space-y-10 mb-15">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-bold text-slate-500">
                  April <span className="text-slate-300 font-normal italic">vs</span> March
                </div>
                <span className="text-emerald-500 font-black text-sm">+{insights.percentageInc}%</span>
              </div>
               <hr className="border-gray-600 mb-6" />
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-500">₹{insights.currTotal.toLocaleString()}</span>
                <span className="text-slate-300 font-normal italic">vs</span>
                <span className="text-xl font-bold text-rose-400">₹{insights.prevTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <button 
            onClick={() => exportToCSV(transactions, 'Financial_Report.csv')}
            className="w-full space-y-2 bg-blue-600 hover:bg-indigo-600 hover:text-white text-slate-900 font-black py-4 rounded-3xl flex items-center justify-center gap-2 transition-all active:scale-95 mb-8"
          >
            <Download size={18} />
            EXPORT CSV
          </button>

          {/* Illustration Section */}
             {/* Illustration & Footer Section */}
           <div className="mt-auto">
              <div className="bg-gray-700 rounded-[2.1rem] p-6 flex justify-center border border-indigo-50/50">
                    <AnalyticsIllustration />
              </div>    
                {/* <div className="flex justify-around items-center mt-8 text-slate-300">
                    <RotateCcw size={20} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                    <Share2 size={20} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                    <MoreHorizontal size={20} className="hover:text-indigo-500 cursor-pointer transition-colors" />
                </div> */}
           </div>
        </motion.div>

        {/* RIGHT COLUMN: Supporting Data (8 of 12 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Top Banner: Smart Advice */}
          <div className="bg-lineear-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white flex justify-between items-center shadow-xl shadow-gray-800/20 border border-gray-700">
            <div className="max-w-md space-y-2">
              {/* <div className="flex items-center gap-2 text-indigo-200 text-xs font-black uppercase tracking-[0.2em]">
                <Zap size={14} fill="currentColor" /> AI Recommendation
              </div> */}
              <h3 className="text-white font-extrabold text-md tracking-tight">Optimization Opportunity</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">By reducing your {insights.topCat[0].toLowerCase()} spending by just 10%, you could reach your Europe trip goal 2 months faster.</p>
            </div>
            <button className="bg-blue-800 text-gray-800 px-6 py-3 rounded-2xl font-black text-xs hover:text-white w-full transition-all uppercase whitespace-nowrap">
              Adjust Budget
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Breakdown List */}
            <div className="from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-gray-600 rounded-2xl  p-8 shadow-2xs">
              <h3 className="text-white font-extrabold text-md tracking-tight uppercase   mb-6 flex items-center gap-2">
                <PieChart size={20} className="text-indigo-500" /> Spending Distribution
              </h3>
              <div className="space-y-5">
                {insights.sortedCats.slice(0, 4).map(([name, value], i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-green-200 capitalize">{name}</span>
                      <span className="font-extrabold text-emerald-500">₹{value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(value / insights.currTotal) * 100}%` }}
                        className="bg-indigo-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Large Transactions */}
            <div className="from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-gray-600 rounded-2xl p-8 shadow-2xs flex flex-col">
              <h3 className="text-white font-bold text-md tracking-tight uppercase  mb-6 flex items-center gap-2">
                <Target size={20} className="text-red-500" /> High-Impact Expenses
              </h3>
              <div className="space-y-4 flex-1">
                {transactions.filter(t => t.amount > 5000).slice(0, 3).map((t, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-700 rounded-2xl border border-blue-500 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-800  flex items-center justify-center text-slate-300 font-bold rounded-full">
                        <ArrowUpRight size={22} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm capitalize">{t.category}</p>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase">{t.date}</p>
                      </div>
                    </div>
                    <p className="text-emerald-500 font-black text-sm">₹{t.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs font-black text-indigo-500 flex items-center justify-center gap-1 hover:gap-4 transition-all uppercase tracking-widest shadow-sm shadow-gray-800/20">
                See Audit Log <ChevronRight size={20}/>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
