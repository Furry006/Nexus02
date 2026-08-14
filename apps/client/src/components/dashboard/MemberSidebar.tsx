import React from 'react';
import type { MemberData } from './mockData';

interface MemberSidebarProps {
  members: MemberData[];
}

export const MemberSidebar: React.FC<MemberSidebarProps> = ({ members }) => {
  const onlineMembers = members.filter((m) => m.status !== 'offline');
  const offlineMembers = members.filter((m) => m.status === 'offline');

  return (
    <aside className="w-60 flex-shrink-0 bg-[#121216] border-l border-zinc-800/40 flex flex-col h-full select-none overflow-y-auto px-3 py-4 custom-scrollbar z-10">
      {/* ONLINE MEMBERS CATEGORY */}
      <div className="mb-4">
        <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-2">
          Online — {onlineMembers.length}
        </div>

        <div className="space-y-1">
          {onlineMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-zinc-800/40 cursor-pointer transition-colors group"
            >
              {/* Avatar & Status Indicator */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full ${member.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
                >
                  {member.name.charAt(0)}
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 border-[#121216] absolute -bottom-0.5 -right-0.5 ${
                    member.status === 'online'
                      ? 'bg-emerald-500'
                      : member.status === 'idle'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                    {member.name}
                  </span>
                  <span className="text-[9.5px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 font-medium">
                    {member.role}
                  </span>
                </div>

                <span className="text-[10.5px] text-zinc-500 truncate">
                  {member.statusText || `@${member.username}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFLINE MEMBERS CATEGORY */}
      <div>
        <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-2">
          Offline — {offlineMembers.length}
        </div>

        <div className="space-y-1">
          {offlineMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-zinc-800/40 cursor-pointer transition-colors group opacity-60 hover:opacity-100"
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full ${member.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
                >
                  {member.name.charAt(0)}
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-[#121216] absolute -bottom-0.5 -right-0.5" />
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <span className="text-xs font-semibold text-zinc-300 group-hover:text-white truncate">
                  {member.name}
                </span>
                <span className="text-[10.5px] text-zinc-500 truncate">
                  @{member.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
