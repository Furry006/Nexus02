import React, { useState } from 'react';
import { Compass, Search, Users, Plus, Radio, Check } from 'lucide-react';
import type { CommunityData, VoiceRoomData } from './mockData';
import { toast } from 'sonner';

interface ExploreViewProps {
  communities: CommunityData[];
  voiceRooms: VoiceRoomData[];
  onJoinCommunity: (communityId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  communities,
  voiceRooms,
  onJoinCommunity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'communities' | 'voice'>('communities');

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#16161b] relative overflow-hidden select-none">
      {/* Header */}
      <header className="h-13 px-6 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">Explore Communities & Voice Rooms</h1>
            <p className="text-xs text-zinc-400">Discover public developer hubs, open source guilds, and active voice spaces.</p>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setTab('communities')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              tab === 'communities' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => setTab('voice')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              tab === 'voice' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Voice Rooms
          </button>
        </div>
      </header>

      {/* Main Content Feed */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
        {/* Search */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communities, topics, or voice rooms..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/60 transition-all"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3 pointer-events-none" />
        </div>

        {/* Communities Section */}
        {tab === 'communities' && (
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
              Public Communities ({filteredCommunities.length})
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCommunities.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.iconBg} text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        {c.shortName}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{c.name}</h3>
                        <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {c.memberCount} members
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {c.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onJoinCommunity(c.id);
                      toast.success(`Joined community: ${c.name}`);
                    }}
                    disabled={c.isJoined}
                    className={`w-full h-9 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      c.isJoined
                        ? 'bg-zinc-800 text-zinc-400 border border-zinc-700/50 cursor-default'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {c.isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Join Community</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voice Rooms Section */}
        {tab === 'voice' && (
          <div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
              Public Voice Rooms ({voiceRooms.length})
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {voiceRooms.map((vr) => (
                <div
                  key={vr.id}
                  className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">{vr.name}</h3>
                  </div>
                  <p className="text-xs text-zinc-400">{vr.participants.length} participants currently connected.</p>
                  <button
                    onClick={() => toast.success(`Connecting to voice room: ${vr.name}`)}
                    className="w-full h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors"
                  >
                    Join Room
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
