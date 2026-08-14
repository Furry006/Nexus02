import React from 'react';
import { Smile, Reply, Pin, MoreHorizontal } from 'lucide-react';
import type { MessageData } from './mockData';

interface MessageItemProps {
  message: MessageData;
  onReact?: (messageId: string, emoji: string) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onReact,
}) => {
  return (
    <div className="hover:bg-zinc-800/30 -mx-4 px-4 py-1.5 rounded transition-colors duration-100 group relative flex items-start gap-3.5 select-text">
      {/* User Avatar */}
      <div
        className={`w-10 h-10 rounded-full ${message.userAvatarBg} text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5`}
      >
        {message.userName.charAt(0)}
      </div>

      {/* Message Body */}
      <div className="flex-1 min-w-0">
        {/* Reply reference preview if applicable */}
        {message.replyTo && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            <div className="w-3 h-2 border-l-2 border-t-2 border-zinc-600 rounded-tl-sm ml-1 mr-0.5" />
            <span className="font-semibold text-zinc-300">@{message.replyTo.userName}</span>
            <span className="truncate text-zinc-500 max-w-md">{message.replyTo.contentSnippet}</span>
          </div>
        )}

        {/* Message Header: Username & Timestamp */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-zinc-100 hover:underline cursor-pointer tracking-tight">
            {message.userName}
          </span>
          <span className="text-[11px] font-normal text-zinc-500">
            {message.timestamp}
          </span>
        </div>

        {/* Message Text Content */}
        <p className="text-sm text-zinc-300 leading-relaxed mt-0.5 font-sans whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Code Snippet Block if present */}
        {message.codeBlock && (
          <div className="mt-2.5 max-w-2xl rounded-lg bg-[#0d0d10] border border-zinc-800/90 overflow-hidden font-mono text-xs text-zinc-200">
            <div className="bg-[#141419] px-3 py-1 border-b border-zinc-800/80 text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
              {message.codeBlock.language}
            </div>
            <pre className="p-3.5 overflow-x-auto leading-relaxed text-purple-200/90 font-mono">
              <code>{message.codeBlock.code}</code>
            </pre>
          </div>
        )}

        {/* Reactions List */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.reactions.map((r, idx) => (
              <button
                key={idx}
                onClick={() => onReact?.(message.id, r.emoji)}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  r.userReacted
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                    : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{r.emoji}</span>
                <span className="text-[11px]">{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Hover Action Bar */}
      <div className="absolute right-4 -top-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#1a1a20] border border-zinc-800 rounded-md shadow-lg p-0.5 flex items-center gap-0.5 text-zinc-400 z-20">
        <button
          onClick={() => onReact?.(message.id, '👍')}
          title="Add Reaction"
          className="p-1 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
        >
          <Smile className="w-3.5 h-3.5" />
        </button>

        <button
          title="Reply"
          className="p-1 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
        >
          <Reply className="w-3.5 h-3.5" />
        </button>

        <button
          title="Pin Message"
          className="p-1 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
        >
          <Pin className="w-3.5 h-3.5" />
        </button>

        <button
          title="More Actions"
          className="p-1 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
