import React, { useState } from 'react';
import { Box, TextInput, Button, ScrollArea, Card, Text } from '@mantine/core';
import { sendPrompt } from '../services/api';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface ChatBoxProps {
  conversationId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ conversationId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const userMessage: Message = {
        id: new Date().toISOString(),
        content: message,
        role: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);
      setMessage('');

      sendPrompt(conversationId, message)
        .then((response) => {
          const assistantMessage: Message = {
            id: response.id,
            content: response.content,
            role: 'assistant',
          };
          setMessages((prev) => [...prev, assistantMessage]);
        })
        .catch((error) => {
          console.error('Failed to send message:', error);
        });
    }
  };

  return (
    <Box style={{ maxWidth: 600, margin: '0 auto' }}>
      <ScrollArea style={{ height: 400 }}>
        <Box>
          {messages.map((msg) => (
            <Card key={msg.id} shadow="sm" p="lg" radius="md" mt="md" style={{ backgroundColor: msg.role === 'user' ? '#e0f7fa' : '#fffde7' }}>
              <Text>{msg.content}</Text>
            </Card>
          ))}
        </Box>
      </ScrollArea>

      <Box mt="md" style={{ display: 'flex', gap: 'sm' }}>
        <TextInput
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Type your message..."
          style={{ flexGrow: 1 }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
};

export default ChatBox;