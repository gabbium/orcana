import { api } from "@/lib/api-client";

export interface ChatAssistantRequest {
  content: string;
}

export interface ChatAssistantResponse {
  content: string;
}

export const postChatAssistant = (data: ChatAssistantRequest) => {
  return api.post<ChatAssistantResponse>("v1/assistant/chat", data);
};
