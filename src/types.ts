export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  date?: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  active: boolean;
}

export interface ProjectRoom {
  name: string;
  members: string[]; // member IDs
  isStarted: boolean;
  createdAt: string;
}

export interface ProfileData {
  name: string;
  englishName: string;
  university: string;
  email: string;
  isEmailVerified: boolean;
  invitationCode: string;
  avatarUrl: string;
}
