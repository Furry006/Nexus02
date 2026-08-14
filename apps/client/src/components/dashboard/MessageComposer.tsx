import React, { useState } from 'react';
import { PlusCircle, Code2, Smile, Send } from 'lucide-react';
import type { ChannelData } from './mockData';

interface MessageComposerProps {
  channel: ChannelData;
  onSendMessage: (text: string) => void;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  channel,
  onSendMessage,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 pt-1 bg-[#141419] flex-shrink-0 select-none">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e24] border border-zinc-800/80 rounded-xl px-4 py-2 flex items-center gap-3 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all duration-150"
      >
        {/* Attachment Button */}
        <button
          type="button"
          title="Upload Attachment"
          className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors rounded cursor-pointer flex-shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channel.name}...`}
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none py-1 font-sans"
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 text-zinc-400 flex-shrink-0">
          <button
            type="button"
            title="Insert Code Block"
            onClick={() => setText((prev) => prev + '\n```ts\n\n```')}
            className="p-1.5 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            title="Add Emoji"
            className="p-1.5 hover:bg-zinc-800 hover:text-zinc-200 rounded transition-colors cursor-pointer"
          >
            <Smile className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!text.trim()}
            title="Send Message"
            className={`p-1.5 rounded transition-all duration-150 cursor-pointer ${
              text.trim()
                ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-sm'
                : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
