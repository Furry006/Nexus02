export interface CommunityData {
  id: string;
  name: string;
  shortName: string;
  iconBg: string;
  description?: string;
  memberCount?: number;
  isJoined?: boolean;
}

export interface ChannelData {
  id: string;
  name: string;
  topic?: string;
  unread?: boolean;
}

export interface MemberData {
  id: string;
  name: string;
  username: string;
  avatarBg: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  role: 'Owner' | 'Core Dev' | 'Frontend' | 'Backend' | 'DevOps' | 'Design';
  statusText?: string;
}

export interface MessageData {
  id: string;
  userId: string;
  userName: string;
  userAvatarBg: string;
  timestamp: string;
  content: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  reactions?: {
    emoji: string;
    count: number;
    userReacted?: boolean;
  }[];
  replyTo?: {
    userName: string;
    contentSnippet: string;
  };
}

export interface DirectMessageConversation {
  id: string;
  user: MemberData;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export interface VoiceRoomData {
  id: string;
  name: string;
  type: 'Public' | 'Friends-Only' | 'Invite-Only';
  isLocked?: boolean;
  participants: MemberData[];
  maxParticipants?: number;
}

export const MOCK_COMMUNITIES: CommunityData[] = [
  {
    id: 'c-nexus',
    name: 'Nexus Developers',
    shortName: 'ND',
    iconBg: 'from-purple-600 to-indigo-600',
    description: 'Official Nexus developer community for core engineering and updates.',
    memberCount: 1420,
    isJoined: true,
  },
  {
    id: 'c-codetogether',
    name: 'Code Together',
    shortName: 'CT',
    iconBg: 'from-indigo-600 to-blue-600',
    description: 'Pair programming, live code reviews, and project collaboration.',
    memberCount: 890,
    isJoined: true,
  },
  {
    id: 'c-opensource',
    name: 'Open Source India',
    shortName: 'OS',
    iconBg: 'from-emerald-600 to-teal-600',
    description: 'Building and contributing to open source projects together.',
    memberCount: 2300,
    isJoined: true,
  },
  {
    id: 'c-frontend',
    name: 'Frontend Guild',
    shortName: 'FG',
    iconBg: 'from-amber-600 to-orange-600',
    description: 'React, Vite, Tailwind CSS, TypeScript, and modern UI engineering.',
    memberCount: 640,
    isJoined: false,
  },
  {
    id: 'c-ai',
    name: 'AI & Distributed Systems',
    shortName: 'AI',
    iconBg: 'from-rose-600 to-pink-600',
    description: 'LLM agents, distributed systems, and real-time backend architectures.',
    memberCount: 1150,
    isJoined: false,
  },
];

export const MOCK_COMMUNITY_CHANNELS: Record<string, ChannelData[]> = {
  'c-nexus': [
    { id: 'general', name: 'general', topic: 'General discussion for Nexus Developers.' },
    { id: 'frontend', name: 'frontend', topic: 'React, Vite, Tailwind, and client architecture.' },
    { id: 'backend', name: 'backend', topic: 'Bun, Hono, Drizzle ORM, and database queries.' },
    { id: 'random', name: 'random', topic: 'Tech news, memes, and casual conversations.' },
  ],
  'c-codetogether': [
    { id: 'general', name: 'general', topic: 'Welcome to Code Together!' },
    { id: 'pair-requests', name: 'pair-requests', topic: 'Find a partner to pair program on your project.' },
    { id: 'showcase', name: 'showcase', topic: 'Show off what you built today.' },
  ],
  'c-opensource': [
    { id: 'general', name: 'general', topic: 'Open Source India main channel.' },
    { id: 'good-first-issues', name: 'good-first-issues', topic: 'Beginner-friendly repositories and issues.' },
    { id: 'projects', name: 'projects', topic: 'Share open-source repositories needing contributors.' },
  ],
};

export const MOCK_MEMBERS: MemberData[] = [
  {
    id: 'u-1',
    name: 'Mukul',
    username: 'mukul',
    avatarBg: 'bg-purple-600',
    status: 'online',
    role: 'Owner',
    statusText: 'Building Nexus 🚀',
  },
  {
    id: 'u-2',
    name: 'Sarah Chen',
    username: 'sarah.c',
    avatarBg: 'bg-indigo-600',
    status: 'online',
    role: 'Core Dev',
    statusText: 'Reviewing PR #142',
  },
  {
    id: 'u-3',
    name: 'Alex Rivera',
    username: 'arivera',
    avatarBg: 'bg-blue-600',
    status: 'online',
    role: 'Frontend',
  },
  {
    id: 'u-4',
    name: 'Elena Rostova',
    username: 'elena_r',
    avatarBg: 'bg-emerald-600',
    status: 'idle',
    role: 'DevOps',
    statusText: 'Deploying staging node',
  },
  {
    id: 'u-5',
    name: 'David Kim',
    username: 'dkim',
    avatarBg: 'bg-zinc-600',
    status: 'offline',
    role: 'Backend',
  },
  {
    id: 'u-6',
    name: 'Priya Sharma',
    username: 'priya_s',
    avatarBg: 'bg-amber-600',
    status: 'offline',
    role: 'Design',
  },
  {
    id: 'u-7',
    name: 'Marcus Vance',
    username: 'mvance',
    avatarBg: 'bg-rose-600',
    status: 'offline',
    role: 'Core Dev',
  },
];

export const MOCK_VOICE_ROOMS: VoiceRoomData[] = [
  {
    id: 'vr-standup',
    name: 'Daily Engineering Standup',
    type: 'Public',
    participants: [MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2]],
    maxParticipants: 10,
  },
  {
    id: 'vr-frontend',
    name: 'Frontend Pair Coding',
    type: 'Friends-Only',
    participants: [MOCK_MEMBERS[1], MOCK_MEMBERS[2]],
    maxParticipants: 4,
  },
  {
    id: 'vr-devops',
    name: 'Infra & Cluster Sync',
    type: 'Public',
    participants: [MOCK_MEMBERS[3]],
    maxParticipants: 8,
  },
  {
    id: 'vr-lounge',
    name: 'Late Night Coffee & Chill',
    type: 'Public',
    participants: [MOCK_MEMBERS[0], MOCK_MEMBERS[4], MOCK_MEMBERS[5]],
    maxParticipants: 16,
  },
];

