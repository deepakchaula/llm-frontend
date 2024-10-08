import React, { useState } from 'react';
import { Box, TextInput, Slider, Button, Card } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

interface LLMSettings {
  temperature: number;
  maxTokens: number;
}

const LLMSettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<LLMSettings>({ temperature: 0.7, maxTokens: 150 });

  const { data: isLoading } = useQuery<LLMSettings>('llmSettings', async () => {
    const response = await axios.get('/api/llm-settings');
    return response.data;
  }, {
    onSuccess: (data) => {
      setSettings(data);
    }
  });

  const updateSettings = useMutation(
    async (newSettings: LLMSettings) => {
      await axios.put('/api/llm-settings', newSettings);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('llmSettings');
      },
    }
  );

  const handleSave = () => {
    updateSettings.mutate(settings);
  };

  return (
    <Box style={{ maxWidth: 600, margin: '0 auto' }}>
      {isLoading ? (
        <TextInput value="Loading settings..." disabled />
      ) : (
        <Card shadow="sm" p="lg" radius="md">
          <Box mb="md">
            <TextInput
              label="Temperature"
              value={settings.temperature}
              onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.currentTarget.value) })}
              type="number"
              step="0.1"
              min="0"
              max="1"
            />
          </Box>
          <Box mb="md">
            <Slider
              label="Max Tokens"
              value={settings.maxTokens}
              onChange={(value) => setSettings({ ...settings, maxTokens: value })}
              min={50}
              max={500}
            />
          </Box>
          <Button onClick={handleSave} mt="md">
            Save Settings
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default LLMSettingsPage;