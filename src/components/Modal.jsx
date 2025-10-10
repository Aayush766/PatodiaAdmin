import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, onClose, children }) => {
  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg relative m-4"
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;