import React from 'react';
import { Sparkles, MessageSquare, Mic, Users, ArrowRight } from 'lucide-react';
import type { CommunityData, MemberData, VoiceRoomData } from './mockData';

interface HomeViewProps {
  currentUser: MemberData;
  communities: CommunityData[];
  voiceRooms: VoiceRoomData[];
  onSelectNav: (section: 'messages' | 'voice' | 'friends' | 'explore' | 'community') => void;
  onSelectCommunity: (communityId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentUser,
  communities,
  voiceRooms,
  onSelectNav,
  onSelectCommunity,
}) => {
  const joinedCommunities = communities.filter((c) => c.isJoined !== false);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#16161b] relative overflow-hidden select-none">
      {/* Header */}
      <header className="h-13 px-6 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Home Dashboard</span>
        </div>
      </header>

      {/* Main Overview Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Welcome Section */}
        <div className="bg-[#121216] border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {currentUser.name}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal leading-relaxed">
              Your real-time engineering hub is active. Catch up on community channels, join voice rooms, or jump straight into direct messages.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-4">
              <button
                onClick={() => onSelectNav('messages')}
                className="h-8 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Messages</span>
              </button>

              <button
                onClick={() => onSelectNav('voice')}
                className="h-8 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join Voice Room</span>
              </button>
            </div>
          </div>
        </div>

        {/* Your Joined Communities Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Your Communities ({joinedCommunities.length})
            </h3>
            <button
              onClick={() => onSelectNav('explore')}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {joinedCommunities.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCommunity(c.id)}
                className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3.5 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.iconBg} text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md`}
                >
                  {c.shortName}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-zinc-100 text-sm group-hover:text-purple-300 transition-colors truncate">
                    {c.name}
                  </h4>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />
                    {c.memberCount} members
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Voice Rooms Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Active Voice Rooms ({voiceRooms.length})
            </h3>
            <button
              onClick={() => onSelectNav('voice')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {voiceRooms.slice(0, 2).map((vr) => (
              <div
                key={vr.id}
                onClick={() => onSelectNav('voice')}
                className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-4 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-100 text-sm">{vr.name}</h4>
                    <span className="text-[11px] text-zinc-400">{vr.participants.length} connected</span>
                  </div>
                </div>

                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  Join
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
