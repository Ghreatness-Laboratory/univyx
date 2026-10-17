export type RoomTopic =
  | 'Campus Gist'
  | 'Academics'
  | 'Music'
  | 'Sports'
  | 'Career'
  | 'Gaming'
  | 'Events';

export type RoomScope = 'everyone' | 'my_university';
export type RoomStatus = 'live' | 'upcoming' | 'ended';

export interface RoomParticipant {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  universityName: string;
  isHost?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  handRaised?: boolean;
  role: 'host' | 'co-host' | 'speaker' | 'listener';
}

export interface GistRoom {
  id: string;
  title: string;
  topic: RoomTopic;
  scope: RoomScope;
  location?: string;
  status: RoomStatus;
  scheduledFor?: string;
  startedAt?: string;
  allowSpeakerRequests: boolean;
  isReminderSet?: boolean;
  host: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    universityName: string;
    universityId: string;
    verificationTier?: 'none' | 'blue' | 'gold';
  };
  speakers: RoomParticipant[];
  listeners: RoomParticipant[];
  listenerCount: number;
  speakerCount: number;
}

export const ROOM_TOPICS: RoomTopic[] = [
  'Campus Gist',
  'Academics',
  'Music',
  'Sports',
  'Career',
  'Gaming',
  'Events'
];

