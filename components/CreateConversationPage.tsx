import React, { useState } from 'react';
import { Box, TextInput, Button, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCreateConversation } from '../hooks/useConversations';

const CreateConversationPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const createConversation = useCreateConversation();

  const handleCreate = () => {
    if (title.trim() !== '') {
      createConversation.mutate(
        { title }, // Pass an object with title as a property
        {
          onSuccess: (data) => {
            router.push(`/chat/${data.id}`);
          },
          onError: (error) => {
            console.error('Failed to create conversation', error);
          },
        }
      );
    }
  };

  return (
    <Box style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Title order={2} mb="lg">
        Create New Conversation
      </Title>
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Enter conversation title"
        mb="md"
      />
      <Button
        onClick={handleCreate}
        disabled={title.trim() === ''} // Disable the button only when the title is empty
        fullWidth
      >
        Create Conversation
      </Button>
    </Box>
  );
};

export default CreateConversationPage;