import random

class Task:
    def __init__(self, title, assignee, due_date, priority="중간"):
        self.title = title            # 할 일 제목 (예: '발표 PPT 제작')
        self.assignee = assignee      # 담당 팀원 (예: '김지수')
        self.due_date = due_date      # 마감일 (예: '2026-06-10')
        self.priority = priority      # 우선순위 (높음, 중간, 낮음)
        self.is_completed = False     # 완료 여부
        self.attached_files = []      # 과제 자료조사 파일 및 링크 저장 리스트

    def attach_file(self, file_info):
        self.attached_files.append(file_info)

class TeamWorkspace:
    def __init__(self, room_name):
        self.room_name = room_name
        # 기획안 UI의 초대 코드 양식 반영 (CHAM-XXXX)
        self.room_code = f"CHAM-{random.randint(1000, 99999)}"
        self.members = set()
        self.tasks = []

    def add_member(self, member_name):
        self.members.add(member_name)

    def calculate_contribution(self):
        """ 팀원별 기여도 계산 (완료한 할 일 기준) """
        if not self.tasks:
            return {}
        
        # 각 팀원별 완료 개수 집계
        completed_counts = {member: 0 for member in self.members}
        total_completed = 0
        
        for task in self.tasks:
            if task.is_completed and task.assignee in completed_counts:
                completed_counts[task.assignee] += 1
                total_completed += 1
                
        if total_completed == 0:
            return {member: 0.0 for member in self.members}
            
        # 백분율(%) 계산
        return {member: round((count / total_completed) * 100, 1) for member, count in completed_counts.items()}


