import React from 'react';
import { Box, Title, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import ConversationList from '../components/ConversationList';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleCreateConversation = () => {
    router.push('/create-conversation');
  };

  return (
    <Box style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title order={1} mb="lg">
        Conversations
      </Title>
      <Button onClick={handleCreateConversation} mb="lg">
        Create New Conversation
      </Button>
      <ConversationList />
    </Box>
  );
};

export default HomePage;