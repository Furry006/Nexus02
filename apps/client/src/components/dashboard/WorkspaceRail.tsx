import React from 'react';
import { Plus, Compass } from 'lucide-react';
import type { WorkspaceData } from './mockData';

interface WorkspaceRailProps {
  workspaces: WorkspaceData[];
  activeWorkspaceId: string;
  onSelectWorkspace: (id: string) => void;
  onAddWorkspace?: () => void;
  onExploreWorkspaces?: () => void;
}

export const WorkspaceRail: React.FC<WorkspaceRailProps> = ({
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  onAddWorkspace,
  onExploreWorkspaces,
}) => {
  return (
    <aside className="w-[68px] flex-shrink-0 bg-[#0e0e11] border-r border-zinc-800/40 flex flex-col items-center py-3 gap-2 select-none z-20 h-full">
      {/* Home / Nexus Brand Icon */}
      <div className="relative group flex items-center justify-center w-full">
        {/* Active Pill Indicator */}
        <div
          className={`absolute left-0 w-[4px] bg-purple-400 rounded-r-full transition-all duration-150 ${
            activeWorkspaceId === 'home' ? 'h-9 opacity-100' : 'h-0 opacity-0 group-hover:h-5 group-hover:opacity-100'
          }`}
        />
        
        <button
          onClick={() => onSelectWorkspace(workspaces[0]?.id || 'ws-nexus')}
          title="Nexus Home"
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-950/40 text-white font-bold text-lg hover:rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
        >
          N
        </button>
      </div>

      {/* Subtle Divider */}
      <div className="w-8 h-[1.5px] bg-zinc-800/80 my-1 rounded-full flex-shrink-0" />

      {/* Workspace List */}
      <div className="flex-1 w-full flex flex-col items-center gap-2.5 overflow-y-auto custom-scrollbar px-2">
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspaceId;
          return (
            <div key={ws.id} className="relative group flex items-center justify-center w-full flex-shrink-0">
              {/* Active Pill Indicator */}
              <div
                className={`absolute left-0 w-[4px] bg-white rounded-r-full transition-all duration-150 ${
                  isActive ? 'h-9 opacity-100' : 'h-0 opacity-0 group-hover:h-4 group-hover:opacity-100'
                }`}
              />

              <button
                onClick={() => onSelectWorkspace(ws.id)}
                title={ws.name}
                className={`w-11 h-11 flex items-center justify-center font-semibold text-sm transition-all duration-150 relative cursor-pointer ${
                  isActive
                    ? `rounded-xl bg-gradient-to-tr ${ws.iconBg} text-white shadow-md`
                    : 'rounded-2xl bg-zinc-900/80 border border-zinc-800/60 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:rounded-xl'
                }`}
              >
                {ws.shortName}

                {/* Unread Badge */}
                {ws.unreadCount && !isActive ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#0e0e11]">
                    {ws.unreadCount}
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions: Add & Discover */}
      <div className="flex flex-col items-center gap-2 pt-2 border-t border-zinc-800/40 w-full flex-shrink-0">
        <button
          onClick={onAddWorkspace}
          title="Add a Workspace"
          className="w-11 h-11 rounded-2xl bg-zinc-900/60 border border-dashed border-zinc-700/80 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-zinc-800/80 hover:rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer group"
        >
          <Plus className="w-5 h-5 transition-transform duration-150 group-hover:rotate-90" />
        </button>

        <button
          onClick={onExploreWorkspaces}
          title="Explore Public Workspaces"
          className="w-11 h-11 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 hover:text-purple-400 hover:bg-zinc-800/80 hover:rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
