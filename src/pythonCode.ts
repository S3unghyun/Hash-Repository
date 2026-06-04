export const PYTHON_CODE_CONTENT = `import streamlit as st
import random
import time

# ---------------------------------------------------------
# Chamisul Task Flow - University Student Task Manager
# ---------------------------------------------------------
# Run with: streamlit run app.py
# ---------------------------------------------------------

st.set_page_config(
    page_title="Chamisul Task Flow",
    page_icon="🍶",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Custom Brand Styling via CSS
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&display=swap');
    
    html, body, [data-testid="stAppViewContainer"] {
        font-family: 'Be Vietnam Pro', sans-serif;
        background-color: #f8f9f9;
        color: #191c1c;
    }
    
    h1, h2, h3 {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        color: #006d37 !important;
    }
    
    .stButton>button {
        background-color: #2ecc71;
        color: white;
        border-radius: 9999px;
        padding: 0.5rem 2rem;
        font-weight: 600;
        border: none;
        transition: all 0.3s ease;
        box-shadow: 0px 4px 15px rgba(46,204,113,0.3);
    }
    
    .stButton>button:hover {
        background-color: #006d37;
        color: white;
        transform: translateY(-2px);
    }
</style>
""", unsafe_allow_none=True)

# Session State Initialization
if "current_page" not in st.session_state:
    st.session_state.current_page = "Home"

if "tasks" not in st.session_state:
    st.session_state.tasks = [
        {"id": 1, "title": "과제 제출하기", "priority": "high", "completed": True},
        {"id": 2, "title": "팀 미팅 준비", "priority": "medium", "completed": False},
        {"id": 3, "title": "기말고사 자료 리뷰", "priority": "medium", "completed": False}
    ]

if "team_members" not in st.session_state:
    st.session_state.team_members = [
        {"name": "알렉스", "active": True},
        {"name": "조던", "active": False},
        {"name": "크리스", "active": False},
        {"name": "테일러", "active": False}
    ]

if "project_name" not in st.session_state:
    st.session_state.project_name = ""

# Navigation helper
def navigate_to(page):
    st.session_state.current_page = page

# ---------------------------------------------------------
# Sidebar / Top navigation simulation
# ---------------------------------------------------------
st.sidebar.title("Chamisul Menu 🍶")
if st.sidebar.button("Home"):
    st.session_state.current_page = "Home"
if st.sidebar.button("주간 레이스 (Tasks)"):
    st.session_state.current_page = "Tasks"
if st.sidebar.button("새 프로젝트 룸 (Team)"):
    st.session_state.current_page = "Team"
if st.sidebar.button("프로필 (Profile)"):
    st.session_state.current_page = "Profile"

# APP HEADER
st.markdown("<div style='display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;'><h1 style='margin: 0;'>🍶 Chamisul</h1></div>", unsafe_allow_html=True)

# ---------------------------------------------------------
# SCREEN 1: Home (Landing / Hero)
# ---------------------------------------------------------
if st.session_state.current_page == "Home":
    st.image("https://lh3.googleusercontent.com/aida-public/AB6AXuBEDH3lZgQ-KS-Br6WDu-HvOE_dphVuHzT0J5VHPDPgPAVbsOg5vJnZPLO-dZ3c8pzzzMDpaBkU-30CQY-mtZ6rzu7yrVlv7WENyuwWdycGMT_FJFmGEH4KT1YKmO23QY5Ef01c9tNOeWV54b3sjpGYNbR023TrapqeMZ_WzFjSHqTOh92XssCx2gZi-pp4Wq4bnCcHMaliqZht6hDUJBzX5xUMrmQYxfFADXgmapMsJdA_k2ZrK10oKCi5x3-U-ozS4BaKOjZe", caption="할 일은 빠르게, 술자리는 즐겁게!")
    
    st.markdown("## 할 일은 빠르게, 술자리는 즐겁게!")
    st.write("더 나은 밤을 위한 대학생 필수 할 일 관리 파트너")
    
    col1, col2 = st.columns([2, 1])
    with col1:
        if st.button("빨리 끝내고 마시러 가기! 👉", key="cta_home"):
            st.session_state.current_page = "Tasks"
            st.rerun()
    with col2:
        st.info("🔋 75% 충전됨")
        
    st.write("---")
    st.markdown("### 주요 특징")
    st.write("⭐ **생산성 해킹**: 가장 중요한 일에 먼저 집중하세요.")
    st.write("🎁 **보상 시스템**: 일을 빨리 마칠수록, 완벽하고 상쾌한 자유 시간이 열립니다.")

# ---------------------------------------------------------
# SCREEN 2: 주간 레이스 (Tasks & Todo List)
# ---------------------------------------------------------
elif st.session_state.current_page == "Tasks":
    st.markdown("## 🏃‍♂️ 주간 레이스")
    st.caption("할 일을 추가하고 즐거운 주말을 맞이하세요.")
    
    # Calculate progress
    total_tasks = len(st.session_state.tasks)
    completed_tasks = sum(1 for t in st.session_state.tasks if t["completed"])
    progress_percent = int((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0
    
    # Progress Display (Liquid visual theme)
    st.progress(progress_percent / 100)
    st.metric("레이스 진행률", f"{progress_percent}%", f"{completed_tasks}/{total_tasks} 완료됨")
    
    st.write("---")
    
    # Add Task Section
    st.markdown("### ➕ 할 일 추가")
    new_title = st.text_input("어떤 일을 해야 하나요?", placeholder="예: 기말고사 보고서 작성, 동아리 회의록...")
    priority = st.selectbox("우선순위", ["높음", "중간", "낮음"], index=1)
    
    if st.button("추가 완료! 🚀"):
        if new_title.strip():
            p_map = {"높음": "high", "중간": "medium", "낮음": "low"}
            st.session_state.tasks.append({
                "id": random.randint(1000, 9999),
                "title": new_title.strip(),
                "priority": p_map[priority],
                "completed": False
            })
            st.success("새로운 할 일이 추가되었습니다!")
            time.sleep(0.5)
            st.rerun()
        else:
            st.warning("할 일 내용을 입력해 주세요!")

    st.write("---")
    st.markdown("### 📝 나의 Todo 리스트")
    
    if not st.session_state.tasks:
        st.write("텅 비어있어요! 🌴 첫 번째 할 일을 어서 추가해주세요.")
    else:
        for idx, task in enumerate(st.session_state.tasks):
            col_check, col_title, col_prio, col_del = st.columns([1, 6, 2, 1])
            with col_check:
                is_completed = st.checkbox("", value=task["completed"], key=f"check_{task['id']}")
                if is_completed != task["completed"]:
                    st.session_state.tasks[idx]["completed"] = is_completed
                    st.rerun()
            with col_title:
                if task["completed"]:
                    st.markdown(f"~~{task['title']}~~")
                else:
                    st.write(task["title"])
            with col_prio:
                color_map = {"high": "🔴 높음", "medium": "🟡 중간", "low": "🟢 낮음"}
                st.caption(color_map[task["priority"]])
            with col_del:
                if st.button("🗑️", key=f"del_{task['id']}"):
                    st.session_state.tasks.pop(idx)
                    st.rerun()

# ---------------------------------------------------------
# SCREEN 3: 새 프로젝트 룸 (Team)
# ---------------------------------------------------------
elif st.session_state.current_page == "Team":
    st.markdown("## 👥 새 프로젝트 룸 만들기")
    st.caption("팀의 다음 승리를 위한 무대를 준비하세요.")
    
    p_name = st.text_input("프로젝트 이름", value=st.session_state.project_name, placeholder="예: 기말고사 뒤풀이")
    st.session_state.project_name = p_name
    
    st.write("---")
    st.markdown("### ✉️ 팀원 초대하기")
    invite_email = st.text_input("팀원의 이메일을 입력하세요", placeholder="name@univ.edu")
    if st.button("초대 보내기 📤"):
        if invite_email:
            st.success(f"'{invite_email}' 주소로 초대를 전송했습니다!")
        else:
            st.warning("이메일을 입력해 주세요.")
            
    st.write("---")
    st.markdown("### 🧑‍🤝‍🧑 현재 참여 중인 팀원")
    
    cols = st.columns(len(st.session_state.team_members) + 1)
    for index, member in enumerate(st.session_state.team_members):
        with cols[index]:
            st.markdown(f"👨‍🎓 **{member['name']}**")
            st.caption("활동 중" if member["active"] else "오프라인")
            
    with cols[-1]:
        if st.button("➕ 추가"):
            st.success("초대 링크가 생성되었습니다!")
            
    st.write("---")
    if st.button("🍺 룸 시작하기", use_container_width=True):
        st.success(f"🎉 '{p_name}' 방이 개설되었습니다! 함께 힘차게 달려요.")

# ---------------------------------------------------------
# SCREEN 4: 프로필 (Profile)
# ---------------------------------------------------------
elif st.session_state.current_page == "Profile":
    st.markdown("## 👤 프로필")
    st.write("Seoul National University")
    
    st.image("https://lh3.googleusercontent.com/aida-public/AB6AXuBH5HZRTbVBKayAOrNDkOFSQwsBYQJkNJGLQvdqNpjJ67L52hoXWmryHdphsClokZcGT5cB1YExYAdTXUk0saU5pY_qtnhOmR8dRcvGAh2jw2UEO_O4z4mJjTVADj__O1OoxLAMb2HoRWQs_AO1huKWhO1SDkD_W6x0GP5MSHC9cKpFApfxzzIHPUTstV-_kJvg0RsOA2IgJmvuOqM4cnVHGRha_7KNtUBXRm07GLLkoiRHQ2F7x2OY4Zgwi_V5Jn33cyuURo1E", width=120)
    
    st.markdown("### **김지수 (Jisoo Kim)**")
    
    st.write("---")
    st.markdown("#### 📧 이메일 인증 (Email Registration)")
    st.text_input("Your University Email", value="jisoo.kim@snu.ac.kr")
    if st.button("Verify Email"):
        st.success("이메일로 인증 메일이 전송되었습니다.")
        
    st.write("---")
    st.markdown("#### 🎁 나의 초댓장 (Invitation Code)")
    st.info("🔑 내 공유 코드: **CHAM-1234**")
    st.caption("친구를 초대하고 함께 혜택(Premium Lime 🔋)을 해제해보세요.")
    
    st.write("---")
    st.markdown("#### ⚙️ 설정")
    st.button("보안 및 개인 정보 설정")
    st.button("알림 설정")
    if st.button("로그아웃 (Sign Out)", key="signout_btn"):
        st.warning("로그아웃 되었습니다.")
`
