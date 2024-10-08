import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  createConversation,
  getConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
  sendPrompt,
} from '../services/api';

// Hook to fetch all conversations
export const useConversations = () => {
  return useQuery({ queryKey: ['conversations'], queryFn: getConversations });
};

// Hook to fetch a specific conversation by ID
export const useConversation = (id: string) => {
  return useQuery({ queryKey: ['conversation', id], queryFn: () => getConversationById(id), enabled: !!id });
};

// Custom hook to create a new conversation
export const useCreateConversation = () => {
  const queryClient = useQueryClient(); // This will now work because QueryClientProvider is set
  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      return await createConversation(title); // Assuming this API function creates a conversation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

// Hook to update a conversation
export const useUpdateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, title }: { id: string; title: string }) => updateConversation(id, title), onSuccess: (_, variables) => { queryClient.invalidateQueries({ queryKey: ['conversations'] }); queryClient.invalidateQueries({ queryKey: ['conversation', variables.id] }); } });
};

// Hook to delete a conversation
export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: deleteConversation, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['conversations'] }); } });
};

// Hook to send a prompt to the LLM and get a response
export const useSendPrompt = (conversationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (content: string) => sendPrompt(conversationId, content), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] }); } });
};