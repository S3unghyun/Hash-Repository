import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData } from '../types';
import { Mail, Trophy, CheckCircle2, Copy, Lock, Bell, LogOut, ChevronRight, FileCode2, User } from 'lucide-react';
import { PYTHON_CODE_CONTENT } from '../pythonCode';

interface ProfileScreenProps {
  profile: ProfileData;
  onUpdateEmail: (email: string) => void;
  onVerifyEmail: () => void;
  completedTasks: number;
  totalTasks: number;
}

export default function ProfileScreen({
  profile,
  onUpdateEmail,
  onVerifyEmail,
  completedTasks,
  totalTasks,
}: ProfileScreenProps) {
  const [emailInput, setEmailInput] = useState(profile.email);
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'python'>('info');
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [copyShareCodeSuccess, setCopyShareCodeSuccess] = useState(false);
  const [emailStatusToast, setEmailStatusToast] = useState(false);

  const handleVerifyEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEmail(emailInput);
    onVerifyEmail();
    setEmailStatusToast(true);
    setTimeout(() => setEmailStatusToast(false), 2500);
  };

  const copyShareCode = () => {
    navigator.clipboard.writeText(profile.invitationCode);
    setCopyShareCodeSuccess(true);
    setTimeout(() => setCopyShareCodeSuccess(false), 2000);
  };

  const copyPythonCode = () => {
    navigator.clipboard.writeText(PYTHON_CODE_CONTENT);
    setCopyCodeSuccess(true);
    TimeRanges;
    setTimeout(() => setCopyCodeSuccess(false), 2000);
  };

  // Glass liquid percentage calculation
  const liquidPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-2xl mx-auto pb-16"
    >
      {/* Toast Overlay notifications */}
      <AnimatePresence>
        {copyShareCodeSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99] bg-[#006d37] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#2ecc71]/20 font-sans font-bold text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#6bfe9c]" />
            <span>초대 코드가 클립보드에 복사되었습니다!</span>
          </motion.div>
        )}

        {copyCodeSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99] bg-[#006d37] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#2ecc71]/20 font-sans font-bold text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#6bfe9c]" />
            <span>Python Streamlit 소스코드가 복사되었습니다!</span>
          </motion.div>
        )}

        {emailStatusToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99] bg-[#006d37] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#2ecc71]/20 font-sans font-bold text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#6bfe9c]" />
            <span>{emailInput} 주소로 학교 인증메일을 발송했습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sub tabs: Profile info vs Python Code Guide */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 mb-6">
        <button
          onClick={() => setActiveSubTab('info')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'info' ? 'bg-white shadow-sm text-[#006d37]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4.5 h-4.5" />
          <span>프로필 설정</span>
        </button>
        <button
          onClick={() => setActiveSubTab('python')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'python' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCode2 className="w-4.5 h-4.5" />
          <span>파이썬 소스 코드 🐍</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'info' ? (
          <motion.div
            key="profile-info-div"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Header Block */}
            <section className="flex flex-col items-center gap-4 py-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                  <img
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    src={profile.avatarUrl}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert('프로필 편집 기능은 데모 버전에서 지원을 준비 중입니다.')}
                  className="absolute bottom-1 right-1 bg-[#2ecc71] hover:bg-[#25b361] text-white p-2 rounded-full shadow-md active:scale-90 transition-transform cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <h2 className="font-extrabold text-[#006d37] text-xl sm:text-2xl tracking-tight leading-snug">
                  {profile.name} <span className="text-slate-400 font-medium text-sm sm:text-base">({profile.englishName})</span>
                </h2>
                <p className="text-slate-400 font-sans text-xs sm:text-sm font-semibold tracking-tight mt-0.5">
                  {profile.university}
                </p>
              </div>
            </section>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Registration */}
              <div className="bg-white p-5 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-[#2ecc71]" />
                    <h3 className="font-sans font-bold text-xs tracking-wider text-slate-400 uppercase">
                      Email Registration
                    </h3>
                  </div>
                  <form onSubmit={handleVerifyEmailSubmit}>
                    <div className="space-y-1">
                      <label className="block font-sans font-semibold text-[11px] text-slate-400 px-1" htmlFor="email">
                        Your University Email
                      </label>
                      <input
                        className="w-full bg-[#f0f2f2] border-0 rounded-2xl px-4 py-2.5 font-sans font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-[#2ecc71] transition-all text-xs"
                        id="email"
                        placeholder="name@univ.edu"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 w-full bg-[#006d37] hover:bg-[#005027] text-white font-sans font-bold py-2.5 rounded-full text-xs active:scale-95 transition-transform cursor-pointer"
                    >
                      Verify Email
                    </button>
                  </form>
                </div>
              </div>

              {/* Invitation Code */}
              <div className="bg-white p-5 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-1 right-1 opacity-5 pointer-events-none">
                  <Trophy className="w-24 h-24 text-[#2ecc71]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-[#2ecc71]" />
                    <h3 className="font-sans font-bold text-xs tracking-wider text-slate-400 uppercase">
                      Your Invitation
                    </h3>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-center border border-dashed border-slate-200">
                    <span className="block font-sans font-bold text-[10px] text-slate-400 mb-0.5">SHARE CODE</span>
                    <div className="font-display font-black text-2xl text-[#006d37] tracking-widest leading-none py-1 select-all select-none">
                      {profile.invitationCode}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 pt-2">
                  <p className="font-sans text-[11px] leading-relaxed text-slate-400">
                    Invite friends to unlock <span className="text-[#2ecc71] font-bold">Premium Lime</span> rewards.
                  </p>
                  <button
                    onClick={copyShareCode}
                    className="p-2 bg-[#c2f366]/40 text-[#4d6e00] hover:bg-[#c2f366]/60 rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Task Progress / Fluid Fill Card (Desktop col span 2) */}
              <div className="bg-white p-5 rounded-3xl shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100 sm:col-span-2 flex items-center justify-between gap-4 overflow-hidden">
                <div className="flex-1">
                  <h3 className="font-sans font-extrabold text-slate-700 text-sm sm:text-base leading-snug">
                    Daily Progress
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold mb-4 mt-0.5">
                    Finish your tasks to earn your reward.
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-[#2ecc71]/15 text-[#006d37] px-3 py-1 rounded-full text-[11px] font-bold">
                      {completedTasks}/{totalTasks} Tasks Completed
                    </span>
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[11px] font-bold">
                      {completedTasks === totalTasks && totalTasks > 0 ? "Reward Earned!" : "Reward Pending"}
                    </span>
                  </div>
                </div>

                {/* Cocktail Glass Graphic with Liquid filling up */}
                <div
                  onClick={() => alert('할 일을 완료할수록 컵이 차오릅니다! 빈 컵을 꿀꺽 축하해보세요 🍶')}
                  className="w-20 h-28 rounded-2xl bg-slate-50 relative overflow-hidden flex items-end justify-center group cursor-pointer border border-slate-100/40 shrink-0 select-none shadow-[inset_0px_2px_8px_rgba(0,0,0,0.01)] hover:scale-105 transition-transform"
                >
                  {/* Liquid fill absolute indicator */}
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: `${liquidPercent}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 10 }}
                    style={{ height: `${liquidPercent}%` }}
                    className="w-full absolute bottom-0 left-0 bg-gradient-to-t from-[#006d37] to-[#2ecc71]"
                  />
                  
                  {/* Glass overlay symbol */}
                  <span className="text-xl text-white relative z-10 mb-4 group-hover:scale-125 transition-transform duration-500 font-bold select-none">
                    🍶
                  </span>
                </div>
              </div>
            </div>

            {/* Account Settings List */}
            <section className="space-y-2 pt-2">
              <h4 className="font-sans font-bold text-xs tracking-wider text-slate-400 uppercase px-1">
                SETTINGS
              </h4>
              <div className="bg-white rounded-3xl overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.015)] border border-slate-100 divide-y divide-slate-100">
                <button
                  onClick={() => alert('개인정보 관리는 데모 버전에서 보호되고 있습니다.')}
                  className="w-full flex items-center gap-3.5 p-4 hover:bg-slate-50/50 transition-colors text-left group cursor-pointer"
                >
                  <Lock className="w-5 h-5 text-slate-400 group-hover:text-[#2ecc71] transition-colors" />
                  <span className="flex-1 font-sans font-semibold text-slate-600 text-sm">Security & Privacy</span>
                  <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                </button>
                <button
                  onClick={() => alert('알림 설정은 추후 모바일 푸시와 연동됩니다.')}
                  className="w-full flex items-center gap-3.5 p-4 hover:bg-slate-50/50 transition-colors text-left group cursor-pointer"
                >
                  <Bell className="w-5 h-5 text-slate-400 group-hover:text-[#2ecc71] transition-colors" />
                  <span className="flex-1 font-sans font-semibold text-slate-600 text-sm">Notifications</span>
                  <ChevronRight className="w-4.5 h-4.5 text-slate-300" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('정말 로그아웃 하시겠습니까?')) {
                      alert('데모 사용자 로그아웃 처리가 완료되었습니다.');
                    }
                  }}
                  className="w-full flex items-center gap-3.5 p-4 hover:bg-rose-50/30 text-rose-500 transition-colors text-left group cursor-pointer"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  <span className="flex-1 font-sans font-bold text-sm">Sign Out</span>
                </button>
              </div>
            </section>
          </motion.div>
        ) : (
          /* Python Code equivalent Tab */
          <motion.div
            key="python-code-div"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-slate-800 text-slate-200 p-5 rounded-3xl shadow-lg border border-slate-700 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#6bfe9c] font-mono text-xs font-bold flex items-center gap-1.5">
                  🐍 app.py (Streamlit Web App Implementation)
                </span>
                <button
                  onClick={copyPythonCode}
                  className="bg-[#2ecc71] hover:bg-[#25b361] text-white font-sans font-bold text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>코드 복사</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-700/60 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-[460px] overflow-y-auto overflow-x-auto text-emerald-400 custom-scrollbar whitespace-pre">
                {PYTHON_CODE_CONTENT}
              </div>

              <div className="mt-4 text-xs text-slate-300 leading-relaxed font-sans mt-3 border-t border-slate-700/60 pt-3">
                <p className="font-extrabold text-[#6bfe9c] mb-1">💡 어떻게 실행하나요?</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>파이썬이 설치된 컴퓨터의 명령 프롬프트 / 터미널을 엽니다.</li>
                  <li><code className="bg-slate-900 px-1 py-0.5 rounded text-white border border-slate-700 font-mono text-[10px]">pip install streamlit</code> 명령어로 Streamlit 라이브러리를 설치합니다.</li>
                  <li>위 코드를 복사해 파일명을 <code className="bg-slate-900 px-1 py-0.5 rounded text-white border border-slate-700 font-mono text-[10px]">app.py</code>로 저장합니다.</li>
                  <li>터미널에서 <code className="bg-slate-900 px-1 py-0.5 rounded text-white border border-slate-700 font-mono text-[10px]">streamlit run app.py</code> 명령어로 실행하면 로컬 웹서버가 띄워집니다!</li>
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
