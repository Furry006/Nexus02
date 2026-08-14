import React, { useState } from 'react';
import { Mic, MicOff, Headphones, VolumeX, Settings, LogOut } from 'lucide-react';
import type { MemberData } from './mockData';

interface UserPanelProps {
  currentUser: MemberData;
  onOpenSettings?: () => void;
  onLogout?: () => void;
}

export const UserPanel: React.FC<UserPanelProps> = ({
  currentUser,
  onOpenSettings,
  onLogout,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  return (
    <div className="h-14 px-2.5 bg-[#0f0f13] border-t border-zinc-800/40 flex items-center justify-between flex-shrink-0 select-none">
      {/* Left: Avatar & User Info */}
      <div className="flex items-center gap-2 min-w-0 pr-1 cursor-pointer hover:bg-zinc-800/40 p-1 rounded-md transition-colors">
        <div className="relative flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full ${currentUser.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
          >
            {currentUser.name.charAt(0)}
          </div>
          {/* Status Dot */}
          <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0f0f13] absolute -bottom-0.5 -right-0.5" />
        </div>

        <div className="min-w-0 flex flex-col justify-center">
          <span className="text-xs font-semibold text-zinc-200 leading-tight truncate">
            {currentUser.name}
          </span>
          <span className="text-[10.5px] text-zinc-500 leading-tight truncate">
            Online
          </span>
        </div>
      </div>

      {/* Right: Controls (Mic, Headphones, Settings, Logout) */}
      <div className="flex items-center gap-0.5 text-zinc-400">
        <button
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          className={`p-1.5 rounded hover:bg-zinc-800/80 hover:text-zinc-200 transition-colors cursor-pointer ${
            isMuted ? 'text-rose-400 hover:text-rose-300 bg-rose-500/10' : ''
          }`}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setIsDeafened(!isDeafened)}
          title={isDeafened ? 'Undeafen' : 'Deafen'}
          className={`p-1.5 rounded hover:bg-zinc-800/80 hover:text-zinc-200 transition-colors cursor-pointer ${
            isDeafened ? 'text-rose-400 hover:text-rose-300 bg-rose-500/10' : ''
          }`}
        >
          {isDeafened ? <VolumeX className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenSettings}
          title="User Settings"
          className="p-1.5 rounded hover:bg-zinc-800/80 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        {onLogout && (
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-1.5 rounded hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
