// src/components/Messages.jsx
import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../api';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id, e) => {
    // prevent opening modal when clicking delete
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id);
        toast.success("Message deleted!");
        fetchMessages();
      } catch (error) {
        toast.error("Failed to delete message.");
      }
    }
  };

  const openModal = (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.length > 0 ? messages.map(msg => {
          // Fallbacks for phone and country code to handle different backend keys
          const cc = msg.countryCode ?? msg.country_code ?? msg.cc ?? '';
          const ph = msg.phone ?? msg.phoneNumber ?? msg.mobile ?? msg.contactNumber ?? '';
          return (
            <div
              key={msg._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition"
              onClick={() => openModal(msg)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {msg.name} <span className="text-sm font-normal text-slate-500">&lt;{msg.email}&gt;</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                  {/* Phone line added with graceful fallbacks */}
                  <p className="text-sm text-slate-600 mt-2">
                    {cc ? `${cc} ` : ''}{ph || '-'}
                  </p>
                  <p className="mt-3 text-slate-600 line-clamp-2">{msg.message}</p>
                </div>
                <button
                  onClick={(e) => handleDelete(msg._id, e)}
                  className="text-slate-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50"
                  aria-label="Delete message"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="bg-white p-6 text-center rounded-lg shadow-sm border border-slate-200">
            <p className="text-slate-500">No messages yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Message from {selectedMessage.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-800 rounded-md p-2 hover:bg-slate-100"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
                  <p className="mt-1 text-slate-800">{selectedMessage.name || '-'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                  <p className="mt-1 text-slate-800 break-all">{selectedMessage.email || '-'}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
                  <p className="mt-1 text-slate-800">
                    {(() => {
                      const cc = selectedMessage.countryCode ?? selectedMessage.country_code ?? selectedMessage.cc ?? '';
                      const ph = selectedMessage.phone ?? selectedMessage.phoneNumber ?? selectedMessage.mobile ?? selectedMessage.contactNumber ?? '';
                      return `${cc ? cc + ' ' : ''}${ph || '-'}`;
                    })()}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Subject</p>
                  <p className="mt-1 text-slate-800">{selectedMessage.subject || '—'}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">Message</p>
                <div className="mt-2 rounded-lg border border-slate-200 bg-white p-4 text-slate-800 whitespace-pre-wrap">
                  {selectedMessage.message || '—'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
