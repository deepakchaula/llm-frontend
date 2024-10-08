import React from 'react';
import { useRouter } from 'next/router';
import { Box, Title, Text } from '@mantine/core';
import ChatBox from '../../components/ChatBox';
import { getConversationById } from '../../services/api';
import { useEffect, useState } from 'react';

interface Conversation {
  id: string;
  name: string;
  messages: Array<{ role: string; content: string }>;
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id: params } = router.query;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params) {
    getConversationById(params as string)
        .then((data) => {
          setConversation(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch conversation:', error);
          setIsLoading(false);
        });
    }
  }, [params]);

  if (isLoading) {
    return <Text>Loading conversation...</Text>;
  }

  if (!conversation) {
    return <Text>Conversation not found.</Text>;
  }

  return (
    <Box style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title order={1} mb="lg">
        {conversation.name}
      </Title>
      <ChatBox conversationId={params as string} />
    </Box>
  );
};

export default ChatPage;