import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';
import { ArrowLeft, Calendar, HelpCircle, Check } from 'lucide-react';

interface AddTaskViewProps {
  onBack: () => void;
  onAddTaskSubmit: (taskInfo: { title: string; priority: 'high' | 'medium' | 'low'; date?: string }) => void;
}

export default function AddTaskView({ onBack, onAddTaskSubmit }: AddTaskViewProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dateStr, setDateStr] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('할 일을 입력해 주세요!');
      return;
    }

    // Trigger success splash and let it auto-dismiss for excellent UX
    setShowSuccessOverlay(true);
    
    setTimeout(() => {
      onAddTaskSubmit({
        title: title.trim(),
        priority,
        date: dateStr ? dateStr : undefined,
      });
      setShowSuccessOverlay(false);
      onBack();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="w-full max-w-2xl mx-auto pb-12 relative"
    >
      {/* Dynamic Success Overlay Splash Screen */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2ecc71] z-[100] flex flex-col items-center justify-center text-white"
          >
            <div className="text-center space-y-6 px-4">
              <motion.div
                initial={{ scale: 0.3, rotate: -45 }}
                animate={{ scale: [1, 1.15, 1], rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30"
              >
                <Check className="w-16 h-16 stroke-white stroke-[4]" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display font-black text-4xl sm:text-5xl leading-tight"
              >
                추가 완료!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-sans text-sm sm:text-base font-semibold text-white/90"
              >
                이제 리스트에서 확인해보세요.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Header for Add Task */}
      <header className="w-full flex justify-between items-center py-2 mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 text-slate-500 hover:bg-slate-100 rounded-full cursor-pointer hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-sans font-bold text-lg text-slate-800">할 일 추가</h1>
        </div>
        <button
          onClick={() => alert('도움말: 할 일을 먼저 등록하고 빠르게 끝마치면 리스트 전 구간 진행률과 시원한 술잔이 채워집니다!')}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          ❔
        </button>
      </header>

      {/* Motivation Header Banner Card */}
      <div className="mb-8 p-4 bg-white rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.015)] border border-slate-100 flex items-center gap-4">
        {/* Fill Indicator */}
        <div className="relative w-16 h-16 rounded-full bg-slate-50 overflow-hidden border border-slate-200/40 flex-shrink-0">
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "45%" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#006d37] to-[#2ecc71]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl">🍹</span>
          </div>
        </div>
        <div>
          <p className="font-sans font-bold text-xs text-[#006d37] tracking-tight">생산적인 하루의 시작!</p>
          <p className="font-sans text-xs font-semibold text-slate-400 leading-snug mt-0.5">
            이 할 일만 끝내면 시원한 음료가 기다리고 있어요.
          </p>
        </div>
      </div>

      {/* Main Task Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title Input */}
        <div className="space-y-2">
          <label className="font-sans font-bold text-[11px] text-slate-400 uppercase tracking-wider ml-1" htmlFor="task-title">
            어떤 일을 해야 하나요?
          </label>
          <textarea
            className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-[#2ecc71] rounded-2xl p-4 font-sans font-bold text-[#191c1c] text-sm sm:text-base placeholder:text-slate-400/50 transition-all resize-none shadow-[inset_0px_2px_8px_rgba(0,0,0,0.01)] focus:bg-white"
            id="task-title"
            placeholder="과제 제출하기, 팀 미팅 준비..."
            rows={3}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Priority Selection Grid */}
        <div className="space-y-2">
          <label className="font-sans font-bold text-[11px] text-slate-400 uppercase tracking-wider ml-1">
            우선순위
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* High Priority Buttons */}
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`flex flex-col items-center gap-1 p-3.5 rounded-2.5xl transition-all cursor-pointer shadow-sm ${
                priority === 'high'
                  ? 'bg-rose-50 border-2 border-rose-300 ring-2 ring-rose-100'
                  : 'bg-white border-2 border-slate-100/80 hover:border-slate-200'
              }`}
            >
              <span className={`text-[#ba1a1a] font-extrabold text-sm ${priority === 'high' ? 'scale-110' : ''}`}>!</span>
              <span className={`font-sans text-xs font-bold ${priority === 'high' ? 'text-rose-600' : 'text-slate-500'}`}>높음</span>
            </button>

            {/* Medium Priority Button (Default) */}
            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`flex flex-col items-center gap-1 p-3.5 rounded-2.5xl transition-all cursor-pointer shadow-sm ${
                priority === 'medium'
                  ? 'bg-[#2ecc71]/10 border-2 border-[#2ecc71] ring-2 ring-[#2ecc71]/10'
                  : 'bg-white border-2 border-slate-100/80 hover:border-slate-200'
              }`}
            >
              <span className={`text-[#006d37] font-extrabold text-xs leading-none ${priority === 'medium' ? 'scale-115' : ''}`}>═</span>
              <span className={`font-sans text-xs font-bold ${priority === 'medium' ? 'text-[#006d37]' : 'text-slate-500'}`}>중간</span>
            </button>

            {/* Low Priority Button */}
            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`flex flex-col items-center gap-1 p-3.5 rounded-2.5xl transition-all cursor-pointer shadow-sm ${
                priority === 'low'
                  ? 'bg-emerald-50 border-2 border-emerald-300 ring-2 ring-emerald-100'
                  : 'bg-white border-2 border-slate-100/80 hover:border-slate-200'
              }`}
            >
              <span className={`text-[#006d37] font-extrabold text-xs ${priority === 'low' ? 'scale-110' : ''}`}>▼</span>
              <span className={`font-sans text-xs font-bold ${priority === 'low' ? 'text-[#006d37]' : 'text-slate-500'}`}>낮음</span>
            </button>
          </div>
        </div>

        {/* Optional Date Picker card */}
        <div className="space-y-2">
          {!showDatePicker ? (
            <div
              onClick={() => setShowDatePicker(true)}
              className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-dashed border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 text-slate-500">
                <Calendar className="w-5 h-5 text-[#006d37]" />
                <span className="font-sans text-xs sm:text-sm font-semibold">
                  {dateStr ? `선택된 날짜: ${dateStr}` : '날짜 및 시간 설정 (선택)'}
                </span>
              </div>
              <span className="text-slate-400 text-xs font-semibold">
                {dateStr ? '변경하기' : '선택'}
              </span>
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-sans font-bold text-xs text-slate-500">날짜 입력</span>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(false)}
                  className="text-xs text-rose-500 font-bold"
                >
                  닫기
                </button>
              </div>
              <input
                type="date"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none text-xs font-bold focus:border-[#2ecc71]"
                onChange={(e) => setDateStr(e.target.value)}
                value={dateStr}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-[#2ecc71] hover:bg-[#25b361] text-white font-sans font-bold text-sm sm:text-base py-4 rounded-full shadow-[0px_8px_30px_rgba(46,204,113,0.3)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>할 일 추가하기</span>
          </motion.button>
        </div>
      </form>

      {/* Visual Polish Decor at bottom */}
      <div className="mt-14 flex flex-col items-center justify-center opacity-40 select-none pointer-events-none">
        <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-transparent mb-3" />
        <p className="font-sans italic text-[11px] text-slate-400 font-bold">
          Freshly brewed productivity just for you.
        </p>
      </div>
    </motion.div>
  );
}
