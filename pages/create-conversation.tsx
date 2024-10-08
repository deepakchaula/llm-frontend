import React, { useState } from "react";
import { createConversation } from "../services/api";
import { Box, TextInput, Button, Title } from "@mantine/core";
import { useRouter } from "next/router";

const CreateConversationPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    if (title.trim() !== "") {
      createConversation(title)
        .then((data) => {
          router.push(`/chat/${data.id}`);
        })
        .catch((error) => {
          console.error("Failed to create conversation:", error);
        });
    }
  };

  return (
    <Box style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Title order={2} mb="lg">
        Create Conversation
      </Title>
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Enter conversation title"
        mb="md"
      />
      <Button onClick={handleCreate} fullWidth>
        Create Conversation
      </Button>
    </Box>
  );
};

export default CreateConversationPage;
