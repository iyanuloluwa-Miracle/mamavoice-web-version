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
    const write = (data: Message[]) =>
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    try {
      write(messages)
    } catch {
      try {
        write(messages.slice(Math.floor(messages.length / 2)))
      } catch {
        // storage critically full — nothing more we can do
      }
    }
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY)
  }

  return { load, save, clear }
}
