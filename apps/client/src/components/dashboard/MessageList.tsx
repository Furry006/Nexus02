import React, { useEffect, useRef } from 'react';
import { Hash } from 'lucide-react';
import { MessageItem } from './MessageItem';
import type { MessageData, ChannelData } from './mockData';

interface MessageListProps {
  channel: ChannelData;
  messages: MessageData[];
  onReact?: (messageId: string, emoji: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  channel,
  messages,
  onReact,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 custom-scrollbar">
      {/* New Channel Welcome Banner */}
      <div className="mb-8 pt-4">
        <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center mb-4 text-zinc-200">
          <Hash className="w-9 h-9" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome to #{channel.name}!
        </h2>
        
        <p className="text-sm text-zinc-400 mt-1 max-w-xl font-normal">
          {channel.topic || `This is the start of the #${channel.name} channel.`}
        </p>

        <div className="h-[1px] bg-zinc-800/60 mt-6" />
      </div>

      {/* Messages Feed */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} onReact={onReact} />
        ))}
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
