import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin, MessageSquare, Send, Clock, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { Guest, RSVPFormData } from '../types/guest';
import { HybridGuestService } from '../services/hybridGuestService';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: '',
    lastName: '',
    city: '',
    message: '',
    attending: null,
    confirmLater: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const deadline = HybridGuestService.getDeadline();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDeadlinePassed = () => {
    return HybridGuestService.isDeadlinePassed();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDeadlinePassed()) {
      alert('La date limite de confirmation est dépassée.');
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const { guest, token } = await HybridGuestService.addGuest(formData);
      setConfirmationToken(token);
      setSubmitted(true);
    } catch (error: any) {
      alert(error.message || 'Erreur lors de l\'enregistrement. Veuillez réessayer.');
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyConfirmationLink = () => {
    if (confirmationToken && typeof confirmationToken === 'string') {
      try {
        const link = HybridGuestService.generateReturnUrl(confirmationToken);
        navigator.clipboard.writeText(link);
        alert('Lien copié dans le presse-papiers !');
      } catch (error) {
        console.error('Error copying link:', error);
        alert('Erreur lors de la copie du lien');
      }
    }
  };

  // Render success page after submission
  if (submitted) {
    const showReturnLink = formData.confirmLater && confirmationToken && typeof confirmationToken === 'string';

    return (
      <section key="rsvp-success" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 sm:p-8 text-white text-center">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Merci !</h2>
              <p className="text-green-100 text-sm sm:text-base">Votre réponse a été enregistrée avec succès</p>
            </div>
            <div className="p-6 sm:p-8 text-center">
              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Nous avons bien reçu votre {formData.confirmLater ? 'pré-inscription' : 'confirmation'}.
                {formData.confirmLater ?
                  " Vous pouvez revenir confirmer votre présence avant le 31 juillet 2025." :
                  formData.attending ?
                    " Nous avons hâte de célébrer ce moment magique avec vous !" :
                    " Nous comprenons et vous remercions de nous avoir informés."
                }
              </p>

              {showReturnLink && confirmationToken && typeof confirmationToken === 'string' && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-6 mb-6">
                  <h3 className="font-semibold text-amber-800 mb-3">🔗 Lien de confirmation</h3>
                  <p className="text-sm text-amber-700 mb-4">
                    Gardez ce lien pour revenir confirmer votre présence plus tard :
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={copyConfirmationLink}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copier le lien
                    </button>
                    <button
                      onClick={() => window.open(HybridGuestService.generateReturnUrl(confirmationToken), '_blank')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ouvrir le lien
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-terracotta-600">
                <span className="text-lg sm:text-xl">💕</span>
                <span className="font-semibold text-sm sm:text-base">Audrey & Stéphane</span>
                <span className="text-lg sm:text-xl">💕</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section key="rsvp-form" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="rsvp-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            📩 Confirmation de Présence
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700 px-4">Merci de confirmer votre présence avant le 31 juillet 2025</p>
        </div>

        {/* Countdown to deadline */}
        {!isDeadlinePassed() && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl font-semibold text-amber-800">Temps restant pour confirmer</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{timeLeft.days}</div>
                <div className="text-xs text-amber-500 font-medium">Jours</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{timeLeft.hours}</div>
                <div className="text-xs text-amber-500 font-medium">Heures</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{timeLeft.minutes}</div>
                <div className="text-xs text-amber-500 font-medium">Minutes</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{timeLeft.seconds}</div>
                <div className="text-xs text-amber-500 font-medium">Secondes</div>
              </div>
            </div>
          </div>
        )}

        {isDeadlinePassed() ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-2">Date limite dépassée</h3>
            <p className="text-red-700">
              La date limite pour confirmer votre présence était le 31 juillet 2025 à 23h59.
              Pour toute question, veuillez nous contacter directement.
            </p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-terracotta-100 overflow-hidden">
            <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 p-6 sm:p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Votre Réponse</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Prénom & Nom */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                  placeholder="Votre ville de résidence"
                />
              </div>

              {/* Présence */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Confirmation de présence
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.attending === true 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 bg-white hover:border-green-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="true"
                      checked={formData.attending === true}
                      onChange={() => setFormData({...formData, attending: true})}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">✅</div>
                      <div className="font-semibold">Oui, je serai présent(e)</div>
                    </div>
                  </label>
                  <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.attending === false 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-300 bg-white hover:border-red-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="false"
                      checked={formData.attending === false}
                      onChange={() => setFormData({...formData, attending: false})}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">❌</div>
                      <div className="font-semibold">Non, je ne pourrai pas</div>
                    </div>
                  </label>
                  </div>
                  
                  <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 block ${
                    formData.confirmLater 
                      ? 'border-amber-500 bg-amber-50 text-amber-700' 
                      : 'border-gray-300 bg-white hover:border-amber-300'
                  }`}>
                    <input
                      type="checkbox"
                      name="confirmLater"
                      checked={formData.confirmLater}
                      onChange={(e) => setFormData({
                        ...formData, 
                        confirmLater: e.target.checked,
                        attending: e.target.checked ? null : formData.attending
                      })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">⏰</div>
                      <div className="font-semibold">Je confirmerai plus tard</div>
                      <div className="text-sm text-gray-600 mt-1">Avant le 31 juillet 2025</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Un petit mot pour les futurs mariés..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.firstName || !formData.lastName || (!formData.confirmLater && formData.attending === null)}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {formData.confirmLater ? 'M\'inscrire' : 'Confirmer ma présence'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVP;