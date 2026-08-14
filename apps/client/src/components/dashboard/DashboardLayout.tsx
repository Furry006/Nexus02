import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainSidebar } from './MainSidebar';
import type { MainNavSection } from './MainSidebar';
import { CommunitySidebar } from './CommunitySidebar';
import { ChannelView } from './ChannelView';
import { DirectMessagesView } from './DirectMessagesView';
import { VoiceRoomsView } from './VoiceRoomsView';
import { FriendsView } from './FriendsView';
import { ExploreView } from './ExploreView';
import { HomeView } from './HomeView';
import { CreateCommunityModal } from './CreateCommunityModal';
import { userApi, workspaceApi, authApi } from '../../lib/api';
import { toast } from 'sonner';
import {
  MOCK_COMMUNITIES,
  MOCK_COMMUNITY_CHANNELS,
  MOCK_MEMBERS,
  MOCK_VOICE_ROOMS,
  MOCK_DMS,
  INITIAL_MESSAGES,
} from './mockData';
import type {
  CommunityData,
  ChannelData,
  MemberData,
  MessageData,
} from './mockData';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  // Navigation State
  const [activeSection, setActiveSection] = useState<MainNavSection>('home');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Communities Data State
  const [communities, setCommunities] = useState<CommunityData[]>(MOCK_COMMUNITIES);
  const [selectedChannelId, setSelectedChannelId] = useState<string>('general');

  // Direct Messages & Messages State
  const [messagesState, setMessagesState] = useState<Record<string, MessageData[]>>(INITIAL_MESSAGES);
  const [dmConversations, setDmConversations] = useState(MOCK_DMS);

  // Current User State
  const [currentUser, setCurrentUser] = useState<MemberData>(MOCK_MEMBERS[0]);

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Load Real User & Backend Workspaces on Mount
  useEffect(() => {
    let isMounted = true;

    async function loadBackendData() {
      // 1. Fetch Me
      const me = await userApi.getMe();
      if (me && isMounted) {
        setCurrentUser({
          id: me.id || 'u-real',
          name: me.fullName || me.username || 'Mukul',
          username: me.username || 'mukul',
          avatarBg: 'bg-purple-600',
          status: 'online',
          role: 'Owner',
        });
      }

      // 2. Fetch User Workspaces (mapped to Communities)
      const realWorkspaces = await workspaceApi.getMyWorkspaces();
      if (Array.isArray(realWorkspaces) && realWorkspaces.length > 0 && isMounted) {
        const formatted: CommunityData[] = realWorkspaces.map((w, idx) => {
          const colors = [
            'from-purple-600 to-indigo-600',
            'from-indigo-600 to-blue-600',
            'from-emerald-600 to-teal-600',
            'from-amber-600 to-orange-600',
            'from-rose-600 to-pink-600',
          ];
          const initials = w.name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);

          return {
            id: w.id,
            name: w.name,
            shortName: initials || 'C',
            iconBg: colors[idx % colors.length],
            description: w.description || 'Community workspace',
            isJoined: true,
          };
        });

        setCommunities((prev) => {
          const existingIds = new Set(formatted.map((f) => f.id));
          const filteredPrev = prev.filter((p) => !existingIds.has(p.id));
          return [...formatted, ...filteredPrev];
        });
      }
    }

    loadBackendData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Community & Channels Selection Helpers
  const activeCommunity =
    communities.find((c) => c.id === selectedCommunityId) ||
    communities.find((c) => c.isJoined) ||
    communities[0];

  const communityChannels: ChannelData[] =
    (selectedCommunityId && MOCK_COMMUNITY_CHANNELS[selectedCommunityId]) ||
    MOCK_COMMUNITY_CHANNELS['c-nexus'] ||
    [];

  const selectedChannel =
    communityChannels.find((c) => c.id === selectedChannelId) ||
    communityChannels[0] || { id: 'general', name: 'general' };

  const currentChannelMessages = messagesState[selectedChannelId] || [];

  // Navigation Handlers
  const handleSelectNav = (section: MainNavSection) => {
    setActiveSection(section);
    if (section !== 'community') {
      setSelectedCommunityId(null);
    }
  };

  const handleSelectCommunity = (communityId: string) => {
    setSelectedCommunityId(communityId);
    setActiveSection('community');
    const channels = MOCK_COMMUNITY_CHANNELS[communityId] || MOCK_COMMUNITY_CHANNELS['c-nexus'];
    if (channels && channels.length > 0) {
      setSelectedChannelId(channels[0].id);
    }
  };

  const handleSendMessage = (text: string) => {
    const newMessage: MessageData = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatarBg: currentUser.avatarBg,
      timestamp: 'Just now',
      content: text,
    };

    setMessagesState((prev) => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] || []), newMessage],
    }));
  };

  const handleSendDmMessage = (conversationId: string, text: string) => {
    const newMessage: MessageData = {
      id: `dm-msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatarBg: currentUser.avatarBg,
      timestamp: 'Just now',
      content: text,
    };

    setMessagesState((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage],
    }));

    setDmConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: text, timestamp: 'Just now' }
          : c
      )
    );
  };

  const handleReactToMessage = (messageId: string, emoji: string) => {
    setMessagesState((prev) => {
      const channelMsgs = prev[selectedChannelId] || [];
      const updated = channelMsgs.map((m) => {
        if (m.id !== messageId) return m;
        const reactions = m.reactions ? [...m.reactions] : [];
        const existingIdx = reactions.findIndex((r) => r.emoji === emoji);

        if (existingIdx >= 0) {
          const r = reactions[existingIdx];
          if (r.userReacted) {
            r.count -= 1;
            r.userReacted = false;
          } else {
            r.count += 1;
            r.userReacted = true;
          }
        } else {
          reactions.push({ emoji, count: 1, userReacted: true });
        }

        return { ...m, reactions: reactions.filter((r) => r.count > 0) };
      });

      return {
        ...prev,
        [selectedChannelId]: updated,
      };
    });
  };

  const handleCommunityCreated = (newCommunity: { id: string; name: string; description?: string }) => {
    const initials = newCommunity.name
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const formattedCommunity: CommunityData = {
      id: newCommunity.id,
      name: newCommunity.name,
      shortName: initials || 'C',
      iconBg: 'from-purple-600 to-indigo-600',
      description: newCommunity.description,
      isJoined: true,
      memberCount: 1,
    };

    setCommunities((prev) => [formattedCommunity, ...prev]);

    // Set mock channels for newly created community
    MOCK_COMMUNITY_CHANNELS[newCommunity.id] = [
      { id: 'general', name: 'general', topic: `General channel for ${newCommunity.name}` },
      { id: 'frontend', name: 'frontend', topic: 'Frontend discussions' },
      { id: 'backend', name: 'backend', topic: 'Backend discussions' },
      { id: 'random', name: 'random', topic: 'Random discussions' },
    ];

    handleSelectCommunity(newCommunity.id);
  };

  const handleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === communityId ? { ...c, isJoined: true } : c))
    );
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success('Logged out successfully.');
    } catch {
      toast.info('Logged out.');
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#09090b] text-zinc-100 select-none antialiased">
      {/* 1. PERSISTENT MAIN LEFT SIDEBAR */}
      <MainSidebar
        activeSection={activeSection}
        selectedCommunityId={selectedCommunityId}
        onSelectNav={handleSelectNav}
        onSelectCommunity={handleSelectCommunity}
        communities={communities}
        currentUser={currentUser}
        onOpenCreateCommunity={() => setIsCreateModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. DYNAMIC CONTENT AREA BASED ON ACTIVE NAVIGATION SECTION */}

      {/* A. COMMUNITY VIEW */}
      {activeSection === 'community' && activeCommunity && (
        <div className="flex-1 flex h-full min-w-0">
          {/* Second Narrow Community Channels Sidebar */}
          <CommunitySidebar
            community={activeCommunity}
            channels={communityChannels}
            selectedChannelId={selectedChannelId}
            onSelectChannel={(id) => setSelectedChannelId(id)}
            onCreateChannel={() => toast.info('Create channel feature is ready.')}
          />

          {/* Main Channel Chat Canvas */}
          <ChannelView
            channel={selectedChannel}
            messages={currentChannelMessages}
            members={MOCK_MEMBERS}
            onSendMessage={handleSendMessage}
            onReactToMessage={handleReactToMessage}
          />
        </div>
      )}

      {/* B. HOME VIEW */}
      {activeSection === 'home' && (
        <HomeView
          currentUser={currentUser}
          communities={communities}
          voiceRooms={MOCK_VOICE_ROOMS}
          onSelectNav={handleSelectNav}
          onSelectCommunity={handleSelectCommunity}
        />
      )}

      {/* C. MESSAGES / DIRECT MESSAGES VIEW */}
      {activeSection === 'messages' && (
        <DirectMessagesView
          conversations={dmConversations}
          messages={messagesState}
          onSendMessage={handleSendDmMessage}
        />
      )}

      {/* D. VOICE ROOMS VIEW */}
      {activeSection === 'voice' && (
        <VoiceRoomsView
          rooms={MOCK_VOICE_ROOMS}
          currentUser={currentUser}
        />
      )}

      {/* E. FRIENDS VIEW */}
      {activeSection === 'friends' && (
        <FriendsView
          friends={MOCK_MEMBERS.filter((m) => m.id !== currentUser.id)}
          onStartDm={(userId) => {
            const dm = dmConversations.find((c) => c.user.id === userId);
            if (dm) {
              handleSelectNav('messages');
            } else {
              toast.info('Starting conversation...');
              handleSelectNav('messages');
            }
          }}
        />
      )}

      {/* F. EXPLORE VIEW */}
      {activeSection === 'explore' && (
        <ExploreView
          communities={communities}
          voiceRooms={MOCK_VOICE_ROOMS}
          onJoinCommunity={handleJoinCommunity}
        />
      )}

      {/* Create Community Modal */}
      <CreateCommunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCommunityCreated={handleCommunityCreated}
      />
    </div>
  );
};

export default DashboardLayout;
