import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task, Member, ProfileData } from './types';
import LandingScreen from './components/LandingScreen';
import TasksScreen from './components/TasksScreen';
import TeamScreen from './components/TeamScreen';
import ProfileScreen from './components/ProfileScreen';
import AddTaskView from './components/AddTaskView';
import { Bell, CheckSquare, Users, User, GlassWater, Trophy } from 'lucide-react';

// Premium Mockup CDN images from the user's HTML prompt
const MOCK_IMAGES = {
  landingHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDH3lZgQ-KS-Br6WDu-HvOE_dphVuHzT0J5VHPDPgPAVbsOg5vJnZPLO-dZ3c8pzzzMDpaBkU-30CQY-mtZ6rzu7yrVlv7WENyuwWdycGMT_FJFmGEH4KT1YKmO23QY5Ef01c9tNOeWV54b3sjpGYNbR023TrapqeMZ_WzFjSHqTOh92XssCx2gZi-pp4Wq4bnCcHMaliqZht6hDUJBzX5xUMrmQYxfFADXgmapMsJdA_k2ZrK10oKCi5x3-U-ozS4BaKOjZe',
  emptyGlass: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOuKw1znxLRm6uIEE9p59CYtu_Hoox14r3gp-nIrH_Zs9VRQ8yTV1buHqX6wuYX07mdneihISoLYAEFHINxJ3RbivEfO2RmShUDLkxURqpmMMoiKTnfAOd-EhS0CngVtX2I_aQfEtY6lX3F76syWFUgs6zRbMnKcDlJpURYh5tZ3NdTJuLIwlWV1GP-EUN5UvUXwSdpSa15s3e69JQTm1S6LFi1nHogT03dQtMYHlrkqAtjpOK0fHfTnc1ZO6ULY6CqisrE5kE',
  alex: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRQlxyKpN11INRwC-dwjuGCsHm75Md9wayoGhTkLBK1krsNNxqyiHOLloqUS_QDRlrzepVNuHiKQBq2tvZ2hhTzIfl1sxokG7nshh4Li91EvzSudUktDPo9r5FfC8l8PF1-Hfm5Dydz-zoE4yOEe8xflCisrOGqG8ilENWJcdSiQeNCfMIP-heZNyvgP1RqDv9OSwBs_UbtfdLoS_uRSKzcXjEsgNXEzLkTdCGcDeEj46AQbHb5kkCde76hJtZD_YUH86hqKPD',
  jordan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy_4tGIJigMyk8BoBfXJ_JQNfn8-kUicIdvOH8WvawMjrhsCSbfFZwIVNfFRG-yTf1cZxkd_JFSc_nOPkJCok2Nza4wYsjrBwzw8dtXxt1leUJ5Lfwj1Iir_LQkfkOVVGmu-ekjhP895NwvQ2t3TN-98pzp58-XzMByR00Vz50gQbG63sJbnTo0W7eeehReYBY8wYzr2Q4wfXQMRJaCnohH6Cw8EGgYjDKOqAg3Mrm8h7AzZg67CVysNj4-nmlqSKKkCFxvZ0Z',
  chris: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOHE5TaRbYM1qa9WDhgrnw985O5pmG4QT9xvyW0yNYPhbnjGRig-rElVD7bggTPexIU9odPBHdhkngXeI4Lp5Z6au3w6GjMhycrMoKfCzt0kjZtNn1IizqMHE7HwIRinnMALqdKArw-HsU6xCAAozbaxxEPMI767zm7LWUw2ZSF2exKjhyH6xgEZOuA6ZiSt_zMe1Eb80A8KAssTMdpa8quDv2NCLjLVajb_dj5XUlHYgsICYWffq0NumpzxUlrwsHKNaXOdyy',
  taylor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBORSZifR8Jibq8j0haFPwjeKsVkjG3-9lUFbC3b7EBXE2-XMKc20V-lbMwl_e7WVZz4ctWfITUrsPt2yC0Wh3Zw3Yh1YWAbz7o8erL5blj6LK6CB8Y0sBD_HWFq14ktL4wkTTJCHHDP47I12jJPdH_b7ZbTo8afbcXSeY7Oz0gIQTZFZCN5kJAowL17AHTwUTPLBPuZ7x4VYe1RjlXp8E1hetgE46DalRn_Sk5WYGCWnflVdX9eN-upbf2zHkj6Y7jmQpZ6ft_',
  jisoo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH5HZRTbVBKayAOrNDkOFSQwsBYQJkNJGLQvdqNpjJ67L52hoXWmryHdphsClokZcGT5cB1YExYAdTXUk0saU5pY_qtnhOmR8dRcvGAh2jw2UEO_O4z4mJjTVADj__O1OoxLAMb2HoRWQs_AO1huKWhO1SDkD_W6x0GP5MSHC9cKpFApfxzzIHPUTstV-_kJvg0RsOA2IgJmvuOqM4cnVHGRha_7KNtUBXRm07GLLkoiRHQ2F7x2OY4Zgwi_V5Jn33cyuURo1E'
};

