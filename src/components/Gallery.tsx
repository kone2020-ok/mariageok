import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, fadeInUpClasses, scaleInClasses } from '../hooks/useScrollAnimation';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const titleAnimation = useScrollAnimation();
  const gridAnimation = useStaggeredAnimation(300);



  // Photos locales - nos souvenirs
  const photos = [
    {
      id: 3,
      url: '/assets/IMAGE (3).JPG',
      thumbnail: '/assets/IMAGE (3).JPG',
      caption: 'Nos fiançailles'
    },
    {
      id: 4,
      url: '/assets/WhatsApp Image 2025-07-23 à 19.38.45_f1d95962.jpg',
      thumbnail: '/assets/WhatsApp Image 2025-07-23 à 19.38.45_f1d95962.jpg',
      caption: 'En voyage ensemble'
    },
    {
      id: 5,
      url: '/assets/IMAGE (5).jpg',
      thumbnail: '/assets/IMAGE (5).jpg',
      caption: 'Un coucher de soleil romantique'
    },
    {
      id: 6,
      url: '/assets/IMAGE (6).jpg',
      thumbnail: '/assets/IMAGE (6).jpg',
      caption: 'Préparatifs du mariage'
    },
    {
      id: 7,
      url: '/assets/IMAGE (7).jpg',
      thumbnail: '/assets/IMAGE (7).jpg',
      caption: 'Nos moments précieux'
    },
    {
      id: 8,
      url: '/assets/WhatsApp Image 2025-07-23 à 19.30.31_f6deea07.jpg',
      thumbnail: '/assets/WhatsApp Image 2025-07-23 à 19.30.31_f6deea07.jpg',
      caption: 'Notre amour éternel'
    }
  ];

  // Dupliquer les photos pour un effet de boucle infinie
  const duplicatedPhotos = [...photos, ...photos];

  const openModal = (index: number) => {
    // Calculer l'index réel dans le tableau original
    const realIndex = index % photos.length;
    setSelectedImage(realIndex);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      {/* Styles CSS pour l'animation de défilement */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .carousel-scroll {
          animation: scroll 20s linear infinite;
        }
        .carousel-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto max-w-6xl">
        <div ref={titleAnimation.ref} className={`text-center mb-12 sm:mb-16 ${fadeInUpClasses(titleAnimation.isVisible)}`}>
          <h2 id="gallery-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            📸 Notre Galerie
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Quelques moments précieux de notre histoire d'amour</p>
        </div>

        {/* Carrousel de photos avec boucle infinie */}
        <div
          ref={gridAnimation.ref}
          className={`relative overflow-hidden max-w-6xl mx-auto ${scaleInClasses(gridAnimation.isVisible)}`}
        >
          <div className="carousel-scroll flex">
            {duplicatedPhotos.map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer mx-2 flex-shrink-0"
                style={{ width: '300px' }}
                onClick={() => openModal(index % photos.length)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-terracotta-50 p-1 sm:p-2">
                  <img
                    src={photo.thumbnail}
                    alt={photo.caption}
                    className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-xs sm:text-sm">{photo.caption}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Indicateurs de progression */}
          <div className="flex justify-center mt-6 space-x-2">
            {photos.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-terracotta-300"
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <img
                src={photos[selectedImage].url}
                alt={photos[selectedImage].caption}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-white font-medium">{photos[selectedImage].caption}</p>
                  <p className="text-white/70 text-sm mt-1">
                    {selectedImage + 1} / {photos.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;