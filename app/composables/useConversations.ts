import { ref } from 'vue'
import { conversationService } from '~/services/conversation.service'
import type { ConversationSummaryDto } from '~/types/api'

export const CURRENT_CONVERSATION_ID_KEY = 'mama-current-conversation-id'

interface Message {
  role: 'user' | 'ai'
  text: string
  time: string
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Backend-backed conversation history for authenticated users (list, load, delete).
// Guests keep using useChatHistory + localStorage sessions since the API requires auth.
export function useConversations() {
  const conversations = ref<ConversationSummaryDto[]>([])
  const currentConversationId = ref<string | null>(null)

  async function refreshList() {
    try {
      const res = await conversationService.list(1, 30)
      conversations.value = res.conversations
    } catch {
      // Non-fatal — sidebar list just won't update this cycle
    }
  }

  async function loadConversation(id: string): Promise<Message[]> {
    const detail = await conversationService.get(id, 1, 50)
    setCurrentId(id)
    return detail.messages
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map(m => ({
        role: m.role === 'assistant' ? 'ai' as const : 'user' as const,
        text: m.content,
        time: formatTime(m.createdAt),
      }))
  }

  async function remove(id: string) {
    await conversationService.remove(id)
    conversations.value = conversations.value.filter(c => c.id !== id)
    if (currentConversationId.value === id) setCurrentId(null)
  }

  function setCurrentId(id: string | null) {
    currentConversationId.value = id
    if (id) localStorage.setItem(CURRENT_CONVERSATION_ID_KEY, id)
    else localStorage.removeItem(CURRENT_CONVERSATION_ID_KEY)
  }

  function restoreCurrentId(): string | null {
    currentConversationId.value = localStorage.getItem(CURRENT_CONVERSATION_ID_KEY)
    return currentConversationId.value
  }

  return {
    conversations,
    currentConversationId,
    refreshList,
    loadConversation,
    remove,
    setCurrentId,
    restoreCurrentId,
  }
}
