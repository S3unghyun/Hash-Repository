def show_menu():
    print("\n--- ✨ To-Do 리스트 메뉴 ---")
    print("1. 할 일 보기")
    print("2. 할 일 추가하기")
    print("3. 할 일 삭제하기")
    print("4. 종료하기")
    print("---------------------------")

def main():
    todo_list = []  # 할 일을 저장할 빈 리스트
    
    while True:
        show_menu()
        choice = input("원하는 작업의 번호를 입력하세요: ").strip()
        
        # 1. 할 일 보기
        if choice == '1':
            if not todo_list:
                print("\n📌 할 일이 비어 있습니다! 여유를 즐기세요.")
            else:
                print("\n📋 현재 할 일 목록:")
                for index, task in enumerate(todo_list, start=1):
                    print(f"{index}. {task}")
                    
        # 2. 할 일 추가하기
        elif choice == '2':
            new_task = input("\n새로운 할 일을 입력하세요: ").strip()
            if new_task:
                todo_list.append(new_task)
                print(f"✅ '{new_task}' 항목이 추가되었습니다.")
            else:
                print("❌ 공백은 입력할 수 없습니다.")
                
        # 3. 할 일 삭제하기
        elif choice == '3':
            if not todo_list:
                print("\n📌 삭제할 할 일이 없습니다.")
            else:
                print("\n📋 현재 할 일 목록:")
                for index, task in enumerate(todo_list, start=1):
                    print(f"{index}. {task}")
                
                try:
                    delete_num = int(input("\n삭제할 번호를 입력하세요: "))
                    if 1 <= delete_num <= len(todo_list):
                        removed = todo_list.pop(delete_num - 1)
                        print(f"🗑️ '{removed}' 항목이 삭제되었습니다.")
                    else:
                        print("❌ 잘못된 번호입니다. 목록에 있는 번호를 선택해주세요.")
                except ValueError:
                    print("❌ 숫자만 입력 가능합니다.")
                    
        # 4. 프로그램 종료
        elif choice == '4':
            print("\n👋 프로그램을 종료합니다. 좋은 하루 보내세요!")
            break
            
        else:
            print("❌ 잘못된 입력입니다. 1부터 4까지의 숫자를 입력해주세요.")

# 프로그램 시작점
if __name__ == "__main__":
    main()