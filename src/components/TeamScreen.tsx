import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Member } from '../types';
import { Users, Send, Plus, CheckCircle2 } from 'lucide-react';

interface TeamScreenProps {
  members: Member[];
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onInviteMember: (email: string) => void;
  onStartRoom: () => void;
}

export default function TeamScreen({
  members,
  projectName,
  onProjectNameChange,
  onInviteMember,
  onStartRoom,
}: TeamScreenProps) {
  const [emailInput, setEmailInput] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    onInviteMember(emailInput);
    setInvitedEmail(emailInput);
    setSuccessToast(true);
    setEmailInput('');
    
    setTimeout(() => {
      setSuccessToast(false);
    }, 2500);
  };

  const activeCount = members.filter((m) => m.active).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-xl mx-auto pb-12 relative"
    >
      {/* Toast Notification for successful Invitation */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99] bg-[#006d37] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-sm w-[90%] border border-[#2ecc71]/20 font-sans font-medium text-xs sm:text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-[#6bfe9c] shrink-0" />
            <span className="truncate">
              <strong>{invitedEmail}</strong> 님께 초대를 보냈습니다!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <section className="mb-6">
        <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight mb-1">새 프로젝트 룸 만들기</h2>
        <p className="text-slate-500 font-sans text-sm font-medium">팀의 다음 승리를 위한 무대를 준비하세요.</p>
      </section>

      {/* Project Form Canvas */}
      <div className="space-y-5">
        {/* Input Section: Project Name */}
        <div className="bg-white rounded-3xl p-5 shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100">
          <label className="font-sans font-bold text-xs text-[#006d37] mb-2 block tracking-tight" htmlFor="project-name">
            프로젝트 이름
          </label>
          <input
            className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-[#2ecc71] rounded-2xl px-4 py-3 font-sans font-bold text-slate-700 placeholder:text-slate-400/60 transition-all outline-none"
            id="project-name"
            placeholder="예: 기말고사 뒤풀이"
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
          />
        </div>

        {/* Invite Section */}
        <div className="bg-white rounded-3xl p-5 shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#496800]" />
            <h3 className="font-sans font-extrabold text-slate-700 text-sm sm:text-base">팀원 초대하기</h3>
          </div>
          <form onSubmit={handleInviteSubmit} className="flex flex-col gap-3">
            <input
              className="w-full bg-slate-50 border-0 focus:ring-2 focus:ring-[#2ecc71] rounded-2xl px-4 py-3 font-sans font-semibold text-slate-700 transition-all outline-none text-sm placeholder:text-slate-400/50"
              placeholder="팀원의 이메일을 입력하세요"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#2ecc71] hover:bg-[#25b361] text-white font-sans font-bold text-sm py-3.5 rounded-full shadow-[0px_6px_20px_rgba(46,204,113,0.2)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>초대 보내기</span>
            </motion.button>
          </form>
        </div>

        {/* Current Members Section */}
        <div className="bg-white rounded-3xl p-5 shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sans font-bold tracking-wider text-[11px] text-slate-400 block uppercase">
              현재 참여 중인 팀원
            </h3>
            <span className="bg-[#c2f366]/40 text-[#364e00] px-3 py-1 rounded-full font-sans text-[11px] font-bold">
              {members.length}명 활동 중
            </span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar items-center">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col items-center flex-shrink-0 gap-1.5 group select-none relative">
                <div className="relative">
                  <img
                    alt={member.name}
                    className={`w-14 h-14 rounded-full object-cover border-2 ${
                      member.active ? 'border-[#2ecc71]' : 'border-slate-200'
                    }`}
                    referrerPolicy="no-referrer"
                    src={member.avatarUrl}
                  />
                  {member.active && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#2ecc71] rounded-full border-2 border-white" />
                  )}
                </div>
                <span className="font-sans font-bold text-xs text-slate-600 truncate max-w-[64px] text-center">
                  {member.name}
                </span>
              </div>
            ))}

            {/* Simulated Add Link Button */}
            <button 
              type="button"
              onClick={() => {
                const mail = prompt('새 회원의 임시 이름을 입력하세요:');
                if (mail?.trim()) {
                  onInviteMember(mail.trim() + '@gmail.com');
                }
              }}
              className="flex flex-col items-center flex-shrink-0 gap-1.5 active:scale-90 transition-transform cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[#2ecc71] hover:text-[#2ecc71] transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-xs text-slate-400">추가</span>
            </button>
          </div>
        </div>
      </div>

      {/* Final Action */}
      <div className="mt-8 gap-3 flex flex-col w-full">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onStartRoom}
          className="w-full bg-[#006d37] hover:bg-[#005027] text-white py-4 px-6 rounded-full font-sans text-base font-bold flex items-center justify-center gap-2 shadow-[0px_8px_30px_rgba(0,109,55,0.25)] cursor-pointer"
        >
          <span>룸 시작하기</span>
        </motion.button>
        <button 
          onClick={() => {
            alert('임시 저장이 완료되었습니다!');
          }}
          className="w-full text-[#006d37] hover:text-[#005027] hover:underline font-sans text-xs font-bold py-2 tracking-tight transition-all cursor-pointer"
        >
          임시 저장
        </button>
      </div>
    </motion.div>
  );
}
