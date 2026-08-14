import React from 'react';
import { Hash, ChevronDown, Plus, Settings, UserPlus } from 'lucide-react';
import type { CommunityData, ChannelData } from './mockData';

interface CommunitySidebarProps {
  community: CommunityData;
  channels: ChannelData[];
  selectedChannelId: string;
  onSelectChannel: (channelId: string) => void;
  onCreateChannel?: () => void;
}

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
  community,
  channels,
  selectedChannelId,
  onSelectChannel,
  onCreateChannel,
}) => {
  return (
    <aside className="w-[220px] lg:w-[230px] flex-shrink-0 bg-[#121216] border-r border-zinc-800/40 flex flex-col h-full select-none z-10 relative">
      {/* Community Header */}
      <div className="h-13 px-4 border-b border-zinc-800/40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-zinc-100 text-sm tracking-tight truncate">
            {community.name}
          </span>
        </div>
        <button
          onClick={onCreateChannel}
          title="Create Channel"
          className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors rounded cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Text Channels List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3 custom-scrollbar">
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Text Channels</span>
          </div>

          <div className="space-y-0.5">
            {channels.map((channel) => {
              const isSelected = channel.id === selectedChannelId;
              return (
                <div
                  key={channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                  className={`h-8.5 px-2.5 rounded-lg flex items-center justify-between group text-xs sm:text-[13px] transition-colors duration-150 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-zinc-800/70 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate min-w-0">
                    <Hash
                      className={`w-4 h-4 flex-shrink-0 ${
                        isSelected ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    />
                    <span className="truncate tracking-tight">{channel.name}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      title="Invite to Channel"
                      onClick={(e) => e.stopPropagation()}
                      className="p-0.5 text-zinc-500 hover:text-zinc-200 rounded"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
