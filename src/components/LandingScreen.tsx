import { motion } from 'motion/react';
import { Sparkles, Calendar, GlassWater } from 'lucide-react';

interface LandingScreenProps {
  onStartRace: () => void;
  onNavigateToTab: (tab: 'tasks' | 'team' | 'profile') => void;
}

export default function LandingScreen({ onStartRace, onNavigateToTab }: LandingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center max-w-md mx-auto w-full pb-10"
    >
      {/* Background Ambient Glowing spheres */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-[#2ecc71] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-[#a2d149] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Hero Visual Section */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square mb-8 group mt-2">
        <div className="absolute inset-0 bg-[#2ecc71] opacity-10 rounded-[2rem] blur-2xl group-hover:opacity-15 transition-opacity" />
        <img
          alt="Joyful university students laughing in a bright, modern lounge"
          className="w-full h-full object-cover rounded-[2rem] shadow-[0px_20px_50px_rgba(46,204,113,0.15)] relative z-10 border border-white/40"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEDH3lZgQ-KS-Br6WDu-HvOE_dphVuHzT0J5VHPDPgPAVbsOg5vJnZPLO-dZ3c8pzzzMDpaBkU-30CQY-mtZ6rzu7yrVlv7WENyuwWdycGMT_FJFmGEH4KT1YKmO23QY5Ef01c9tNOeWV54b3sjpGYNbR023TrapqeMZ_WzFjSHqTOh92XssCx2gZi-pp4Wq4bnCcHMaliqZht6hDUJBzX5xUMrmQYxfFADXgmapMsJdA_k2ZrK10oKCi5x3-U-ozS4BaKOjZe"
        />
        
        {/* Liquid Fill Indicator Mock */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-4 -right-2 bg-white p-4 rounded-2xl shadow-[0px_10px_35px_rgba(0,0,0,0.08)] z-20 flex flex-col items-center gap-1.5 border border-slate-100"
        >
          <div className="w-8 h-16 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
            <motion.div 
              initial={{ height: "0%" }}
              animate={{ height: "75%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#006d37] to-[#2ecc71]"
            />
          </div>
          <span className="font-sans text-xs font-semibold text-[#006d37] tracking-tight">75% 충전됨</span>
        </motion.div>
      </div>

      {/* Headlines */}
      <h2 className="text-center font-bold text-slate-800 text-[26px] leading-[34px] tracking-tight mb-4 select-none">
        할 일은 빠르게,<br />
        <span className="text-[#006d37] italic font-extrabold tracking-tighter">술자리는 즐겁게!</span>
      </h2>
      <p className="text-center text-slate-500 font-sans text-sm font-medium mb-8 max-w-xs leading-relaxed">
        더 나은 밤을 위한 대학생 필수 할 일 관리 파트너
      </p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartRace}
        className="w-full py-4 px-6 bg-[#2ecc71] hover:bg-[#27ae60] active:scale-[0.98] text-white font-sans text-base font-bold rounded-full transition-all shadow-[0px_8px_30px_rgba(46,204,113,0.35)] flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>빨리 끝내고 마시러 가기!</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.button>

      {/* Secondary Action */}
      <button 
        onClick={() => onNavigateToTab('profile')}
        className="mt-6 font-sans text-xs font-semibold text-slate-500 hover:text-[#006d37] transition-colors flex items-center gap-1.5 py-1 px-3 cursor-pointer rounded-full hover:bg-slate-50"
      >
        <span>사용법 알아보기</span>
        <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Features Bento */}
      <div className="grid grid-cols-1 gap-4 mt-8 w-full">
        {/* Bento Card 1 */}
        <div className="bg-white p-4 rounded-2xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-slate-100/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#c2f366]/20 flex items-center justify-center text-[#4d6e00] shrink-0">
            <Sparkles className="w-5 h-5 text-[#496800]" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800">생산성 해킹</h3>
            <p className="text-xs text-slate-400 font-medium">가장 중요한 일에 집중하세요.</p>
          </div>
        </div>

        {/* Bento Card 2 */}
        <div className="bg-white p-4 rounded-2xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-slate-100/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#6bfe9c]/20 flex items-center justify-center text-[#006d37] shrink-0">
            <GlassWater className="w-5 h-5 text-[#006d37]" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-800">보상 시스템</h3>
            <p className="text-xs text-slate-400 font-medium">일을 마칠수록 즐거운 목표가 열립니다.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
