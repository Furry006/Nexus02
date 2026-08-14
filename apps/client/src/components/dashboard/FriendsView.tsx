import React, { useState } from 'react';
import { Users, MessageSquare, Phone, MoreVertical, UserPlus, Search } from 'lucide-react';
import type { MemberData } from './mockData';
import { toast } from 'sonner';

interface FriendsViewProps {
  friends: MemberData[];
  onStartDm: (userId: string) => void;
}

export const FriendsView: React.FC<FriendsViewProps> = ({
  friends,
  onStartDm,
}) => {
  const [filter, setFilter] = useState<'all' | 'online' | 'pending'>('online');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = friends.filter((f) => {
    if (filter === 'online' && f.status === 'offline') return false;
    if (searchQuery.trim()) {
      return (
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#16161b] relative overflow-hidden select-none">
      {/* Header */}
      <header className="h-13 px-6 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Friends</span>
          </div>

          <div className="h-4 w-[1px] bg-zinc-800" />

          {/* Filter Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('online')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === 'online'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Online ({friends.filter((f) => f.status !== 'offline').length})
            </button>

            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({friends.length})
            </button>

            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                filter === 'pending'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        <button
          onClick={() => toast.info('Add Friend dialog opened')}
          className="h-8 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Friend</span>
        </button>
      </header>

      {/* Main Friends Feed */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        {/* Friends List */}
        <div className="space-y-1 pt-2">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#121216] border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-150 group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full ${friend.avatarBg} text-white font-bold text-sm flex items-center justify-center`}
                  >
                    {friend.name.charAt(0)}
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full border-2 border-[#121216] absolute -bottom-0.5 -right-0.5 ${
                      friend.status === 'online'
                        ? 'bg-emerald-500'
                        : friend.status === 'idle'
                        ? 'bg-amber-500'
                        : 'bg-zinc-600'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-100 text-sm">{friend.name}</span>
                    <span className="text-xs text-zinc-500">@{friend.username}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{friend.statusText || friend.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartDm(friend.id)}
                  title="Message"
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-purple-600 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                <button
                  title="Call"
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  title="More Options"
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
