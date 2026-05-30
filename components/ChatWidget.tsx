'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from './AuthContext';
import Image from 'next/image';

interface User {
  id: string;
  displayName: string;
  avatarUrl: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  sender: User;
  createdAt: string;
}

interface Conversation {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: { user: User }[];
  messages: Message[];
}

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [friends, setFriends] = useState<User[]>([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchConversations();
    fetchFriends();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);
      const interval = setInterval(() => fetchMessages(activeConversation.id), 5000);
      return () => clearInterval(interval);
    }
  }, [activeConversation]);

  useEffect(() => {
    const handleOpenChat = (e: any) => {
      if (e.detail?.conversation) {
        setActiveConversation(e.detail.conversation);
      }
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/chat/conversations');
      if (res.ok) {
        setConversations(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await fetch('/api/friends');
      if (res.ok) {
        const data = await res.json();
        setFriends(data.friends || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/messages/${id}`);
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeConversation) return;

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeConversation.id, text })
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages(prev => [...prev, msg]);
        setText('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createConversation = async (participantIds: string[], isGroup: boolean, name?: string) => {
    try {
      const res = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantIds, isGroup, name })
      });
      if (res.ok) {
        const conv = await res.json();
        await fetchConversations();
        setActiveConversation(conv);
        setIsCreatingGroup(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getConvName = (conv: Conversation) => {
    if (conv.name) return conv.name;
    const others = (conv.participants || []).filter(p => p.user.id !== user?.id).map(p => p.user.displayName);
    return others.join(', ') || 'Just you';
  };

  const getConvAvatar = (conv: Conversation) => {
    if (conv.isGroup) return null;
    const other = (conv.participants || []).find(p => p.user.id !== user?.id)?.user;
    return other?.avatarUrl;
  };

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '350px', height: '500px', backgroundColor: '#1e1e2d', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', zIndex: 999999, overflow: 'hidden', border: '1px solid #3a3a5a' }}>
      {/* Header */}
      <div style={{ padding: '15px', borderBottom: '1px solid #3a3a5a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2a2a3d' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{activeConversation ? getConvName(activeConversation) : isCreatingGroup ? 'New Group' : 'Messages'}</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {activeConversation ? (
            <button onClick={() => setActiveConversation(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Back</button>
          ) : !isCreatingGroup ? (
            <button onClick={() => setIsCreatingGroup(true)} style={{ background: 'none', border: 'none', color: '#ff3366', cursor: 'pointer' }}>+ Group</button>
          ) : (
            <button onClick={() => setIsCreatingGroup(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>✕</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {activeConversation ? (
          <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map(m => (
              <div key={m.id} style={{ alignSelf: m.senderId === user?.id ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '2px', textAlign: m.senderId === user?.id ? 'right' : 'left' }}>
                  {m.senderId !== user?.id && m.sender.displayName}
                </div>
                <div style={{ padding: '8px 12px', borderRadius: '12px', backgroundColor: m.senderId === user?.id ? '#ff3366' : '#3a3a5a', color: '#fff', wordBreak: 'break-word' }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : isCreatingGroup ? (
          <div style={{ padding: '15px' }}>
            <input type="text" placeholder="Group Name (Optional)" value={groupName} onChange={e => setGroupName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #3a3a5a', backgroundColor: '#151520', color: '#fff', marginBottom: '15px' }} />
            <h4 style={{ color: '#888', marginBottom: '10px' }}>Select Friends</h4>
            {friends.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#fff', cursor: 'pointer' }}>
                <input type="checkbox" checked={selectedFriends.includes(f.id)} onChange={(e) => {
                  if (e.target.checked) setSelectedFriends([...selectedFriends, f.id]);
                  else setSelectedFriends(selectedFriends.filter(id => id !== f.id));
                }} />
                {f.avatarUrl ? <Image src={f.avatarUrl} alt="" width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover' }} unoptimized /> : <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#ff3366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.displayName.charAt(0)}</div>}
                {f.displayName}
              </label>
            ))}
            <button onClick={() => createConversation(selectedFriends, true, groupName)} disabled={selectedFriends.length === 0} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: selectedFriends.length > 0 ? '#ff3366' : '#555', color: '#fff', fontWeight: 'bold', marginTop: '15px', cursor: selectedFriends.length > 0 ? 'pointer' : 'not-allowed' }}>
              Create Group
            </button>
          </div>
        ) : (
          <div>
            {conversations.map(c => (
              <div key={c.id} onClick={() => setActiveConversation(c)} style={{ padding: '15px', borderBottom: '1px solid #3a3a5a', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                {getConvAvatar(c) ? (
                  <Image src={getConvAvatar(c)!} alt="" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} unoptimized />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ff3366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                    {c.isGroup ? 'G' : getConvName(c).charAt(0)}
                  </div>
                )}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getConvName(c)}</div>
                  <div style={{ color: '#888', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.messages[0]?.text || 'No messages yet'}
                  </div>
                </div>
              </div>
            ))}
            {friends.length > 0 && <div style={{ padding: '15px 15px 5px', color: '#888', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}>Friends</div>}
            {friends.map(f => (
              <div key={f.id} onClick={() => createConversation([f.id], false)} style={{ padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                {f.avatarUrl ? <Image src={f.avatarUrl} alt="" width={30} height={30} style={{ borderRadius: '50%', objectFit: 'cover' }} unoptimized /> : <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#555', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.displayName.charAt(0)}</div>}
                <div style={{ color: '#ddd' }}>{f.displayName}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Input */}
      {activeConversation && (
        <form onSubmit={sendMessage} style={{ padding: '10px', borderTop: '1px solid #3a3a5a', display: 'flex', gap: '10px', backgroundColor: '#2a2a3d' }}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #3a3a5a', backgroundColor: '#151520', color: '#fff', outline: 'none' }} />
          <button type="submit" disabled={!text.trim()} style={{ background: text.trim() ? '#ff3366' : '#555', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: text.trim() ? 'pointer' : 'not-allowed' }}>
            ➤
          </button>
        </form>
      )}
    </div>,
    document.body
  );
}
