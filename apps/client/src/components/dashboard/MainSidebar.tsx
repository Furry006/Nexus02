import React from 'react';
import { Home, MessageSquare, Mic, Users, Compass, Plus } from 'lucide-react';
import { UserPanel } from './UserPanel';
import type { CommunityData, MemberData } from './mockData';

export type MainNavSection = 'home' | 'messages' | 'voice' | 'friends' | 'explore' | 'community';

interface MainSidebarProps {
  activeSection: MainNavSection;
  selectedCommunityId: string | null;
  onSelectNav: (section: MainNavSection) => void;
  onSelectCommunity: (communityId: string) => void;
  communities: CommunityData[];
  currentUser: MemberData;
  onOpenCreateCommunity: () => void;
  onLogout?: () => void;
}

export const MainSidebar: React.FC<MainSidebarProps> = ({
  activeSection,
  selectedCommunityId,
  onSelectNav,
  onSelectCommunity,
  communities,
  currentUser,
  onOpenCreateCommunity,
  onLogout,
}) => {
  const joinedCommunities = communities.filter((c) => c.isJoined !== false);

  const mainNavItems = [
    { id: 'home' as MainNavSection, label: 'Home', icon: Home },
    { id: 'messages' as MainNavSection, label: 'Messages', icon: MessageSquare },
    { id: 'voice' as MainNavSection, label: 'Voice Rooms', icon: Mic },
    { id: 'friends' as MainNavSection, label: 'Friends', icon: Users },
    { id: 'explore' as MainNavSection, label: 'Explore', icon: Compass },
  ];

  return (
    <aside className="w-[230px] lg:w-[240px] flex-shrink-0 bg-[#0e0e11] border-r border-zinc-800/40 flex flex-col h-full select-none z-20 relative">
      {/* Nexus Top Header / Brand Logo */}
      <div className="h-13 px-4 border-b border-zinc-800/40 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-sm">
            N
          </div>
          <span className="font-bold text-white tracking-tight text-base">Nexus</span>
        </div>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
          v2.0
        </span>
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 custom-scrollbar">
        {/* Primary Navigation List */}
        <div className="space-y-0.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`w-full h-9 px-2.5 rounded-lg flex items-center gap-3 text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800/80 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-purple-400' : 'text-zinc-500'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/60 my-2" />

        {/* YOUR COMMUNITIES SECTION */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Your Communities</span>
            <button
              onClick={onOpenCreateCommunity}
              title="Create or Join Community"
              className="p-0.5 text-zinc-500 hover:text-zinc-200 transition-colors rounded cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-0.5">
            {joinedCommunities.map((community) => {
              const isCommunityActive =
                activeSection === 'community' && selectedCommunityId === community.id;
              return (
                <button
                  key={community.id}
                  onClick={() => onSelectCommunity(community.id)}
                  className={`w-full h-9 px-2.5 rounded-lg flex items-center gap-2.5 text-xs sm:text-[13px] font-medium transition-all duration-150 cursor-pointer group truncate ${
                    isCommunityActive
                      ? 'bg-zinc-800/80 text-white font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md bg-gradient-to-tr ${community.iconBg} text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0`}
                  >
                    {community.shortName}
                  </div>
                  <span className="truncate tracking-tight">{community.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Panel Anchored at Bottom */}
      <UserPanel
        currentUser={currentUser}
        onLogout={onLogout}
      />
    </aside>
  );
};