def main():
    workspace = None
    print("🎓 대학 팀 프로젝트를 위한 투두리스트 [Chamisul] 🎓")
    
    while True:
        print("\n========================================")
        if workspace:
            print(f" [현재 룸: {workspace.room_name} | 코드: {workspace.room_code}]")
            print(f" [참여 팀원: {', '.join(workspace.members) if workspace.members else '없음'}]")
        else:
            print(" [현재 참여 중인 워크스페이스 룸이 없습니다]")
        print("========================================")
        print("1. 새 프로젝트 룸 만들기 (워크스페이스)")
        print("2. 팀원 초대/등록하기")
        print("3. 할 일 추가하기 (담당자, 우선순위, 마감일)")
        print("4. 할 일 목록 보기 & 과제 파일 확인")
        print("5. 과제 자료조사 파일/링크 올리기")
        print("6. 할 일 완료 체크")
        print("7. 팀원별 기여도 및 레이스 진행률 확인")
        print("8. 프로그램 종료")
        print("========================================")
        
        choice = input("원하는 메뉴 번호를 입력하세요: ")
        
        if choice == '1':
            room_name = input("프로젝트 이름을 입력하세요 (예: 오픈소스 기말팀플): ")
            workspace = TeamWorkspace(room_name)
            print(f"🎉 '{room_name}' 룸이 생성되었습니다! 초대 코드: {workspace.room_code}")
            
        elif choice == '2':
            if not workspace:
                print("❌ 먼저 프로젝트 룸을 생성해주세요.")
                continue
            name = input("등록할 팀원 이름을 입력하세요: ")
            workspace.add_member(name)
            print(f"✅ 팀원 '{name}'님이 워크스페이스에 등록되었습니다.")
            
        elif choice == '3':
            if not workspace:
                print("❌ 먼저 프로젝트 룸을 생성해주세요.")
                continue
            if not workspace.members:
                print("❌ 먼저 팀원을 1명 이상 등록해주세요.")
                continue
                
            title = input("할 일 제목을 입력하세요 (예: 자료조사, PPT 제작): ")
            print(f"현재 팀원 목록: {', '.join(workspace.members)}")
            assignee = input("담당 팀원 이름을 정확히 입력하세요: ")
            if assignee not in workspace.members:
                print("❌ 워크스페이스에 존재하지 않는 팀원입니다. 먼저 팀원으로 등록하세요.")
                continue
                
            due_date = input("마감일을 입력하세요 (예: 2026-06-10): ")
            priority = input("우선순위를 선택하세요 (높음 / 중간 / 낮음): ")
            if priority not in ["높음", "중간", "낮음"]:
                priority = "중간"
                
            new_task = Task(title, assignee, due_date, priority)
            workspace.tasks.append(new_task)
            print(f"✅ 할 일 '{title}'(담당: {assignee})이 추가되었습니다.")
            
        elif choice == '4':
            if not workspace or not workspace.tasks:
                print("🫙 할 일 보드가 비어 있습니다. 첫 번째 할 일을 추가해 보세요!")
                continue
                
            print("\n📋 [현재 할 일 보드 목록]")
            for idx, task in enumerate(workspace.tasks, 1):
                status = "🟢 완료" if task.is_completed else "🔴 미완료"
                print(f"{idx}. [{task.priority}] {task.title} (담당: {task.assignee} | 마agem일: {task.due_date}) - {status}")
                if task.attached_files:
                    print(f"   📂 첨부 파일/링크: {', '.join(task.attached_files)}")
                    
        elif choice == '5':
            if not workspace or not workspace.tasks:
                print("❌ 첨부할 할 일이 없습니다.")
                continue
                
            print("\n📋 파일을 올릴 할 일 번호를 선택하세요:")
            for idx, task in enumerate(workspace.tasks, 1):
                print(f"{idx}. {task.title} (담당: {task.assignee})")
            
            try:
                task_idx = int(input("번호 입력: ")) - 1
                if 0 <= task_idx < len(workspace.tasks):
                    file_info = input("업로드할 파일명 또는 자료조사 링크 주소를 입력하세요: ")
                    workspace.tasks[task_idx].attach_file(file_info)
                    print(f"✅ '{workspace.tasks[task_idx].title}'에 자료가 정상적으로 업로드되었습니다.")
                else:
                    print("❌ 잘못된 번호입니다.")
            except ValueError:
                print("❌ 숫자만 입력해주세요.")
                
        elif choice == '6':
            if not workspace or not workspace.tasks:
                print("❌ 완료 체크할 할 일이 없습니다.")
                continue
                
            print("\n📋 완료 처리할 할 일 번호를 선택하세요:")
            for idx, task in enumerate(workspace.tasks, 1):
                status = "완료" if task.is_completed else "미완료"
                print(f"{idx}. {task.title} ({status})")
                
            try:
                task_idx = int(input("번호 입력: ")) - 1
                if 0 <= task_idx < len(workspace.tasks):
                    workspace.tasks[task_idx].is_completed = True
                    print(f"🎉 '{workspace.tasks[task_idx].title}' 할 일이 완료되었습니다! 보상 레이스 게이지 상승!")
                else:
                    print("❌ 잘못된 번호입니다.")
            except ValueError:
                print("❌ 숫자만 입력해주세요.")
                
        elif choice == '7':
            if not workspace:
                print("❌ 프로젝트 룸이 없습니다.")
                continue
                
            total_tasks = len(workspace.tasks)
            completed_tasks = sum(1 for t in workspace.tasks if t.is_completed)
            
            # 주간 레이스 진행률 계산
            race_progress = round((completed_tasks / total_tasks * 100), 1) if total_tasks > 0 else 0
            
            print(f"\n🏎️ [주간 레이스 전체 진행률: {race_progress}%]")
            print(f"📊 총 할 일 {total_tasks}개 중 {completed_tasks}개 완료")
            
            print("\n👥 [팀원별 기여도 (완료 기준)]")
            contributions = workspace.calculate_contribution()
            for member, percent in contributions.items():
                print(f"- {member} 팀원: {percent}%")
                
        elif choice == '8':
            print("프로그램을 종료합니다. 빨리 끝내고 마시러 가기 화이팅! 🍻")
            break
        else:
            print("❌ 잘못된 번호입니다. 다시 선택해주세요.")

if __name__ == "__main__":
    main()