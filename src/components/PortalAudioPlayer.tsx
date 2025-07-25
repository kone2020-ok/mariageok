import React, { useRef, useEffect, useState } from 'react';

interface PortalAudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PortalAudioPlayer: React.FC<PortalAudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  // Chemins vers les fichiers audio (mêmes que l'autre composant)
  const audioTracks = [
    '/assets/audio (1).mp3',
    '/assets/audio (2).mp3'
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configuration de l'audio
    audio.volume = 0.5;
    audio.preload = 'auto';
    audio.loop = false;
    audio.crossOrigin = 'anonymous';

    // Gestionnaires d'événements
    const handleCanPlay = () => {
      console.log('Portal audio ready');
      setIsReady(true);
    };

    const handleEnded = () => {
      console.log('Portal audio ended, switching track');
      // Passer au track suivant
      const nextTrack = (currentTrack + 1) % audioTracks.length;
      setCurrentTrack(nextTrack);
      // Le changement de track sera géré par l'useEffect correspondant
    };

    const handleError = (e: any) => {
      console.error('Portal audio error:', e);
    };

    const handleLoadStart = () => {
      console.log('Portal audio loading started');
    };

    // Ajouter les event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Charger le premier track
    audio.src = audioTracks[currentTrack];
    audio.load();

    // Cleanup
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [currentTrack, audioTracks, isPlaying]);

  // Gérer la lecture/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) {
      console.log('Portal audio not ready yet, skipping play state change');
      return;
    }

    console.log('Portal audio play state changed:', isPlaying);

    if (isPlaying) {
      // S'assurer que l'audio est prêt avant de jouer
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA ou plus
        console.log('Portal audio ready to play');
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Portal audio started successfully');
            })
            .catch((error) => {
              console.error('Portal audio play error:', error);
              // Essayer avec le son coupé d'abord
              if (error.name === 'NotAllowedError') {
                audio.muted = true;
                audio.play().then(() => {
                  setTimeout(() => {
                    audio.muted = false;
                  }, 1000);
                }).catch(console.error);
              } else if (error.name === 'AbortError') {
                // Réessayer après un court délai
                console.log('Retrying play after AbortError');
                setTimeout(() => {
                  if (isPlaying && audio.readyState >= 2) {
                    audio.play().catch(console.error);
                  }
                }, 100);
              }
            });
        }
      } else {
        console.log('Portal audio not ready, waiting for canplay event');
        // Attendre que l'audio soit prêt
        const handleCanPlayForPlay = () => {
          if (isPlaying) {
            audio.play().catch(console.error);
          }
          audio.removeEventListener('canplay', handleCanPlayForPlay);
        };
        audio.addEventListener('canplay', handleCanPlayForPlay);
      }
    } else {
      // Arrêter l'audio
      console.log('Portal audio stopping');
      try {
        audio.pause();
        audio.currentTime = 0;
        console.log('Portal audio stopped successfully');
      } catch (error) {
        console.error('Error stopping portal audio:', error);
      }
    }
  }, [isPlaying, isReady]);

  // Changer de track quand currentTrack change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log('Portal audio changing track to:', currentTrack);
    audio.src = audioTracks[currentTrack];
    audio.load();

    // Attendre que le nouveau track soit prêt avant de jouer
    if (isPlaying) {
      const handleLoadedForTrackChange = () => {
        console.log('Portal audio new track loaded, starting playback');
        if (isPlaying) {
          audio.play().catch(console.error);
        }
        audio.removeEventListener('canplay', handleLoadedForTrackChange);
      };
      audio.addEventListener('canplay', handleLoadedForTrackChange);
    }
  }, [currentTrack, audioTracks, isPlaying]);

  return (
    <div style={{ display: 'none' }}>
      <audio
        ref={audioRef}
        preload="auto"
      />
    </div>
  );
};

export default PortalAudioPlayer;
