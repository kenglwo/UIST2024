export interface UserInfo {
  userId: string;
  userName: string;
}
export interface UserInfo {
  userId: string;
  userName: string;
}
export interface Message {
  role: string;
  content: string;
}

export interface ConversationData {
  userId: string;
  role: string;
  content: string;
  isFollowupQuestion: boolean;
}
