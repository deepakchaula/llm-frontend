/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface Conversation {
    id: string;
    name: string;
    messages: Prompt[];
    params: Record<string, any>;
  }
  
  export interface Prompt {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface CreateConversationPayload {
    name: string;
  }
  
  export interface UpdateConversationPayload {
    name: string;
  }
  