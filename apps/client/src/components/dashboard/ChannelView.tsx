import React, { useState } from 'react';
import { ChannelHeader } from './ChannelHeader';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { MemberSidebar } from './MemberSidebar';
import type { ChannelData, MessageData, MemberData } from './mockData';

interface ChannelViewProps {
  channel: ChannelData;
  messages: MessageData[];
  members: MemberData[];
  onSendMessage: (text: string) => void;
  onReactToMessage?: (messageId: string, emoji: string) => void;
}

export const ChannelView: React.FC<ChannelViewProps> = ({
  channel,
  messages,
  members,
  onSendMessage,
  onReactToMessage,
}) => {
  const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(true);

  return (
    <main className="flex-1 flex h-full bg-[#16161b] relative overflow-hidden">
      {/* Central Conversation Column */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <ChannelHeader
          channel={channel}
          isMemberSidebarOpen={isMemberSidebarOpen}
          onToggleMemberSidebar={() => setIsMemberSidebarOpen(!isMemberSidebarOpen)}
        />

        <MessageList
          channel={channel}
          messages={messages}
          onReact={onReactToMessage}
        />

        <MessageComposer
          channel={channel}
          onSendMessage={onSendMessage}
        />
      </div>

      {/* Optional Right Member Sidebar */}
      {isMemberSidebarOpen && (
        <MemberSidebar members={members} />
      )}
    </main>
  );
};
