const STORAGE_KEY = 'mama-chat-messages'

interface Message {
  role: 'user' | 'ai'
  text: string
  time: string
}

export function useChatHistory() {
  function load(): Message[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function save(messages: Message[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // localStorage full or unavailable — fail silently
    }
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY)
  }

  return { load, save, clear }
}
