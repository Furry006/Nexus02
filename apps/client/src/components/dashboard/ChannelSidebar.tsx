import React, { useState } from 'react';
import { WorkspaceHeader } from './WorkspaceHeader';
import { ChannelCategory } from './ChannelCategory';
import { ChannelItem } from './ChannelItem';
import { VoiceChannelItem } from './VoiceChannelItem';
import { UserPanel } from './UserPanel';
import type { WorkspaceData, ChannelData, MemberData } from './mockData';

interface ChannelSidebarProps {
  activeWorkspace: WorkspaceData;
  channels: ChannelData[];
  selectedChannelId: string;
  onSelectChannel: (id: string) => void;
  currentUser: MemberData;
  members: MemberData[];
  onCreateChannel?: () => void;
  onOpenUserSettings?: () => void;
  onLogout?: () => void;
}

export const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  activeWorkspace,
  channels,
  selectedChannelId,
  onSelectChannel,
  currentUser,
  members,
  onCreateChannel,
  onOpenUserSettings,
  onLogout,
}) => {
  const [textCategoryCollapsed, setTextCategoryCollapsed] = useState(false);
  const [voiceCategoryCollapsed, setVoiceCategoryCollapsed] = useState(false);

  const textChannels = channels.filter((c) => c.type === 'text');
  const voiceChannels = channels.filter((c) => c.type === 'voice');

  return (
    <aside className="w-[240px] lg:w-[256px] flex-shrink-0 bg-[#121216] border-r border-zinc-800/40 flex flex-col h-full select-none z-10 relative">
      {/* Workspace Header Dropdown */}
      <WorkspaceHeader
        workspace={activeWorkspace}
        onCreateChannel={onCreateChannel}
      />

      {/* Channel Navigation Scrollable List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
        {/* TEXT CHANNELS CATEGORY */}
        <ChannelCategory
          title="Text Channels"
          isCollapsed={textCategoryCollapsed}
          onToggleCollapse={() => setTextCategoryCollapsed(!textCategoryCollapsed)}
          onAddChannel={onCreateChannel}
        />

        {!textCategoryCollapsed && (
          <div className="space-y-0.5">
            {textChannels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                isSelected={channel.id === selectedChannelId}
                onSelectChannel={onSelectChannel}
              />
            ))}
          </div>
        )}

        {/* VOICE CHANNELS CATEGORY */}
        <ChannelCategory
          title="Voice Channels"
          isCollapsed={voiceCategoryCollapsed}
          onToggleCollapse={() => setVoiceCategoryCollapsed(!voiceCategoryCollapsed)}
          onAddChannel={onCreateChannel}
        />

        {!voiceCategoryCollapsed && (
          <div className="space-y-0.5">
            {voiceChannels.map((channel) => (
              <VoiceChannelItem
                key={channel.id}
                channel={channel}
                isSelected={channel.id === selectedChannelId}
                onSelectChannel={onSelectChannel}
                members={members}
              />
            ))}
          </div>
        )}
      </div>

      {/* User Panel Anchored at Bottom */}
      <UserPanel
        currentUser={currentUser}
        onOpenSettings={onOpenUserSettings}
        onLogout={onLogout}
      />
    </aside>
  );
};