const DEFAULT_TASKS: Task[] = [
  { id: '1', title: '기말고사 퀴즈 정리노트 제출', priority: 'high', completed: true, date: '2026-06-05', createdAt: new Date().toISOString() },
  { id: '2', title: '팀 프로젝트 데모 웹 프리뷰 준비', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
  { id: '3', title: '자료구조 시험 족보 오답노트 공부', priority: 'medium', completed: false, createdAt: new Date().toISOString() }
];

const DEFAULT_MEMBERS: Member[] = [
  { id: 'alex', name: '알렉스', avatarUrl: MOCK_IMAGES.alex, active: true },
  { id: 'jordan', name: '조던', avatarUrl: MOCK_IMAGES.jordan, active: false },
  { id: 'chris', name: '크리스', avatarUrl: MOCK_IMAGES.chris, active: false },
  { id: 'taylor', name: '테일러', avatarUrl: MOCK_IMAGES.taylor, active: false }
];

const DEFAULT_PROFILE: ProfileData = {
  name: '김지수',
  englishName: 'Jisoo Kim',
  university: 'Seoul National University',
  email: 'jisoo.kim@snu.ac.kr',
  isEmailVerified: true,
  invitationCode: 'CHAM-1234',
  avatarUrl: MOCK_IMAGES.jisoo
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'team' | 'profile' | 'add-task'>('home');
  
  // Load tasks, members, projectRoom from localstorage or use defaults
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = localStorage.getItem('chamisul_tasks');
    return data ? JSON.parse(data) : DEFAULT_TASKS;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const data = localStorage.getItem('chamisul_members');
    return data ? JSON.parse(data) : DEFAULT_MEMBERS;
  });

  const [projectName, setProjectName] = useState(() => {
    return localStorage.getItem('chamisul_projectName') || '기말고사 뒤풀이';
  });

  const [profile, setProfile] = useState<ProfileData>(() => {
    const data = localStorage.getItem('chamisul_profile');
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  });

  const [notificationsBadge, setNotificationsBadge] = useState(3);

  // Synchronize with LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('chamisul_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('chamisul_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('chamisul_projectName', projectName);
  }, [projectName]);

  useEffect(() => {
    localStorage.setItem('chamisul_profile', JSON.stringify(profile));
  }, [profile]);

  // Actions handlers
  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTaskSubmit = (taskInfo: { title: string; priority: 'high' | 'medium' | 'low'; date?: string }) => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: taskInfo.title,
      priority: taskInfo.priority,
      completed: false,
      date: taskInfo.date,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleInviteMember = (email: string) => {
    const name = email.split('@')[0];
    const newMember: Member = {
      id: Math.random().toString(10),
      name: name.substring(0, 4),
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      active: false
    };
    setMembers(prev => [...prev, newMember]);
  };

  const handleStartRoom = () => {
    alert(`🎉 '${projectName}' 프로젝트 룸 개설 완료! 팀원들과 함께 마시러 달릴 무대를 활성화했습니다!`);
    setActiveTab('tasks');
  };

  const handleVerifyEmail = () => {
    setProfile(prev => ({ ...prev, isEmailVerified: true }));
  };

  return (
    <div className="bg-[#f8f9f9] text-[#191c1c] font-sans antialiased min-h-screen flex flex-col selection:bg-[#6bfe9c]/40 relative overflow-x-hidden">
      
      {/* Dynamic Header Section */}
      <AnimatePresence>
        {activeTab !== 'add-task' && (
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#f8f9f9]/80 backdrop-blur-md w-full top-0 sticky flex justify-between items-center px-5 py-4 z-40 border-b border-slate-100 max-w-2xl mx-auto"
          >
            {/* Header Brand */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-1.5 active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <span className="text-[#006d37] text-lg font-bold select-none">🍶</span>
              <h1 className="font-sans text-lg font-extrabold text-[#006d37] tracking-tight">
                {activeTab === 'profile' ? '프로필' : activeTab === 'team' ? '팀원 관리' : 'Chamisul'}
              </h1>
            </div>

            {/* Notification triggers */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setNotificationsBadge(0);
                  alert('새로운 소식: 오늘 밤 미팅 기획이 완성되었습니다! 어서 할 일을 완료하세요.');
                }}
                className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 active:scale-95 transition-transform cursor-pointer shrink-0"
              >
                <Bell className="w-5 h-5 text-slate-500" />
                {notificationsBadge > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white" />
                )}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Container Stage wrapper */}
      <main className="flex-grow w-full max-w-2xl mx-auto px-5 py-2 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="landing-screen" className="w-full">
              <LandingScreen
                onStartRace={() => setActiveTab('tasks')}
                onNavigateToTab={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div key="tasks-screen" className="w-full">
              <TasksScreen
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onAddTaskClick={() => setActiveTab('add-task')}
              />
            </motion.div>
          )}

          {activeTab === 'team' && (
            <motion.div key="team-screen" className="w-full">
              <TeamScreen
                members={members}
                projectName={projectName}
                onProjectNameChange={setProjectName}
                onInviteMember={handleInviteMember}
                onStartRoom={handleStartRoom}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile-screen" className="w-full">
              <ProfileScreen
                profile={profile}
                onUpdateEmail={(email) => setProfile(p => ({ ...p, email }))}
                onVerifyEmail={handleVerifyEmail}
                completedTasks={tasks.filter(t => t.completed).length}
                totalTasks={tasks.length}
              />
            </motion.div>
          )}

          {activeTab === 'add-task' && (
            <motion.div key="add-task-screen" className="w-full">
              <AddTaskView
                onBack={() => setActiveTab('tasks')}
                onAddTaskSubmit={handleAddTaskSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Spacer so that BottomNav doesn't overlay bottom elements */}
      {activeTab !== 'add-task' && <div className="h-24 shrink-0" />}

      {/* Bottom Nav Bar Section */}
      <AnimatePresence>
        {activeTab !== 'add-task' && (
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white/90 backdrop-blur-md shadow-[0px_-8px_30px_rgba(0,0,0,0.02)] fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 py-3 pb-safe border-t border-slate-100 max-w-md mx-auto sm:rounded-t-3xl"
          >
            {/* Home Link (optional helper) */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center rounded-3xl py-1 px-4 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#c2f366] text-[#364e00] font-black'
                  : 'text-slate-400 hover:text-slate-600 opacity-80'
              }`}
            >
              <span className="text-sm font-bold">🍶</span>
              <span className="font-sans text-[10px] font-bold tracking-tight">Home</span>
            </button>

            {/* Tasks Tab Link */}
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex flex-col items-center justify-center rounded-3xl py-1 px-4 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-[#c2f366] text-[#364e00] font-black shadow-[0px_4px_12px_rgba(194,243,102,0.2)]'
                  : 'text-slate-400 hover:text-slate-600 opacity-80'
              }`}
            >
              <CheckSquare className="w-5 h-5 leading-none" />
              <span className="font-sans text-[10px] font-bold tracking-tight">할 일</span>
            </button>

            {/* Team Tab Link */}
            <button
              onClick={() => setActiveTab('team')}
              className={`flex flex-col items-center justify-center rounded-3xl py-1 px-4 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-[#c2f366] text-[#364e00] font-black shadow-[0px_4px_12px_rgba(194,243,102,0.2)]'
                  : 'text-slate-400 hover:text-slate-600 opacity-80'
              }`}
            >
              <Users className="w-5 h-5 leading-none" />
              <span className="font-sans text-[10px] font-bold tracking-tight">팀원</span>
            </button>

            {/* Profile Tab Link */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center rounded-3xl py-1 px-4 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#c2f366] text-[#364e00] font-black shadow-[0px_4px_12px_rgba(194,243,102,0.2)]'
                  : 'text-slate-400 hover:text-slate-600 opacity-80'
              }`}
            >
              <User className="w-5 h-5 leading-none" />
              <span className="font-sans text-[10px] font-bold tracking-tight">프로필</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
