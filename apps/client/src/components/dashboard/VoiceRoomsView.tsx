import React, { useState } from 'react';
import { Mic, MicOff, Headphones, VolumeX, Lock, Globe, Users, Plus, PhoneOff, Radio } from 'lucide-react';
import type { VoiceRoomData, MemberData } from './mockData';
import { toast } from 'sonner';

interface VoiceRoomsViewProps {
  rooms: VoiceRoomData[];
  currentUser: MemberData;
}

export const VoiceRoomsView: React.FC<VoiceRoomsViewProps> = ({
  rooms,
  currentUser,
}) => {
  const [activeConnectedRoomId, setActiveConnectedRoomId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const connectedRoom = rooms.find((r) => r.id === activeConnectedRoomId);

  const handleJoinRoom = (room: VoiceRoomData) => {
    if (activeConnectedRoomId === room.id) return;
    setActiveConnectedRoomId(room.id);
    toast.success(`Connected to voice room: "${room.name}"`);
  };

  const handleLeaveRoom = () => {
    if (connectedRoom) {
      toast.info(`Left voice room: "${connectedRoom.name}"`);
    }
    setActiveConnectedRoomId(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#16161b] relative overflow-hidden select-none">
      {/* Header */}
      <header className="h-13 px-6 border-b border-zinc-800/40 flex items-center justify-between bg-[#141419] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">Voice Rooms</h1>
            <p className="text-xs text-zinc-400">Live spatial voice channels for real-time developer collaboration.</p>
          </div>
        </div>

        <button
          onClick={() => toast.info('Create custom room dialog opened.')}
          className="h-9 px-3.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Room</span>
        </button>
      </header>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
        {/* Connected Voice Session Banner if active */}
        {connectedRoom && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Connected Voice Room</span>
                <h3 className="text-base font-bold text-white">{connectedRoom.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsDeafened(!isDeafened)}
                className={`p-2 rounded-lg transition-colors ${
                  isDeafened ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                {isDeafened ? <VolumeX className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
              </button>

              <button
                onClick={handleLeaveRoom}
                className="h-9 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Voice Rooms Cards Grid */}
        <div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
            Active Voice Rooms ({rooms.length})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => {
              const isCurrentRoom = activeConnectedRoomId === room.id;
              return (
                <div
                  key={room.id}
                  className={`bg-[#121216] border rounded-xl p-4 flex flex-col justify-between space-y-4 transition-all duration-150 ${
                    isCurrentRoom ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-zinc-800/80 hover:border-zinc-700/80'
                  }`}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-100 text-sm">{room.name}</h3>
                        {room.isLocked && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">
                          <Globe className="w-3 h-3 text-zinc-500" />
                          {room.type}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-zinc-400 flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      {room.participants.length} {room.maxParticipants ? `/ ${room.maxParticipants}` : ''}
                    </span>
                  </div>

                  {/* Participants Avatar Grid */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {room.participants.map((p) => (
                      <div key={p.id} className="relative group">
                        <div
                          className={`w-8 h-8 rounded-full ${p.avatarBg} text-white font-bold text-xs flex items-center justify-center border-2 border-[#121216]`}
                          title={p.name}
                        >
                          {p.name.charAt(0)}
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#121216] absolute -bottom-0.5 -right-0.5" />
                      </div>
                    ))}
                    {room.participants.length === 0 && (
                      <span className="text-xs text-zinc-500 font-normal italic">No participants yet</span>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <button
                    onClick={() => handleJoinRoom(room)}
                    disabled={isCurrentRoom}
                    className={`w-full h-9 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isCurrentRoom
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isCurrentRoom ? 'Connected' : 'Join Voice Room'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