export const INITIAL_ROOMS: GistRoom[] = [
  {
    id: 'room-1',
    title: 'CU vs Babcock Tech Banter: Who actually builds better React & Rust projects?',
    topic: 'Campus Gist',
    scope: 'everyone',
    location: 'Covenant University, Ota (Canaanland)',
    status: 'live',
    startedAt: '35 mins ago',
    allowSpeakerRequests: true,
    isReminderSet: false,
    host: {
      id: 'usr-chidi',
      name: 'Chidi Okafor',
      username: 'chidi_cu',
      universityName: 'Covenant University',
      universityId: 'covenant',
      verificationTier: 'blue'
    },
    speakers: [
      {
        id: 'usr-chidi',
        name: 'Chidi Okafor',
        username: 'chidi_cu',
        universityName: 'Covenant University',
        isHost: true,
        isSpeaking: true,
        isMuted: false,
        role: 'host'
      },
      {
        id: 'usr-babcock-lead',
        name: 'Tolani Adeleke',
        username: 'tolani_bu',
        universityName: 'Babcock University',
        isSpeaking: false,
        isMuted: false,
        role: 'co-host'
      },
      {
        id: 'usr-abuad-dev',
        name: 'Femi Alabi',
        username: 'femialabi_abuad',
        universityName: 'ABUAD',
        isSpeaking: false,
        isMuted: true,
        role: 'speaker'
      }
    ],
    listeners: [
      { id: 'l1', name: 'Zainab Danjuma', username: 'zainab_nile', universityName: 'Nile University', role: 'listener' },
      { id: 'l2', name: 'Damilola Ajayi', username: 'dami_pau', universityName: 'Pan-Atlantic University', role: 'listener' },
      { id: 'l3', name: 'Kelechi Nwosu', username: 'kay_bowen', universityName: 'Bowen University', role: 'listener' },
      { id: 'l4', name: 'Emeka Eze', username: 'emeka_baze', universityName: 'Baze University', role: 'listener' },
      { id: 'l5', name: 'Bukky Lawal', username: 'bukky_run', universityName: "Redeemer's University", role: 'listener' }
    ],
    speakerCount: 3,
    listenerCount: 142
  },
  {
    id: 'room-2',
    title: 'Surviving MAT 211 & Engineering Calculus: Peer Study Cramming Session',
    topic: 'Academics',
    scope: 'everyone',
    location: 'Afe Babalola University (ABUAD), Ado-Ekiti',
    status: 'live',
    startedAt: '12 mins ago',
    allowSpeakerRequests: true,
    isReminderSet: false,
    host: {
      id: 'usr-farida',
      name: 'Farida Usman',
      username: 'farida_abuad',
      universityName: 'Afe Babalola University (ABUAD)',
      universityId: 'abuad',
      verificationTier: 'blue'
    },
    speakers: [
      {
        id: 'usr-farida',
        name: 'Farida Usman',
        username: 'farida_abuad',
        universityName: 'Afe Babalola University',
        isHost: true,
        isSpeaking: true,
        isMuted: false,
        role: 'host'
      },
      {
        id: 'usr-sam-math',
        name: 'Samuel Osei',
        username: 'sam_cu_eng',
        universityName: 'Covenant University',
        isSpeaking: false,
        isMuted: false,
        role: 'speaker'
      }
    ],
    listeners: [
      { id: 'l6', name: 'Tosin Adebayo', username: 'tosin_bells', universityName: 'Bells University', role: 'listener' },
      { id: 'l7', name: 'Adaeze Obi', username: 'ada_babcock', universityName: 'Babcock University', role: 'listener' }
    ],
    speakerCount: 2,
    listenerCount: 88
  },
  {
    id: 'room-3',
    title: 'PAU SoundStage: Campus Indie Musicians, Producers & Beats Showcase',
    topic: 'Music',
    scope: 'everyone',
    location: 'Pan-Atlantic University (PAU), Ibeju-Lekki',
    status: 'live',
    startedAt: '50 mins ago',
    allowSpeakerRequests: false,
    isReminderSet: false,
    host: {
      id: 'usr-korede',
      name: 'Korede Phillips',
      username: 'korede_pau',
      universityName: 'Pan-Atlantic University',
      universityId: 'pau',
      verificationTier: 'blue'
    },
    speakers: [
      {
        id: 'usr-korede',
        name: 'Korede Phillips',
        username: 'korede_pau',
        universityName: 'Pan-Atlantic University',
        isHost: true,
        isSpeaking: true,
        isMuted: false,
        role: 'host'
      }
    ],
    listeners: [
      { id: 'l8', name: 'Miracle John', username: 'mimi_aun', universityName: 'American University of Nigeria', role: 'listener' },
      { id: 'l9', name: 'Ibrahim Bello', username: 'ib_nile', universityName: 'Nile University', role: 'listener' }
    ],
    speakerCount: 1,
    listenerCount: 215
  },
  {
    id: 'room-4',
    title: 'Landing Global Tech Remote Internships as an African Undergrad in 2026',
    topic: 'Career',
    scope: 'everyone',
    location: 'Baze University, Abuja (Jabi District)',
    status: 'upcoming',
    scheduledFor: 'Today, 8:00 PM',
    allowSpeakerRequests: true,
    isReminderSet: false,
    host: {
      id: 'usr-hassan',
      name: 'Hassan Bello',
      username: 'hassan_baze',
      universityName: 'Baze University',
      universityId: 'baze',
      verificationTier: 'blue'
    },
    speakers: [
      {
        id: 'usr-hassan',
        name: 'Hassan Bello',
        username: 'hassan_baze',
        universityName: 'Baze University',
        isHost: true,
        isSpeaking: false,
        isMuted: true,
        role: 'host'
      }
    ],
    listeners: [],
    speakerCount: 1,
    listenerCount: 410
  },
  {
    id: 'room-5',
    title: 'Univyx Private Varsity FIFA & Valorant Collegiate Showdown Draft',
    topic: 'Gaming',
    scope: 'everyone',
    location: 'Nile University of Nigeria, Abuja (Jabi Campus)',
    status: 'upcoming',
    scheduledFor: 'Tomorrow, 6:00 PM',
    allowSpeakerRequests: true,
    isReminderSet: true,
    host: {
      id: 'usr-esports',
      name: 'Nile Esports Guild',
      username: 'nile_esports',
      universityName: 'Nile University',
      universityId: 'nile',
      verificationTier: 'gold'
    },
    speakers: [
      {
        id: 'usr-esports',
        name: 'Nile Esports Guild',
        username: 'nile_esports',
        universityName: 'Nile University',
        isHost: true,
        isSpeaking: false,
        isMuted: true,
        role: 'host'
      }
    ],
    listeners: [],
    speakerCount: 1,
    listenerCount: 184
  },
  {
    id: 'room-6',
    title: 'Bowen Hall Week Gala & Cultural Night: Lineup & VIP Ticket Giveaway',
    topic: 'Events',
    scope: 'my_university',
    location: 'Bowen University, Iwo (Main Campus)',
    status: 'upcoming',
    scheduledFor: 'Friday, 7:30 PM',
    allowSpeakerRequests: true,
    isReminderSet: false,
    host: {
      id: 'usr-funke',
      name: 'Funke Oladipo',
      username: 'funke_bowen',
      universityName: 'Bowen University',
      universityId: 'bowen',
      verificationTier: 'blue'
    },
    speakers: [
      {
        id: 'usr-funke',
        name: 'Funke Oladipo',
        username: 'funke_bowen',
        universityName: 'Bowen University',
        isHost: true,
        isSpeaking: false,
        isMuted: true,
        role: 'host'
      }
    ],
    listeners: [],
    speakerCount: 1,
    listenerCount: 95
  }
];
