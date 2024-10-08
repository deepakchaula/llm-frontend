// components/PromptInteraction.tsx
import { useState } from 'react';
import { TextInput, Button, Loader } from '@mantine/core';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Prompt } from '../types';

interface PromptInteractionProps {
  conversationId: string;
}

export default function PromptInteraction({ conversationId }: PromptInteractionProps) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Prompt[]>([]);

  const sendPrompt = useMutation(
    async () => {
      const response = await axios.post(`https://your-api-endpoint.com/queries/${conversationId}`, { prompt });
      return response.data;
    },
    {
      onSuccess: (response) => {
        setMessages((prev) => [
          ...prev,
          { role: 'user', content: prompt },
          { role: 'assistant', content: response.content },
        ]);
        setPrompt('');
      },
    }
  );

  if (sendPrompt.isLoading) return <Loader />;

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.role}: </strong> {msg.content}
          </p>
        ))}
      </div>
      <TextInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <Button onClick={() => sendPrompt.mutate()}>Send</Button>
    </div>
  );
}
