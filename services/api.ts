/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Conversation } from '../types';

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getConversation = async (id: string): Promise<Conversation> => {
  try {
    const response = await api.get(`/conversations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createConversation = async (name: string): Promise<Conversation> => {
  try {
    const response = await api.post('/conversations', { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await api.get('/conversations');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a specific conversation by ID
export const getConversationById = async (id: string) => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
};

export const updateConversation = async (id: string, name: string): Promise<Conversation> => {
  try {
    const response = await api.put(`/conversations/${id}`, { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  try {
    await api.delete(`/conversations/${id}`);
  } catch (error) {
    throw error;
  }
};

// Send a prompt to the LLM and get a response
export const sendPrompt = async (conversationId: string, content: string) => {
  const response = await api.post(`/queries/${conversationId}`, {
    role: 'user',
    content,
  });
  return response.data;
};
