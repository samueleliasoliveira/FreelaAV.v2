import React, { useState } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

export default function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Como posso ajudar você hoje na Freelaav?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: "Entendi sua dúvida. Vou encaminhar você para um especialista em suporte técnico agora mesmo.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-zinc-900 dark:bg-zinc-100 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 dark:bg-zinc-900/10 rounded-xl flex items-center justify-center">
                <Bot className="text-white dark:text-zinc-900" size={20} />
              </div>
              <div>
                <p className="text-white dark:text-zinc-900 text-sm font-bold">Suporte Freelaav</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Online Agora</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white dark:hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-5 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-none' 
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
            <input 
              type="text" 
              placeholder="Digite sua mensagem..." 
              className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm dark:text-zinc-100 focus:outline-none focus:border-zinc-900/20 dark:focus:border-zinc-100/20 transition-all font-medium"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-2.5 rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center group ${isOpen ? 'rotate-90' : ''}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />}
        {!isOpen && (
          <div className="absolute right-0 top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-950"></div>
        )}
      </button>
    </div>
  );
}
