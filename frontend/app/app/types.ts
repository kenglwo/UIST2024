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
  conversationId: number;
}

export interface FollowupQuestion {
  conversationId: number;
  followupQuestionIndex: number;
  content: string;
}

export interface TreemapData {
  name: string;
  category?: string;
  conversationId?: number;
  followupQuestionIndex?: number;
  children?: TreemapData[];
}
