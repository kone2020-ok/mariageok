import React from 'react';
import { Home, Heart, Calendar, Gift, Users, Camera, Info, Phone, Menu, X } from 'lucide-react';

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
    { id: 'story', label: 'Notre Histoire', icon: Heart },
    { id: 'gallery', label: 'Galerie', icon: Camera },
    { id: 'schedule', label: 'Programme', icon: Calendar },
    { id: 'gifts', label: 'Cadeaux', icon: Gift },
    { id: 'rsvp', label: 'Confirmation', icon: Users },
    { id: 'info', label: 'Infos Pratiques', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-rose-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500 fill-current" />
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              A & S
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 text-sm ${
                    currentSection === item.id
                      ? 'bg-rose-100 text-rose-700 shadow-sm'
                      : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-rose-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-rose-100 sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl transition-all duration-300 ${
                      currentSection === item.id
                        ? 'bg-rose-100 text-rose-700 shadow-sm'
                        : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
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