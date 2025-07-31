import React from 'react';
import { Home, Heart, Calendar, Gift, Users, Camera, Info, Phone, Menu, X, Mail } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentSection, 
  setCurrentSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'invitation', label: 'Invitation', icon: Mail },
    { id: 'story', label: 'Notre Histoire', icon: Heart },
    { id: 'gallery', label: 'Galerie', icon: Camera },
    { id: 'schedule', label: 'Programme', icon: Calendar },
    { id: 'gifts', label: 'Cadeaux', icon: Gift },
    { id: 'rsvp', label: 'Confirmation', icon: Users },
    // { id: 'info', label: 'Infos Pratiques', icon: Info }, // Commenté temporairement
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-terracotta-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta-500 fill-current" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent">
              A & S
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 text-sm hover:scale-105 ${
                    currentSection === item.id
                      ? 'bg-terracotta-100 text-terracotta-700 shadow-sm'
                      : 'text-gray-600 hover:text-terracotta-600 hover:bg-terracotta-50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-terracotta-600 p-2 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-terracotta-100 sticky top-14 sm:top-16 z-40 animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-2 py-2 sm:px-3 sm:py-3 rounded-xl transition-all duration-300 hover:scale-105 animate-fade-in ${
                      currentSection === item.id
                        ? 'bg-terracotta-100 text-terracotta-700 shadow-sm'
                        : 'text-gray-600 hover:text-terracotta-600 hover:bg-terracotta-50'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;