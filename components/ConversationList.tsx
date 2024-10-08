/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Card, Button, Text, Group } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversations, deleteConversation, updateConversation } from '../services/api';

interface Conversation {
  _id: string;
  name: string;
}

const ConversationList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: conversations, isLoading } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await getConversations();
      return response as unknown as Conversation[];
    },
  });

  const handleDeleteMutation = useMutation<void, Error, { conversationId: string }>({
    mutationFn: async ({ conversationId }: { conversationId: string }) => {
      await deleteConversation(conversationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      console.error("Error deleting conversation:", error.message);
    }
  });

  const handleDelete = (conversationId: string) => {
    handleDeleteMutation.mutate({ conversationId });
    };

  const handleEdit = (conversation: Conversation) => {
    const newName = prompt('Edit Conversation Name:', conversation.name);
    if (newName && newName.trim() !== '') {
      updateConversationMutation.mutate({ id: conversation._id, name: newName });
    }
  };

  const updateConversationMutation = useMutation<void, Error, { id: string; name: string }>({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      await updateConversation(id, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      console.error("Error updating conversation:", error.message);
    }
  });

  return (
    <Box style={{ maxWidth: 600, margin: '0 auto' }}>
      {isLoading ? (
        <Text>Loading conversations...</Text>
      ) : (
        conversations?.map((conversation) => (
          <Card key={conversation._id} shadow="sm" p="lg" radius="md" mt="md">
            <Group style={{ justifyContent: 'space-between' }}>
              <Text>{conversation.name}</Text>
              <Group>
                <Button variant="outline" color="blue" onClick={() => handleEdit(conversation)}>
                  Edit
                </Button>
                <Button variant="outline" color="red" onClick={() => handleDelete(conversation._id)}>
                  Delete
                </Button>
              </Group>
            </Group>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ConversationList;