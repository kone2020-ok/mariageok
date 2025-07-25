import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onReady: () => void;
  onError: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onReady, onError }) => {
  const audio1Ref = useRef<HTMLAudioElement>(null);
  const audio2Ref = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<1 | 2>(1);
  const [isReady, setIsReady] = useState(false);

  // Chemins vers les fichiers audio
  const audioTracks = [
    '/assets/audio (1).mp3',
    '/assets/audio (2).mp3'
  ];

  useEffect(() => {
    const audio1 = audio1Ref.current;
    const audio2 = audio2Ref.current;

    if (!audio1 || !audio2) return;

    // Configuration des audios
    audio1.volume = 0.5; // Volume plus doux
    audio2.volume = 0.5;
    audio1.preload = 'auto';
    audio2.preload = 'auto';
    audio1.loop = false;
    audio2.loop = false;

    // Permettre l'autoplay sur les navigateurs modernes
    audio1.muted = false;
    audio2.muted = false;

    // Forcer le chargement immédiat
    audio1.load();
    audio2.load();

    // Gestionnaire pour quand un audio est prêt
    const handleCanPlay = () => {
      if (!isReady) {
        console.log('Audio prêt à être joué');
        setIsReady(true);
        onReady();
      }
    };

    // Gestionnaire pour le chargement des métadonnées (plus rapide que canplay)
    const handleLoadedMetadata = () => {
      if (!isReady) {
        console.log('Métadonnées audio chargées');
        setIsReady(true);
        onReady();
      }
    };

    // Gestionnaire pour quand un audio se termine
    const handleEnded = () => {
      if (isPlaying) {
        // Passer au track suivant
        const nextTrack = currentTrack === 1 ? 2 : 1;
        setCurrentTrack(nextTrack);

        // Jouer le prochain audio avec un petit délai pour éviter les conflits
        setTimeout(() => {
          const nextAudio = nextTrack === 1 ? audio1 : audio2;
          nextAudio.currentTime = 0;
          nextAudio.play().catch((error) => {
            console.error('Erreur lors du changement de piste:', error);
            onError();
          });
        }, 100);
      }
    };

    // Gestionnaire d'erreur
    const handleError = () => {
      console.error('Erreur de lecture audio');
      onError();
    };

    // Ajouter les event listeners
    audio1.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio2.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio1.addEventListener('canplay', handleCanPlay);
    audio2.addEventListener('canplay', handleCanPlay);
    audio1.addEventListener('ended', handleEnded);
    audio2.addEventListener('ended', handleEnded);
    audio1.addEventListener('error', handleError);
    audio2.addEventListener('error', handleError);

    // Cleanup
    return () => {
      audio1.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio2.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio1.removeEventListener('canplay', handleCanPlay);
      audio2.removeEventListener('canplay', handleCanPlay);
      audio1.removeEventListener('ended', handleEnded);
      audio2.removeEventListener('ended', handleEnded);
      audio1.removeEventListener('error', handleError);
      audio2.removeEventListener('error', handleError);
    };
  }, [isReady, onReady, onError, currentTrack, isPlaying]);

  // Gérer la lecture/pause
  useEffect(() => {
    const audio1 = audio1Ref.current;
    const audio2 = audio2Ref.current;

    if (!audio1 || !audio2 || !isReady) return;

    console.log('AudioPlayer: isPlaying changed to', isPlaying);

    const currentAudio = currentTrack === 1 ? audio1 : audio2;
    const otherAudio = currentTrack === 1 ? audio2 : audio1;

    if (isPlaying) {
      // Arrêter l'autre audio et jouer le courant
      otherAudio.pause();

      // Essayer de jouer avec gestion d'erreur améliorée
      const playPromise = currentAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio démarré avec succès');
          })
          .catch((error) => {
            console.error('Erreur lors de la lecture:', error);
            // Si l'autoplay est bloqué, on peut essayer de jouer en mode muet d'abord
            if (error.name === 'NotAllowedError') {
              console.log('Autoplay bloqué, tentative en mode muet...');
              currentAudio.muted = true;
              currentAudio.play().then(() => {
                // Puis réactiver le son après un court délai
                setTimeout(() => {
                  currentAudio.muted = false;
                }, 1000);
              }).catch(() => {
                onError();
              });
            } else {
              onError();
            }
          });
      }
    } else {
      // Mettre en pause les deux audios de manière forcée
      console.log('Stopping all audio playback');

      // Arrêter immédiatement tous les audios
      [audio1, audio2].forEach((audio, index) => {
        try {
          if (!audio.paused) {
            console.log(`Pausing audio ${index + 1}`);
            audio.pause();
          }
          audio.currentTime = 0; // Reset position
          audio.muted = false; // S'assurer que le son n'est pas coupé
        } catch (error) {
          console.error(`Error stopping audio ${index + 1}:`, error);
        }
      });
    }
  }, [isPlaying, currentTrack, isReady, onError]);

  return (
    <div style={{ display: 'none' }}>
      <audio
        ref={audio1Ref}
        src={audioTracks[0]}
        preload="auto"
      />
      <audio
        ref={audio2Ref}
        src={audioTracks[1]}
        preload="auto"
      />
    </div>
  );
};

export default AudioPlayer;
