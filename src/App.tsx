import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { User } from 'firebase/auth';
import { AuthService } from './services/authService';
import initializeFirebase from './utils/initializeFirebase';
import AudioPlayer from './components/AudioPlayer';
import Portal from './components/Portal';
import AdminLoginNew from './components/AdminLoginNew';
import FloatingAdminButton from './components/FloatingAdminButton';
import FloatingCountdown from './components/FloatingCountdown';
import ConfirmationPortal from './components/ConfirmationPortal';
import ConfirmationReturn from './components/ConfirmationReturn';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
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
  const [currentSection, setCurrentSection] = useState(() => {
    // Restaurer la section depuis localStorage au démarrage
    const savedSection = localStorage.getItem('currentSection');
    return savedSection || 'home';
  });
  const [showPortal, setShowPortal] = useState(() => {
    // Ne pas montrer le portail si on revient sur une section spécifique
    const savedSection = localStorage.getItem('currentSection');
    return !savedSection || savedSection === 'home';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    // Restaurer le statut admin depuis localStorage
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [confirmationMode, setConfirmationMode] = useState<string | null>(null);
  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Sauvegarder la section courante dans localStorage
  useEffect(() => {
    localStorage.setItem('currentSection', currentSection);
  }, [currentSection]);

  // Sauvegarder le statut admin dans localStorage
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  useEffect(() => {
    // Initialize Firebase (create admin account if needed)
    initializeFirebase();

    // Load saved state from localStorage
    const savedSection = localStorage.getItem('wedding-current-section');
    const savedAdminState = localStorage.getItem('wedding-admin-logged-in');
    const sessionPortalShown = sessionStorage.getItem('wedding-portal-shown-session');





    // Check for confirmation token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('confirm');

    if (token) {
      setConfirmationToken(token);
      setShowPortal(false);
      // Remove token from URL without page reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Load admin state first
    if (savedAdminState === 'true') {
      setIsAdmin(true);
    }

    // Load saved section (for ALL sections)
    if (savedSection) {
      setCurrentSection(savedSection);


      // Auto-scroll to top after restoration
      setTimeout(() => {
        scrollToTop(100);
      }, 500);
    }

    // Show portal only once per session, not per page reload
    if (sessionPortalShown === 'true' && !token) {
      setShowPortal(false);
    }
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      const isUserAdmin = AuthService.isAdmin(user);
      setIsAdmin(isUserAdmin);

      if (!user) {
        // User signed out
        setCurrentSection('home');
        localStorage.removeItem('wedding-admin-logged-in');
      } else if (isUserAdmin) {
        // Admin signed in
        localStorage.setItem('wedding-admin-logged-in', 'true');
      }
    });

    return () => unsubscribe();
  }, []);

  // Save state changes to localStorage and synchronize admin state
  useEffect(() => {
    // Always save current section for persistence
    localStorage.setItem('wedding-current-section', currentSection);


    // Synchronize admin state
    if (isAdmin && currentSection === 'admin') {
      localStorage.setItem('wedding-admin-logged-in', 'true');
    } else if (!isAdmin) {
      localStorage.removeItem('wedding-admin-logged-in');
      if (currentSection === 'admin') {
        setCurrentSection('home');
      }
    }
  }, [currentSection, isAdmin]);

  useEffect(() => {
    // Use sessionStorage instead of localStorage for portal state
    sessionStorage.setItem('wedding-portal-shown-session', (!showPortal).toString());
  }, [showPortal]);

  useEffect(() => {
    localStorage.setItem('wedding-admin-logged-in', isAdmin.toString());
  }, [isAdmin]);

  const toggleMusic = () => {
    console.log('Toggle music clicked. Audio ready:', audioReady, 'Currently playing:', isMusicPlaying);
    if (audioReady) {
      const newState = !isMusicPlaying;
      console.log('Forcing music state change to:', newState);

      // Si on arrête la musique, empêcher le redémarrage automatique
      if (!newState) {
        setHasAutoStarted(true); // Marquer comme déjà démarré pour éviter le redémarrage auto
      }

      setIsMusicPlaying(newState);

      // Force immediate state update
      setTimeout(() => {
        console.log('Music state after toggle:', newState);
      }, 100);
    } else {
      console.log('Audio not ready yet - cannot toggle');
    }
  };

  // Démarrer automatiquement la musique seulement une fois après avoir quitté le portail
  const [hasAutoStarted, setHasAutoStarted] = useState(false);

  useEffect(() => {
    if (audioReady && !showPortal && !isMusicPlaying && !hasAutoStarted) {
      // Petite temporisation pour s'assurer que l'interaction utilisateur est prise en compte
      console.log('Auto-starting music after leaving portal (one time only)');
      setTimeout(() => {
        setIsMusicPlaying(true);
        setHasAutoStarted(true); // Marquer comme démarré pour éviter les redémarrages
      }, 500);
    }
  }, [audioReady, showPortal, isMusicPlaying, hasAutoStarted]);

  const handleNavigateToRSVP = () => {
    setCurrentSection('rsvp');
    scrollToTop(300);
  };

  const scrollToElement = (elementId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }, delay);
  };

  const scrollToTop = (delay: number = 100) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, delay);
  };

  const handleEnterSite = async () => {
    console.log('Entering site, stopping portal music');
    setShowPortal(false);
    // Le démarrage automatique sera géré par le useEffect avec hasAutoStarted
  };

  const handleAdminLogin = async (email: string, password: string) => {
    try {
      setAdminError(null);

      // Vérification avec les vrais identifiants
      if (email === 'admin@audrey-stephane.com' && password === 'mariage2025') {
        setIsAdmin(true);
        setShowAdminLogin(false);
        setCurrentSection('admin');
        scrollToElement('admin-space-title', 300);
      } else {
        setAdminError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur de connexion admin:', error);
      setAdminError('Erreur de connexion. Veuillez réessayer.');
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setIsAdmin(false);
      setCurrentUser(null);
      setShowPortal(true);
      setCurrentSection('home');

      // Nettoyer le localStorage
      localStorage.removeItem('wedding-admin-logged-in');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('currentSection');
      sessionStorage.removeItem('wedding-portal-shown-session');

      console.log('Déconnexion réussie et localStorage nettoyé');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
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

  if (confirmationToken) {
    return (
      <ConfirmationReturn
        token={confirmationToken}
        onComplete={() => {
          setConfirmationToken(null);
          setShowPortal(false);
        }}
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
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 via-white to-terracotta-warm-50">
      {/* Audio Player with local MP3 files */}
      <AudioPlayer
        isPlaying={isMusicPlaying}
        onReady={() => setAudioReady(true)}
        onError={() => {}}
      />

      {/* Navigation - Hidden in admin mode */}
      {!(currentSection === 'admin' && isAdmin) && (
        <Navigation
          currentSection={currentSection}
          setCurrentSection={(section) => {
            // Prevent non-admin access to admin section
            if (section === 'admin' && !isAdmin) {

              return;
            }
            setCurrentSection(section);
            // Auto-scroll to top of page
            scrollToTop(200);
          }}
        />
      )}

      {/* Music Control - Hidden in admin mode */}
      {!(currentSection === 'admin' && isAdmin) && (
        <>
          <button
            onClick={toggleMusic}
            disabled={!audioReady}
            className="fixed top-16 sm:top-20 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-terracotta-600 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 z-40 border border-terracotta-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isMusicPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
          >
            <span className="text-sm sm:text-base">{isMusicPlaying ? '🔊' : '🔇'}</span>
          </button>


        </>
      )}





      {/* Floating Admin Button */}
      {!isAdmin && (
        <FloatingAdminButton onClick={() => setShowAdminLogin(true)} />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div id="admin-login-modal" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowAdminLogin(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-lg z-10"
            >
              ✕
            </button>
            <AdminLoginNew
              onLogin={handleAdminLogin}
              error={adminError}
            />
          </div>
        </div>
      )}



      {/* Content */}
      <main id="main-content">
        {(currentSection === 'admin' && isAdmin) ? (
          <Admin onLogout={handleLogout} />
        ) : (
          <>
            {currentSection === 'home' && <Hero onNavigateToRSVP={handleNavigateToRSVP} />}
            {currentSection === 'invitation' && <Invitation />}
            {currentSection === 'story' && <OurStory />}
            {currentSection === 'gallery' && <Gallery />}
            {currentSection === 'schedule' && <Schedule />}
            {currentSection === 'gifts' && <GiftList />}
            {currentSection === 'rsvp' && <RSVP />}
            {currentSection === 'info' && <PracticalInfo />}
            {currentSection === 'contact' && <Contact />}

            {/* All sections for single page view */}
            {currentSection === 'home' && (
              <>
                <Invitation />
                <OurStory />
                <Gallery />
                <Schedule />
                <GiftList />
                <RSVP />
                <PracticalInfo />
                <Contact />
              </>
            )}
          </>
        )}
      </main>

      {/* Floating Countdown Widget */}
      {!(currentSection === 'admin' && isAdmin) && (
        <FloatingCountdown />
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-terracotta-100 to-terracotta-warm-100 py-6 sm:py-8 text-center border-t border-terracotta-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-terracotta-800 mb-4">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span className="font-semibold text-sm sm:text-base">Audrey & Stéphane</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
          <p className="text-terracotta-600 mb-4 text-sm sm:text-base">16 août 2025 • Un jour d'amour et de bonheur</p>

          {/* Logout button in footer - visible for all users who entered the site */}
          {!showPortal && (
            <div className="mt-4 pt-4 border-t border-terracotta-200">
              <button
                onClick={handleLogout}
                className={`${
                  isAdmin
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-terracotta-500 hover:bg-terracotta-600'
                } text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl`}
              >
                {isAdmin ? '🔓 Déconnexion Admin' : '🚪 Sortir du Site'}
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;