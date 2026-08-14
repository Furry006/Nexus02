import React from 'react';
import { Hash, Volume2, Phone, Video, Pin, Users, Search, Bell } from 'lucide-react';
import type { ChannelData } from './mockData';

interface ChannelHeaderProps {
  channel: ChannelData;
  isMemberSidebarOpen: boolean;
  onToggleMemberSidebar: () => void;
}

export const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  channel,
  isMemberSidebarOpen,
  onToggleMemberSidebar,
}) => {
  return (
    <header className="h-12 px-4 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0 z-10 select-none">
      {/* Left: Icon, Channel Name, Topic */}
      <div className="flex items-center gap-2 min-w-0 pr-2">
        {channel.type === 'voice' ? (
          <Volume2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        ) : (
          <Hash className="w-5 h-5 text-zinc-400 flex-shrink-0" />
        )}
        
        <h1 className="font-semibold text-zinc-100 text-sm sm:text-base tracking-tight truncate">
          {channel.name}
        </h1>

        {channel.topic && (
          <>
            <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden sm:block flex-shrink-0" />
            <p className="text-xs text-zinc-400 truncate hidden md:block max-w-md font-normal">
              {channel.topic}
            </p>
          </>
        )}
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-1.5 text-zinc-400 flex-shrink-0">
        <button
          title="Start Voice Call"
          className="p-1.5 rounded hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          title="Start Video Call"
          className="p-1.5 rounded hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <Video className="w-4 h-4" />
        </button>

        <button
          title="Pinned Messages"
          className="p-1.5 rounded hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <Pin className="w-4 h-4" />
        </button>

        {/* Member Sidebar Toggle Button */}
        <button
          onClick={onToggleMemberSidebar}
          title={isMemberSidebarOpen ? 'Hide Member List' : 'Show Member List'}
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            isMemberSidebarOpen
              ? 'bg-zinc-800 text-zinc-100'
              : 'hover:bg-zinc-800/60 hover:text-zinc-200'
          }`}
        >
          <Users className="w-4 h-4" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center ml-1">
          <input
            type="text"
            placeholder="Search"
            className="w-36 lg:w-44 h-7 pl-7 pr-2 rounded bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:w-56 focus:border-zinc-700 transition-all duration-150"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2 pointer-events-none" />
        </div>

        <button
          title="Notification Settings"
          className="p-1.5 rounded hover:bg-zinc-800/60 hover:text-zinc-200 transition-colors cursor-pointer ml-1"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
