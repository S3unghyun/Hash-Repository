import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';
import { Trash2, CheckCircle2 } from 'lucide-react';

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTaskClick: () => void;
}

export default function TasksScreen({
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTaskClick,
}: TasksScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Parallax Tilt effect on empty state card matching JS from template
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = (y - rect.height / 2) / 12;
    const rotateY = -(x - rect.width / 2) / 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Get localized sub-text for progress bar
  const getProgressSubText = (percent: number) => {
    if (totalCount === 0) return "아직 레이스가 시작되지 않았습니다.";
    if (percent === 0) return "첫 번째 할 일을 마쳐 레벨을 올려보세요!";
    if (percent < 40) return "좋은 시작입니다! 차츰차츰 채워나가 볼까요?";
    if (percent < 80) return "생산성 최고조! 절반이 조금 넘었네요!";
    if (percent < 100) return "거의 다 왔어요! 시원한 음료가 멀지 않았습니다!";
    return "완벽합니다! 과제 종료, 술자리 고! 축하합니다! 🎉";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-2xl mx-auto pb-12"
      ref={containerRef}
    >
      {/* Header Section */}
      <div className="w-full mb-8 text-left">
        <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight mb-1">주간 레이스</h2>
        <p className="text-slate-500 font-sans text-sm font-medium">할 일을 추가하고 즐거운 주말을 맞이하세요.</p>
      </div>

      {totalCount === 0 ? (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-6 space-y-6">
          {/* Interactive Tilt Area */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-64 h-64 flex items-center justify-center cursor-pointer transition-all duration-200 ease-out active:scale-95"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-2 bg-[#2ecc71] opacity-10 blur-3xl rounded-full" />
            
            {/* Main Illustration Image */}
            <div 
              className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-white rounded-3xl shadow-[0px_15px_35px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden"
              style={{ transform: 'translateZ(10px)' }}
            >
              <img
                alt="Empty state cocktail cup with lime illustration"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOuKw1znxLRm6uIEE9p59CYtu_Hoox14r3gp-nIrH_Zs9VRQ8yTV1buHqX6wuYX07mdneihISoLYAEFHINxJ3RbivEfO2RmShUDLkxURqpmMMoiKTnfAOd-EhS0CngVtX2I_aQfEtY6lX3F76syWFUgs6zRbMnKcDlJpURYh5tZ3NdTJuLIwlWV1GP-EUN5UvUXwSdpSa15s3e69JQTm1S6LFi1nHogT03dQtMYHlrkqAtjpOK0fHfTnc1ZO6ULY6CqisrE5kE"
              />
              {/* Overlay Message Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100/60 flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#006d37] font-semibold text-xs flex items-center gap-1">
                  🍶 텅 비어있어요!
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg text-slate-800">할 일이 아직 없네요</h3>
            <p className="text-slate-400 font-sans text-xs font-semibold max-w-xs mx-auto leading-relaxed">
              이번 주의 레이스를 시작할 준비가 되셨나요?<br />첫 번째 할 일을 추가하고 주말을 향해 달려보세요!
            </p>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddTaskClick}
            className="flex items-center gap-2 bg-[#2ecc71] hover:bg-[#25b361] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-[0px_8px_25px_rgba(46,204,113,0.3)] transition-all cursor-pointer"
          >
            <span>+ 할 일 추가하기</span>
          </motion.button>
        </div>
      ) : (
        /* Todo List Section */
        <div className="space-y-4">
          {/* Quick Header */}
          <div className="flex justify-between items-center px-1">
            <span className="text-slate-400 font-bold text-xs">나의 할 일 ({completedCount}/{totalCount})</span>
            <button
              onClick={onAddTaskClick}
              className="text-[#006d37] hover:text-[#005027] font-bold text-xs flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              + 추가하기
            </button>
          </div>

          {/* List items with stagger animation */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className={`bg-white p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between shadow-[0px_6px_20px_rgba(0,0,0,0.015)] ${
                    task.completed ? 'border-emerald-100/80 bg-emerald-50/10' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0 mr-2">
                    {/* Checkbox wrapper with spring scale */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => onToggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer select-none shrink-0 ${
                        task.completed
                          ? 'border-[#2ecc71] bg-[#2ecc71] text-white'
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle2 className="w-4.5 h-4.5 fill-white stroke-[#2ecc71] stroke-[2]" />
                      )}
                    </motion.button>

                    {/* Task Content */}
                    <div className="min-w-0" onClick={() => onToggleTask(task.id)}>
                      <p
                        className={`font-sans font-bold text-sm leading-snug cursor-pointer select-none break-words ${
                          task.completed ? 'line-through text-slate-400 font-medium' : 'text-slate-700'
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.date && (
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                          <span>📅 {task.date}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Priority Tag */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full select-none ${
                        task.priority === 'high'
                          ? 'bg-rose-50 text-rose-500 border border-rose-100'
                          : task.priority === 'medium'
                          ? 'bg-amber-50 text-amber-500 border border-amber-100'
                          : 'bg-[#2ecc71]/10 text-[#006d37] border border-emerald-100'
                      }`}
                    >
                      {task.priority === 'high' ? '높음' : task.priority === 'medium' ? '중간' : '낮음'}
                    </span>

                    {/* Delete action */}
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1 px-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Progress Card Section */}
      <div className="w-full mt-8 p-5 bg-slate-50/80 rounded-3xl border border-slate-100">
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="font-sans font-bold tracking-wider text-[11px] text-slate-400 block uppercase">
              레이스 진행률
            </span>
            <span className="font-display font-extrabold text-2xl text-[#006d37]">
              {progressPercent}%
            </span>
          </div>
          
          {/* Party Popper Icon reacting to 100% */}
          <motion.div
            animate={progressPercent === 100 ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            className={`text-2xl ${progressPercent === 100 ? 'text-[#2ecc71]' : 'text-slate-300'}`}
          >
            🎉
          </motion.div>
        </div>

        {/* Progress Bar Container */}
        <div className="h-4 w-full bg-slate-200/60 rounded-full overflow-hidden border border-slate-200/20">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="h-full bg-gradient-to-r from-[#2ecc71] to-[#006d37] rounded-full"
          />
        </div>
        <p className="mt-3 font-sans text-xs italic text-slate-400 font-semibold">
          {getProgressSubText(progressPercent)}
        </p>
      </div>
    </motion.div>
  );
}
