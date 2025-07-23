import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import YouTubeAudio from './components/YouTubeAudio';
import Portal from './components/Portal';
import AdminLogin from './components/AdminLogin';
import FloatingAdminButton from './components/FloatingAdminButton';
import ConfirmationPortal from './components/ConfirmationPortal';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';
import GiftList from './components/GiftList';
import RSVP from './components/RSVP';
import PracticalInfo from './components/PracticalInfo';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Navigation from './components/Navigation';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showPortal, setShowPortal] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [confirmationMode, setConfirmationMode] = useState<string | null>(null);

  useEffect(() => {
    // Load saved state from localStorage
    const savedSection = localStorage.getItem('wedding-current-section');
    const savedPortalState = localStorage.getItem('wedding-portal-shown');
    const savedAdminState = localStorage.getItem('wedding-admin-logged-in');
    
    if (savedSection) {
      setCurrentSection(savedSection);
    }
    if (savedPortalState === 'false') {
      setShowPortal(false);
    }
    if (savedAdminState === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('wedding-current-section', currentSection);
  }, [currentSection]);

  useEffect(() => {
    localStorage.setItem('wedding-portal-shown', showPortal.toString());
  }, [showPortal]);

  useEffect(() => {
    localStorage.setItem('wedding-admin-logged-in', isAdmin.toString());
  }, [isAdmin]);

  const toggleMusic = () => {
    if (audioReady) {
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleEnterSite = () => {
    setShowPortal(false);
    if (audioReady && !isMusicPlaying) {
      setIsMusicPlaying(true);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setCurrentSection('admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentSection('home');
    localStorage.removeItem('wedding-admin-logged-in');
  };

  const handleConfirmGuest = (guestId: string, attending: boolean) => {
    const guests = JSON.parse(localStorage.getItem('wedding-guests') || '[]');
    const updatedGuests = guests.map((guest: any) => {
      if (guest.id === guestId) {
        return {
          ...guest,
          attending,
          status: attending ? 'confirmed' : 'rejected'
        };
      }
      return guest;
    });
    localStorage.setItem('wedding-guests', JSON.stringify(updatedGuests));
    setConfirmationMode(null);
    setCurrentSection('home');
  };

  // Check for confirmation URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const confirmId = urlParams.get('confirm');
    if (confirmId) {
      setConfirmationMode(confirmId);
      setShowPortal(false);
    }
  }, []);

  if (showPortal) {
    return (
      <Portal 
        onEnter={handleEnterSite} 
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
      />
    );
  }

  if (confirmationMode) {
    return (
      <ConfirmationPortal
        guestId={confirmationMode}
        onConfirm={handleConfirmGuest}
        onClose={() => setConfirmationMode(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* YouTube Audio Player */}
      <YouTubeAudio
        videoId="dQw4w9WgXcQ"
        isPlaying={isMusicPlaying}
        onReady={() => setAudioReady(true)}
        onError={() => console.error('YouTube audio failed to load')}
      />

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection}
      />

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        disabled={!audioReady}
        className="fixed top-20 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-600 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 z-40 border border-rose-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title={isMusicPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      {/* Logout Button for Admin */}
      {isAdmin && (
        <button
          onClick={handleLogout}
          className="fixed top-20 left-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        >
          Déconnexion
        </button>
      )}

      {/* Floating Admin Button */}
      {!isAdmin && (
        <FloatingAdminButton onClick={() => setShowAdminLogin(true)} />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {/* Content */}
      <main id="main-content">
        {currentSection === 'home' && <Hero />}
        {currentSection === 'story' && <OurStory />}
        {currentSection === 'gallery' && <Gallery />}
        {currentSection === 'schedule' && <Schedule />}
        {currentSection === 'gifts' && <GiftList />}
        {currentSection === 'rsvp' && <RSVP />}
        {currentSection === 'info' && <PracticalInfo />}
        {currentSection === 'contact' && <Contact />}
        {currentSection === 'admin' && <Admin onLogout={handleLogout} />}
        
        {/* All sections for single page view */}
        {currentSection === 'home' && (
          <>
            <OurStory />
            <Gallery />
            <Schedule />
            <GiftList />
            <RSVP />
            <PracticalInfo />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-100 to-pink-100 py-8 text-center border-t border-rose-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-rose-800 mb-4">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-semibold">Audrey & Stéphane</span>
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <p className="text-rose-600 mb-4">16 août 2025 • Un jour d'amour et de bonheur</p>
          {isAdmin && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Déconnexion Admin
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;