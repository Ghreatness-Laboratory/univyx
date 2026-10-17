import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Conversation, ConversationParticipant, DirectMessage } from '../data/messages';
import {
  Search,
  PenSquare,
  ArrowLeft,
  Send,
  Trash2,
  Check,
  CheckCheck,
  Building2,
  User,
  Sparkles,
  X,
  Plus,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const {
    currentUser,
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    deleteMessage,
    startConversation,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatSearch, setNewChatSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [deleteMenuMsgId, setDeleteMenuMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select first conversation on desktop if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId, setActiveConversationId]);

  // Scroll to bottom when messages change or conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId, isTyping]);

  // Current active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const currentMessages: DirectMessage[] = activeConversationId
    ? messages[activeConversationId] || []
    : [];

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.participant.fullName.toLowerCase().includes(q) ||
      c.participant.username.toLowerCase().includes(q) ||
      c.participant.universityName.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  // Candidate students for new message sheet (Strictly private university students)
  const candidateStudents: ConversationParticipant[] = [
    {
      id: 'usr-chidi',
      fullName: 'You',
      username: currentUser?.username || 'scholar',
      universityName: currentUser?.universityName || currentUser?.university_name || 'Covenant University',
      universityId: currentUser?.universityId || currentUser?.university_id || 'covenant',
      verificationTier: 'blue',
      bio: 'Personal space for lecture notes, exam reminders, and SIWES drafts.',
      academicLevel: currentUser?.academicLevel || '400L',
      isSelf: true
    },
    {
      id: 'usr-korede',
      fullName: 'Korede Balogun',
      username: 'korede_babcock',
      universityName: 'Babcock University',
      universityId: 'babcock',
      verificationTier: 'blue',
      bio: 'Music & Arts scholar · Tech & creative director at Babcock.',
      academicLevel: '300L'
    },
    {
      id: 'usr-zainab',
      fullName: 'Zainab Al-Hassan',
      username: 'zainab_nile',
      universityName: 'Nile University of Nigeria',
      universityId: 'nile',
      verificationTier: 'blue',
      bio: 'Cybersecurity team captain · Inter-collegiate arena competitor.',
      academicLevel: '400L'
    },
    {
      id: 'usr-tobi',
      fullName: 'Tobi Adebayo',
      username: 'tobi_adebayo',
      universityName: 'Babcock University',
      universityId: 'babcock',
      verificationTier: 'none',
      bio: '300L Pre-med scholar · Studying biochemistry & campus health.',
      academicLevel: '300L'
    },
    {
      id: 'usr-damola',
      fullName: 'Damola Adeleke',
      username: 'damola_abuad',
      universityName: 'Afe Babalola University (ABUAD)',
      universityId: 'abuad',
      verificationTier: 'gold',
      bio: 'Biomedical Engineering & Tech Lead at ABUAD Robotics Lab.',
      academicLevel: '500L'
    },
    {
      id: 'usr-somto',
      fullName: 'Somtochukwu Eze',
      username: 'somto_pau',
      universityName: 'Pan-Atlantic University',
      universityId: 'pau',
      verificationTier: 'blue',
      bio: 'Media & Communications researcher · Campus podcast host.',
      academicLevel: '300L'
    },
    {
      id: 'usr-amaka',
      fullName: 'Amaka Okonkwo',
      username: 'amaka_bowen',
      universityName: 'Bowen University',
      universityId: 'bowen',
      verificationTier: 'none',
      bio: 'Computer Science sophomore · Tech blogger & campus events coordinator.',
      academicLevel: '200L'
    }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    const textToSend = inputText.trim();
    setInputText('');
    sendMessage(activeConversationId, textToSend);

    // Simulate typing and reply for mock students (not for self-chat)
    if (activeConversation && !activeConversation.isSelf) {
      setTimeout(() => {
        setIsTyping(true);
      }, 900);

      setTimeout(() => {
        setIsTyping(false);
        const replyCandidates = [
          'Got it! That sounds super clear.',
          'Noted! Let us connect on this right after lectures.',
          'Awesome, thanks for the academic update bro!',
          'Perfect! I will review the slides and notes shortly.',
          'Great point. Will share this with our varsity study circle too.'
        ];
        const randomReply = replyCandidates[Math.floor(Math.random() * replyCandidates.length)];
        sendMessage(activeConversationId, randomReply);
      }, 2600);
    }
  };

  const handleSelectNewStudent = (student: ConversationParticipant) => {
    setShowNewChatModal(false);
    startConversation(student);
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col md:flex-row bg-white dark:bg-[#000000] text-[#0F1419] dark:text-[#E7E9EA] overflow-hidden">
      {/* ======================================================== */}
      {/* COLUMN 1: CONVERSATION LIST */}
      {/* On mobile: visible when no active conversation or on list mode */}
      {/* On desktop: always visible as left column */}
      {/* ======================================================== */}
      <div
        className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000] shrink-0 h-full ${
          activeConversationId ? 'hidden md:flex' : 'flex'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-extrabold tracking-tight">Messages</h1>
            <p className="text-[12px] text-[#536471] dark:text-[#71767B]">
              Direct text chats with private varsity scholars
            </p>
          </div>
          <button
            onClick={() => setShowNewChatModal(true)}
            title="New message"
            className="p-2 rounded-full bg-slate-100 dark:bg-[#16181C] hover:bg-[#1D9BF0]/10 hover:text-[#1D9BF0] transition-colors cursor-pointer"
          >
            <PenSquare className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-[#EFF3F4] dark:border-[#2F3336]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-100 dark:bg-[#16181C] text-xs text-[#0F1419] dark:text-[#E7E9EA] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1D9BF0]"
            />
          </div>
        </div>

        {/* Conversation List Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-[#EFF3F4] dark:divide-[#2F3336]">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No conversations found. Tap the pen icon above to start a chat with a verified student!
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConversationId;
              const isSelf = conv.isSelf;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-100/80 dark:bg-[#16181C]'
                      : 'hover:bg-slate-50 dark:hover:bg-[#111316]'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-11 h-11 rounded-full font-bold text-xs flex items-center justify-center text-white shadow-xs ${
                        isSelf
                          ? 'bg-gradient-to-tr from-sky-500 to-blue-600'
                          : 'bg-gradient-to-tr from-purple-600 to-[#1D9BF0]'
                      }`}
                    >
                      {isSelf ? 'You' : conv.participant.fullName.charAt(0)}
                    </div>
                    {isSelf && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1D9BF0] border-2 border-white dark:border-black flex items-center justify-center text-[8px] text-white font-bold">
                        ★
                      </span>
                    )}
                  </div>

                  {/* Info & Last Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-[14px] truncate">
                          {isSelf ? 'You (Saved Notes)' : conv.participant.fullName}
                        </span>
                        {!isSelf && <VerifiedBadge tier={conv.participant.verificationTier} size="xs" />}
                      </div>
                      <span className="text-[11px] text-[#536471] dark:text-[#71767B] shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] text-[#536471] dark:text-[#71767B] truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#1D9BF0] shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* COLUMN 2: ACTIVE CHAT SCREEN */}
      {/* On mobile: visible when an active conversation is selected */}
      {/* On desktop: always visible as right column */}
      {/* ======================================================== */}
      <div
        className={`flex-1 flex flex-col h-full bg-white dark:bg-[#000000] ${
          activeConversationId ? 'flex' : 'hidden md:flex'
        }`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-3.5 px-4 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between bg-white/95 dark:bg-[#000000]/95 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3 min-w-0">
                {/* Back button on mobile */}
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                      activeConversation.isSelf
                        ? 'bg-gradient-to-tr from-sky-500 to-blue-600'
                        : 'bg-gradient-to-tr from-purple-600 to-[#1D9BF0]'
                    }`}
                  >
                    {activeConversation.isSelf ? 'You' : activeConversation.participant.fullName.charAt(0)}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] truncate">
                      {activeConversation.isSelf ? 'You' : activeConversation.participant.fullName}
                    </span>
                    {!activeConversation.isSelf && (
                      <VerifiedBadge tier={activeConversation.participant.verificationTier} size="xs" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#536471] dark:text-[#71767B]">
                    <span>@{activeConversation.participant.username}</span>
                    <span>·</span>
                    <span className="truncate">{activeConversation.participant.universityName}</span>
                    {activeConversation.participant.academicLevel && (
                      <>
                        <span>·</span>
                        <span>{activeConversation.participant.academicLevel}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {activeConversation.isSelf && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-[#1D9BF0] font-semibold border border-sky-200 dark:border-sky-800">
                  Personal Space
                </span>
              )}
            </div>

            {/* Message Thread Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-slate-50/30 dark:bg-[#000000]">
              {/* If it's a self conversation, show helpful banner */}
              {activeConversation.isSelf && (
                <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 text-center max-w-md mx-auto space-y-1 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D9BF0] block">
                    Your Personal Notepad
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Send messages to yourself for study notes, exam formulas, reminders, drafts, and CIVYN internship links to revisit.
                  </p>
                </div>
              )}

              {currentMessages.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-400 space-y-1">
                  <p className="font-medium text-slate-500 dark:text-slate-400">No messages in this chat yet.</p>
                  <p className="text-[11px]">Type below to begin this collegiate conversation.</p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isSentByMe = msg.senderId === currentUser?.id || msg.senderUsername === currentUser?.username || activeConversation.isSelf;
                  const isDeleting = deleteMenuMsgId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col group ${isSentByMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 max-w-[85%] sm:max-w-[70%]">
                        {/* Hover actions for sent messages (delete) */}
                        {isSentByMe && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                            <button
                              onClick={() => {
                                deleteMessage(activeConversation.id, msg.id);
                              }}
                              title="Delete message"
                              className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed break-words shadow-2xs ${
                            isSentByMe
                              ? 'bg-[#1D9BF0] text-white rounded-br-xs'
                              : 'bg-slate-100 dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-bl-xs border border-slate-200/60 dark:border-slate-800'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      </div>

                      {/* Timestamp & Status */}
                      <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-[#536471] dark:text-[#71767B]">
                        <span>{msg.createdAt}</span>
                        {isSentByMe && (
                          <span className="flex items-center">
                            {msg.status === 'seen' ? (
                              <CheckCheck className="w-3 h-3 text-[#1D9BF0]" />
                            ) : (
                              <Check className="w-3 h-3 text-slate-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {/* Simulated typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-2 pt-1">
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#16181C] px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D9BF0] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D9BF0] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D9BF0] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-slate-400 italic">
                    {activeConversation.participant.fullName} is typing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar (Text Only) */}
            <div className="p-3 sm:p-4 border-t border-[#EFF3F4] dark:border-[#2F3336] bg-white dark:bg-[#000000]">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    activeConversation.isSelf
                      ? 'Write a note or reminder to yourself...'
                      : 'Start a message...'
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-[#16181C] text-sm text-[#0F1419] dark:text-[#E7E9EA] placeholder-slate-400 border border-transparent focus:border-[#1D9BF0] focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-full bg-[#1D9BF0] text-white hover:bg-[#1A8CD8] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-slate-400 text-center mt-1.5">
                Text-only collegiate messaging · Private university network
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#16181C] flex items-center justify-center text-slate-400">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Select a message
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Choose from your existing conversations, open your notes space, or start a new chat with a scholar.
              </p>
            </div>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="px-4 py-2 rounded-full bg-[#1D9BF0] text-white text-xs font-bold hover:bg-[#1A8CD8] transition-colors cursor-pointer"
            >
              Start New Conversation
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* NEW MESSAGE MODAL / SHEET */}
      {/* ======================================================== */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#16181C] text-[#0F1419] dark:text-[#E7E9EA] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-[#EFF3F4] dark:border-[#2F3336] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">New Message</h3>
                <p className="text-xs text-slate-500">
                  Search verified scholars from private varsities
                </p>
              </div>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-[#EFF3F4] dark:border-[#2F3336]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, @username, or varsity..."
                  value={newChatSearch}
                  onChange={(e) => setNewChatSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-[#0A0A0A] text-xs text-[#0F1419] dark:text-[#E7E9EA] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1D9BF0]"
                  autoFocus
                />
              </div>
            </div>

            {/* List of Scholars */}
            <div className="flex-1 overflow-y-auto p-2 divide-y divide-[#EFF3F4] dark:divide-[#2F3336] no-scrollbar">
              {candidateStudents
                .filter((s) => {
                  const q = newChatSearch.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    s.fullName.toLowerCase().includes(q) ||
                    s.username.toLowerCase().includes(q) ||
                    s.universityName.toLowerCase().includes(q)
                  );
                })
                .map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleSelectNewStudent(student)}
                    className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#111316] rounded-2xl cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center text-white shrink-0 ${
                          student.isSelf
                            ? 'bg-gradient-to-tr from-sky-500 to-blue-600'
                            : 'bg-gradient-to-tr from-purple-600 to-[#1D9BF0]'
                        }`}
                      >
                        {student.isSelf ? 'You' : student.fullName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm truncate">
                            {student.fullName}
                          </span>
                          {!student.isSelf && <VerifiedBadge tier={student.verificationTier} size="xs" />}
                          {student.isSelf && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-900/50 text-[#1D9BF0] font-semibold">
                              Notes
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          @{student.username} · {student.universityName} {student.academicLevel ? `· ${student.academicLevel}` : ''}
                        </p>
                      </div>
                    </div>

                    <button className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[12px] font-bold text-[#1D9BF0] hover:bg-[#1D9BF0] hover:text-white transition-colors cursor-pointer shrink-0">
                      Message
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
