import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Send, User, MessageSquare } from 'lucide-react';

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  message: string;
  attending: boolean | null;
  submittedAt: Date;
  status: 'confirmed' | 'pending' | 'rejected';
}

interface ConfirmationPortalProps {
  guestId: string;
  onConfirm: (guestId: string, attending: boolean) => void;
  onClose: () => void;
}

const ConfirmationPortal: React.FC<ConfirmationPortalProps> = ({ guestId, onConfirm, onClose }) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const guests = JSON.parse(localStorage.getItem('wedding-guests') || '[]');
    const foundGuest = guests.find((g: Guest) => g.id === guestId);
    if (foundGuest) {
      setGuest({
        ...foundGuest,
        submittedAt: new Date(foundGuest.submittedAt)
      });
    }
  }, [guestId]);

  const handleConfirm = async () => {
    if (attending === null) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onConfirm(guestId, attending);
    setIsSubmitting(false);
  };

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invitation non trouvée</h2>
          <p className="text-gray-600">Cette invitation n'existe pas ou a déjà été traitée.</p>
        </div>
      </div>
    );
  }

  if (guest.status !== 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            guest.status === 'confirmed' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {guest.status === 'confirmed' ? 
              <CheckCircle className="w-8 h-8 text-green-600" /> : 
              <XCircle className="w-8 h-8 text-red-600" />
            }
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {guest.status === 'confirmed' ? 'Déjà confirmé' : 'Déjà traité'}
          </h2>
          <p className="text-gray-600">
            Vous avez déjà confirmé votre {guest.status === 'confirmed' ? 'présence' : 'absence'} pour le mariage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-100 overflow-hidden max-w-2xl w-full">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Confirmation de Présence</h2>
          <p className="text-rose-100">Finalisez votre réponse pour le mariage</p>
        </div>

        <div className="p-8">
          <div className="bg-rose-50 rounded-2xl p-6 mb-8 border border-rose-200">
            <h3 className="text-xl font-semibold text-rose-800 mb-4">Vos informations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Nom complet</span>
                <p className="font-semibold text-gray-800">{guest.firstName} {guest.lastName}</p>
              </div>
              {guest.city && (
                <div>
                  <span className="text-sm text-gray-600">Ville</span>
                  <p className="font-semibold text-gray-800">{guest.city}</p>
                </div>
              )}
            </div>
            {guest.message && (
              <div className="mt-4">
                <span className="text-sm text-gray-600">Votre message</span>
                <p className="text-gray-700 italic">"{guest.message}"</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Confirmez-vous votre présence au mariage ?
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <label className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
                attending === true 
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-lg' 
                  : 'border-gray-300 bg-white hover:border-green-300 hover:shadow-md'
              }`}>
                <input
                  type="radio"
                  name="attending"
                  value="true"
                  checked={attending === true}
                  onChange={() => setAttending(true)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <div className="font-bold text-lg">Oui, je serai présent(e)</div>
                  <div className="text-sm mt-2 opacity-75">Je confirme ma participation</div>
                </div>
              </label>
              
              <label className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-200 ${
                attending === false 
                  ? 'border-red-500 bg-red-50 text-red-700 shadow-lg' 
                  : 'border-gray-300 bg-white hover:border-red-300 hover:shadow-md'
              }`}>
                <input
                  type="radio"
                  name="attending"
                  value="false"
                  checked={attending === false}
                  onChange={() => setAttending(false)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-4xl mb-3">❌</div>
                  <div className="font-bold text-lg">Non, je ne pourrai pas</div>
                  <div className="text-sm mt-2 opacity-75">Je ne peux pas participer</div>
                </div>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={attending === null || isSubmitting}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Confirmation...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Confirmer ma réponse
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPortal;