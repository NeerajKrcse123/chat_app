import { create } from 'zustand';

const UseConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    users: [],
    setUsers: (users) => set({ users }),
}));

export default UseConversation;
