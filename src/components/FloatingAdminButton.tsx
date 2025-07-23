import React from 'react';
import { User } from 'lucide-react';

interface FloatingAdminButtonProps {
  onClick: () => void;
}

const FloatingAdminButton: React.FC<FloatingAdminButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 border-2 border-white/20"
      title="Espace Administrateur"
    >
      <User className="w-6 h-6" />
    </button>
  );
};

export default FloatingAdminButton;