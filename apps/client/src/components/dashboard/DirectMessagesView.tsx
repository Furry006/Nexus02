import React, { useState } from 'react';
import { Search, Phone, Video, User, Send, PlusCircle, Smile } from 'lucide-react';
import { MessageList } from './MessageList';
import type { DirectMessageConversation, MessageData, MemberData } from './mockData';

interface DirectMessagesViewProps {
  conversations: DirectMessageConversation[];
  messages: Record<string, MessageData[]>;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const DirectMessagesView: React.FC<DirectMessagesViewProps> = ({
  conversations,
  messages,
  onSendMessage,
}) => {
  const [selectedDmId, setSelectedDmId] = useState<string>(conversations[0]?.id || 'dm-sarah');
  const [inputText, setInputText] = useState('');

  const currentDm = conversations.find((c) => c.id === selectedDmId) || conversations[0];
  const dmMessages = messages[selectedDmId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentDm) return;
    onSendMessage(currentDm.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex-1 flex h-full bg-[#16161b] relative overflow-hidden">
      {/* DM Sidebar */}
      <div className="w-[230px] lg:w-[240px] flex-shrink-0 bg-[#121216] border-r border-zinc-800/40 flex flex-col h-full select-none z-10">
        {/* Search */}
        <div className="h-13 px-3 border-b border-zinc-800/40 flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Find or start a conversation"
              className="w-full h-8 pl-8 pr-2 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* DM List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 custom-scrollbar">
          <div className="px-2 mb-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            Direct Messages
          </div>

          {conversations.map((dm) => {
            const isSelected = dm.id === selectedDmId;
            return (
              <div
                key={dm.id}
                onClick={() => setSelectedDmId(dm.id)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-zinc-800/80 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full ${dm.user.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
                  >
                    {dm.user.name.charAt(0)}
                  </div>
                  <div
                    className={`w-2.5 h-2.5 rounded-full border-2 border-[#121216] absolute -bottom-0.5 -right-0.5 ${
                      dm.user.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-600'
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-200 truncate">
                      {dm.user.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">{dm.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {dm.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main DM Chat Canvas */}
      {currentDm ? (
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* Header */}
          <header className="h-13 px-4 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full ${currentDm.user.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
                >
                  {currentDm.user.name.charAt(0)}
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 border-[#141419] absolute -bottom-0.5 -right-0.5 ${
                    currentDm.user.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-600'
                  }`}
                />
              </div>
              <div>
                <h1 className="font-semibold text-zinc-100 text-sm">{currentDm.user.name}</h1>
                <span className="text-[11px] text-zinc-500">@{currentDm.user.username}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-400">
              <button title="Voice Call" className="p-1.5 hover:bg-zinc-800 hover:text-zinc-200 rounded cursor-pointer">
                <Phone className="w-4 h-4" />
              </button>
              <button title="Video Call" className="p-1.5 hover:bg-zinc-800 hover:text-zinc-200 rounded cursor-pointer">
                <Video className="w-4 h-4" />
              </button>
              <button title="Profile" className="p-1.5 hover:bg-zinc-800 hover:text-zinc-200 rounded cursor-pointer">
                <User className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* DM Message Feed */}
          <MessageList
            channel={{ id: currentDm.id, name: currentDm.user.name, topic: `Direct conversation with @${currentDm.user.username}` }}
            messages={dmMessages}
          />

          {/* Composer */}
          <div className="p-4 pt-1 bg-[#141419] flex-shrink-0">
            <form
              onSubmit={handleSend}
              className="bg-[#1e1e24] border border-zinc-800/80 rounded-xl px-4 py-2 flex items-center gap-3 focus-within:border-purple-500/50 transition-all"
            >
              <button type="button" className="p-1 text-zinc-400 hover:text-zinc-200 rounded">
                <PlusCircle className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message @${currentDm.user.name}...`}
                className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none py-1"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-1.5 rounded transition-all ${
                  inputText.trim() ? 'bg-purple-600 text-white' : 'text-zinc-600'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
