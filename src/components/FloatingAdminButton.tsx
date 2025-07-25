import React from 'react';
import { User } from 'lucide-react';

interface FloatingAdminButtonProps {
  onClick: () => void;
}

const FloatingAdminButton: React.FC<FloatingAdminButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    // Ouvrir le modal d'abord
    onClick();

    // Puis scroll vers le titre du formulaire de connexion après un délai
    setTimeout(() => {
      const loginTitle = document.getElementById('admin-login-title');
      if (loginTitle) {
        // Le modal est ouvert, scroll vers le titre du formulaire
        loginTitle.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      } else {
        // Fallback : remonter en haut si le modal n'est pas encore rendu
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 200);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-terracotta-600 to-terracotta-700 hover:from-terracotta-700 hover:to-terracotta-800 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-[9999] border-2 border-white/20"
      title="Espace Administrateur"
    >
      <User className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};

export default FloatingAdminButton;