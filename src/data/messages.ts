import { VerificationTier } from '../types';

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  text: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'seen';
}

export interface ConversationParticipant {
  id: string;
  fullName: string;
  username: string;
  universityName: string;
  universityId: string;
  verificationTier: VerificationTier;
  avatar?: string;
  bio?: string;
  academicLevel?: string;
  isSelf?: boolean;
}

export interface Conversation {
  id: string;
  participant: ConversationParticipant;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isSelf?: boolean;
}

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-self',
    isSelf: true,
    participant: {
      id: 'usr-chidi',
      fullName: 'You',
      username: 'chidi_cu',
      universityName: 'Covenant University',
      universityId: 'covenant',
      verificationTier: 'blue',
      bio: 'Saved personal notes, lecture reminders, and draft study links.',
      academicLevel: '400L',
      isSelf: true
    },
    lastMessage: 'Check CIVYN tech internship deadline for Flutterwave collegiate accelerator on Friday',
    lastMessageTime: '10 mins ago',
    unreadCount: 0
  },
  {
    id: 'conv-korede',
    isSelf: false,
    participant: {
      id: 'usr-korede',
      fullName: 'Korede Balogun',
      username: 'korede_babcock',
      universityName: 'Babcock University',
      universityId: 'babcock',
      verificationTier: 'blue',
      bio: 'Music & Arts scholar · Tech & creative director at Babcock.',
      academicLevel: '300L'
    },
    lastMessage: 'Awesome bro! Let’s link up when you arrive on Babcock campus for the presentation.',
    lastMessageTime: '32 mins ago',
    unreadCount: 1
  },
  {
    id: 'conv-zainab',
    isSelf: false,
    participant: {
      id: 'usr-zainab',
      fullName: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      universityName: 'Nile University of Nigeria',
      universityId: 'nile',
      verificationTier: 'blue',
      bio: 'Cybersecurity team captain · Inter-collegiate arena competitor.',
      academicLevel: '400L'
    },
    lastMessage: 'Perfect, our Nile team will register tomorrow morning. Thanks!',
    lastMessageTime: '2 hours ago',
    unreadCount: 0
  },
  {
    id: 'conv-tobi',
    isSelf: false,
    participant: {
      id: 'usr-tobi',
      fullName: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      universityName: 'Babcock University',
      universityId: 'babcock',
      verificationTier: 'none',
      bio: '300L Pre-med scholar · Studying biochemistry & campus health.',
      academicLevel: '300L'
    },
    lastMessage: 'Yeah, I just uploaded the PDF summaries to the Academics Library on Univyx, check it out!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, DirectMessage[]> = {
  'conv-self': [
    {
      id: 'msg-s1',
      conversationId: 'conv-self',
      senderId: 'usr-chidi',
      senderName: 'Chidi Okafor',
      senderUsername: 'chidi_cu',
      text: 'CSC 412 Project review checklist: 1. Deploy docker container 2. Benchmark query latency 3. Print faculty approval sign-off slip',
      createdAt: '2026-10-16T10:15:00Z',
      status: 'seen'
    },
    {
      id: 'msg-s2',
      conversationId: 'conv-self',
      senderId: 'usr-chidi',
      senderName: 'Chidi Okafor',
      senderUsername: 'chidi_cu',
      text: 'Check CIVYN tech internship deadline for Flutterwave collegiate accelerator on Friday',
      createdAt: '2026-10-16T15:20:00Z',
      status: 'seen'
    }
  ],
  'conv-korede': [
    {
      id: 'msg-k1',
      conversationId: 'conv-korede',
      senderId: 'usr-korede',
      senderName: 'Korede Balogun',
      senderUsername: 'korede_babcock',
      text: 'Hey Chidi! Saw your project demo post on the feed. Are you presenting at the inter-varsity expo next month?',
      createdAt: '2026-10-16T14:40:00Z',
      status: 'seen'
    },
    {
      id: 'msg-k2',
      conversationId: 'conv-korede',
      senderId: 'usr-chidi',
      senderName: 'Chidi Okafor',
      senderUsername: 'chidi_cu',
      text: 'Hey Korede! Yes, our CST team just submitted the abstract to the faculty committee today.',
      createdAt: '2026-10-16T14:45:00Z',
      status: 'seen'
    },
    {
      id: 'msg-k3',
      conversationId: 'conv-korede',
      senderId: 'usr-korede',
      senderName: 'Korede Balogun',
      senderUsername: 'korede_babcock',
      text: 'Awesome bro! Let’s link up when you arrive on Babcock campus for the presentation.',
      createdAt: '2026-10-16T15:00:00Z',
      status: 'delivered'
    }
  ],
  'conv-zainab': [
    {
      id: 'msg-z1',
      conversationId: 'conv-zainab',
      senderId: 'usr-zainab',
      senderName: 'Zainab Al-Hassan',
      senderUsername: 'zainab_nile',
      text: 'Good evening Chidi. Quick question on the collegiate arena cybersecurity qualifier format.',
      createdAt: '2026-10-16T12:10:00Z',
      status: 'seen'
    },
    {
      id: 'msg-z2',
      conversationId: 'conv-zainab',
      senderId: 'usr-chidi',
      senderName: 'Chidi Okafor',
      senderUsername: 'chidi_cu',
      text: 'Hi Zainab! Sure, it is jeopardy-style CTF covering cryptography and network forensics.',
      createdAt: '2026-10-16T12:20:00Z',
      status: 'seen'
    },
    {
      id: 'msg-z3',
      conversationId: 'conv-zainab',
      senderId: 'usr-zainab',
      senderName: 'Zainab Al-Hassan',
      senderUsername: 'zainab_nile',
      text: 'Perfect, our Nile team will register tomorrow morning. Thanks!',
      createdAt: '2026-10-16T12:25:00Z',
      status: 'seen'
    }
  ],
  'conv-tobi': [
    {
      id: 'msg-t1',
      conversationId: 'conv-tobi',
      senderId: 'usr-tobi',
      senderName: 'Tobi Adebayo',
      senderUsername: 'tobi_adebayo',
      text: 'Bro do you have the past questions for Computer Network Architecture from last semester?',
      createdAt: '2026-10-15T18:10:00Z',
      status: 'seen'
    },
    {
      id: 'msg-t2',
      conversationId: 'conv-tobi',
      senderId: 'usr-chidi',
      senderName: 'Chidi Okafor',
      senderUsername: 'chidi_cu',
      text: 'Yeah, I just uploaded the PDF summaries to the Academics Library on Univyx, check it out!',
      createdAt: '2026-10-15T18:25:00Z',
      status: 'seen'
    }
  ]
};
