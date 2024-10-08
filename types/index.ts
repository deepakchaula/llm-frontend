/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/index.ts

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }
  
  export interface Conversation {
    id: string;
    name: string;
    messages: Message[];
    tokens: number;
    createdAt: string;
    params?: Record<string, any>;
  }
  