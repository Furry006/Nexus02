import React from 'react';
import { Hash, Settings, UserPlus } from 'lucide-react';
import type { ChannelData } from './mockData';

interface ChannelItemProps {
  channel: ChannelData;
  isSelected: boolean;
  onSelectChannel: (id: string) => void;
}

export const ChannelItem: React.FC<ChannelItemProps> = ({
  channel,
  isSelected,
  onSelectChannel,
}) => {
  return (
    <div
      onClick={() => onSelectChannel(channel.id)}
      className={`h-[34px] px-2 rounded-md flex items-center justify-between group text-xs sm:text-[13.5px] transition-colors duration-150 cursor-pointer select-none ${
        isSelected
          ? 'bg-zinc-800/70 text-zinc-100 font-medium'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
      }`}
    >
      {/* Left: Hash Icon + Channel Name */}
      <div className="flex items-center gap-2 truncate min-w-0">
        <Hash
          className={`w-4 h-4 flex-shrink-0 ${
            isSelected ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-400'
          }`}
        />
        <span className="truncate tracking-tight">{channel.name}</span>
        {channel.unread && !isSelected && (
          <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
        )}
      </div>

      {/* Right: Quick action icons on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          title="Invite to Channel"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
        </button>
        <button
          title="Edit Channel"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
