import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../api';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const Messages = () => {
    const [messages, setMessages] = useState([]);

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

    const handleDelete = async (id) => {
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

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Contact Messages</h1>
            <div className="space-y-4">
                {messages.length > 0 ? messages.map(msg => (
                    <div key={msg._id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-slate-800">{msg.name} <span className="text-sm font-normal text-slate-500">&lt;{msg.email}&gt;</span></h3>
                                <p className="text-xs text-slate-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                                <p className="mt-3 text-slate-600">{msg.message}</p>
                            </div>
                            <button onClick={() => handleDelete(msg._id)} className="text-slate-500 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white p-6 text-center rounded-lg shadow-sm border border-slate-200">
                        <p className="text-slate-500">No messages yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;