import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, Calendar } from 'lucide-react';
import { Guest } from '../types/guest';
import { HybridGuestService } from '../services/hybridGuestService';

interface ConfirmationReturnProps {
  token: string;
  onComplete: () => void;
}

const ConfirmationReturn: React.FC<ConfirmationReturnProps> = ({ token, onComplete }) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGuest = async () => {
      try {
        const foundGuest = await HybridGuestService.findGuestByToken(token);
        if (foundGuest) {
          setGuest(foundGuest);
        } else {
          setError('Lien de confirmation invalide ou expiré.');
        }
      } catch (error) {
        setError('Erreur lors du chargement. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    loadGuest();
  }, [token]);

  const handleConfirmation = async (attending: boolean) => {
    if (!guest) return;

    if (HybridGuestService.isDeadlinePassed()) {
      setError('La date limite de confirmation est dépassée.');
      return;
    }

    setSubmitting(true);

    try {
      const success = await HybridGuestService.updateGuestConfirmation(guest.id, attending);

      if (success) {
        setConfirmed(true);
        setGuest(prev => prev ? { ...prev, attending, status: attending ? 'confirmed' : 'absent' } : null);
      } else {
        setError('Erreur lors de la confirmation. Veuillez réessayer.');
      }
    } catch (error) {
      setError('Erreur lors de la confirmation. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600 mx-auto mb-4"></div>
          <p className="text-terracotta-700">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50 px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-red-200 p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onComplete}
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
          >
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50 px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-green-200 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirmation enregistrée !</h2>
          <p className="text-gray-600 mb-6">
            Merci {guest?.firstName}, votre réponse a été enregistrée avec succès.
          </p>
          <div className="bg-terracotta-50 rounded-2xl p-4 mb-6">
            <p className="text-terracotta-800 font-medium">
              Statut : {guest?.attending ? '✅ Présent(e)' : '❌ Absent(e)'}
            </p>
          </div>
          <button
            onClick={onComplete}
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
          >
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  if (!guest) return null;

  const isDeadlinePassed = HybridGuestService.isDeadlinePassed();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-6 text-white text-center">
          <User className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full p-2" />
          <h2 className="text-2xl font-bold mb-2">Confirmation de présence</h2>
          <p className="text-terracotta-100">Bonjour {guest.firstName} {guest.lastName}</p>
        </div>

        <div className="p-6">
          {isDeadlinePassed ? (
            <div className="text-center">
              <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Délai dépassé</h3>
              <p className="text-gray-600 mb-6">
                La date limite de confirmation était le 31 juillet 2025 à 23h59.
              </p>
              <button
                onClick={onComplete}
                className="bg-gray-500 text-white px-6 py-3 rounded-full font-medium"
              >
                Retour au site
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Calendar className="w-12 h-12 text-terracotta-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Confirmez-vous votre présence ?
              </h3>
              <p className="text-gray-600 mb-6">
                Mariage d'Audrey & Stéphane<br />
                Samedi 16 août 2025
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleConfirmation(true)}
                  disabled={submitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  Oui, je serai présent(e)
                </button>

                <button
                  onClick={() => handleConfirmation(false)}
                  disabled={submitting}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  Non, je ne pourrai pas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationReturn;
