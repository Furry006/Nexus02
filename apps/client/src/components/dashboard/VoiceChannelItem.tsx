import React from 'react';
import { Volume2, Mic, MicOff, Settings } from 'lucide-react';
import type { ChannelData, MemberData } from './mockData';

interface VoiceChannelItemProps {
  channel: ChannelData;
  isSelected: boolean;
  onSelectChannel: (id: string) => void;
  members: MemberData[];
}

export const VoiceChannelItem: React.FC<VoiceChannelItemProps> = ({
  channel,
  isSelected,
  onSelectChannel,
  members,
}) => {
  const connectedMembers = members.filter(
    (m) => channel.connectedUsers?.includes(m.id) || m.inVoiceChannel === channel.id
  );

  return (
    <div className="space-y-0.5">
      {/* Channel Header Row */}
      <div
        onClick={() => onSelectChannel(channel.id)}
        className={`h-[34px] px-2 rounded-md flex items-center justify-between group text-xs sm:text-[13.5px] transition-colors duration-150 cursor-pointer select-none ${
          isSelected
            ? 'bg-zinc-800/70 text-zinc-100 font-medium'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
        }`}
      >
        <div className="flex items-center gap-2 truncate min-w-0">
          <Volume2
            className={`w-4 h-4 flex-shrink-0 ${
              isSelected ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-400'
            }`}
          />
          <span className="truncate tracking-tight">{channel.name}</span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            title="Voice Settings"
            onClick={(e) => e.stopPropagation()}
            className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Connected Members List under Voice Channel */}
      {connectedMembers.length > 0 && (
        <div className="pl-6 space-y-1 py-1">
          {connectedMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-2 py-1 rounded text-xs text-zinc-300 hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <div
                  className={`w-5 h-5 rounded-full ${member.avatarBg} text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0`}
                >
                  {member.name.charAt(0)}
                </div>
                <span className="truncate text-zinc-300 font-normal">{member.name}</span>
              </div>
              
              <div className="flex items-center gap-1 text-zinc-500">
                <Mic className="w-3 h-3 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