export const MOCK_DMS: DirectMessageConversation[] = [
  {
    id: 'dm-sarah',
    user: MOCK_MEMBERS[1],
    lastMessage: 'Awesome work! I tested the WebSocket reconnect flow on client side.',
    timestamp: '2:16 PM',
    unreadCount: 1,
  },
  {
    id: 'dm-alex',
    user: MOCK_MEMBERS[2],
    lastMessage: 'Here is the WebSocket client helper I am wiring up.',
    timestamp: '2:20 PM',
  },
  {
    id: 'dm-elena',
    user: MOCK_MEMBERS[3],
    lastMessage: 'Staging cluster deployed with Bun 1.1 runtime.',
    timestamp: '1:05 PM',
  },
  {
    id: 'dm-david',
    user: MOCK_MEMBERS[4],
    lastMessage: 'Catch you tomorrow for the database schema review.',
    timestamp: 'Yesterday',
  },
];

export const INITIAL_MESSAGES: Record<string, MessageData[]> = {
  general: [
    {
      id: 'm-1',
      userId: 'u-1',
      userName: 'Mukul',
      userAvatarBg: 'bg-purple-600',
      timestamp: 'Today at 2:14 PM',
      content:
        'Hey team, I just pushed the auth service optimization with Hono & Drizzle ORM. Let me know if you encounter any token refresh edge cases.',
      reactions: [
        { emoji: '🚀', count: 4, userReacted: true },
        { emoji: '🔥', count: 2 },
      ],
    },
    {
      id: 'm-2',
      userId: 'u-2',
      userName: 'Sarah Chen',
      userAvatarBg: 'bg-indigo-600',
      timestamp: 'Today at 2:16 PM',
      replyTo: {
        userName: 'Mukul',
        contentSnippet: 'I just pushed the auth service optimization...',
      },
      content:
        "Awesome work! I'm testing the automatic reconnect flow on the client side right now. Authentication handshakes feel super crisp.",
      reactions: [{ emoji: '🙌', count: 3 }],
    },
    {
      id: 'm-3',
      userId: 'u-3',
      userName: 'Alex Rivera',
      userAvatarBg: 'bg-blue-600',
      timestamp: 'Today at 2:20 PM',
      content:
        "Here is the WebSocket client helper I'm wiring into the channel layout:",
      codeBlock: {
        language: 'typescript',
        code: `export async function connectWebSocket(endpoint: string) {
  const socket = new WebSocket(endpoint);
  
  socket.onopen = () => {
    console.log('[Nexus] WS connection established');
  };

  return socket;
}`,
      },
      reactions: [{ emoji: '⚡', count: 5, userReacted: true }],
    },
    {
      id: 'm-4',
      userId: 'u-4',
      userName: 'Elena Rostova',
      userAvatarBg: 'bg-emerald-600',
      timestamp: 'Today at 2:25 PM',
      content:
        'Is anyone working on the voice channel latency benchmarks today? Staging clusters are ready for testing.',
    },
    {
      id: 'm-5',
      userId: 'u-1',
      userName: 'Mukul',
      userAvatarBg: 'bg-purple-600',
      timestamp: 'Today at 2:28 PM',
      content:
        'Yeah, running the WebRTC audio packet stress tests on the Frankfurt node right now.',
      reactions: [{ emoji: '👍', count: 2 }],
    },
  ],
  frontend: [
    {
      id: 'mf-1',
      userId: 'u-3',
      userName: 'Alex Rivera',
      userAvatarBg: 'bg-blue-600',
      timestamp: 'Today at 11:40 AM',
      content:
        'Updated Vite config to handle module aliases seamlessly. Tailwind CSS v4 builds in under 200ms.',
    },
  ],
  backend: [
    {
      id: 'mb-1',
      userId: 'u-4',
      userName: 'Elena Rostova',
      userAvatarBg: 'bg-emerald-600',
      timestamp: 'Today at 1:05 PM',
      content:
        'Staging cluster deployed with Bun 1.1 runtime. Latency down by ~18% across all OpenAPI endpoints.',
    },
  ],
  'dm-sarah': [
    {
      id: 'dms-1',
      userId: 'u-2',
      userName: 'Sarah Chen',
      userAvatarBg: 'bg-indigo-600',
      timestamp: 'Today at 2:16 PM',
      content:
        'Awesome work! I tested the WebSocket reconnect flow on client side. Working like a charm.',
    },
  ],
  'dm-alex': [
    {
      id: 'dma-1',
      userId: 'u-3',
      userName: 'Alex Rivera',
      userAvatarBg: 'bg-blue-600',
      timestamp: 'Today at 2:20 PM',
      content:
        'Hey Mukul! Here is the code snippet for the real-time client listener.',
    },
  ],
};
