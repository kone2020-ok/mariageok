import React, { useState, useEffect } from 'react';
import { Users, Download, Calendar, MessageSquare, CheckCircle, XCircle, MapPin, Clock, AlertTriangle, FileText, RefreshCw } from 'lucide-react';
import { Guest, GuestStats } from '../types/guest';
import { HybridGuestService } from '../services/hybridGuestService';

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState<GuestStats>({ total: 0, confirmed: 0, pending: 0, absent: 0, expired: 0 });
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'absent' | 'expired'>('all');
  const [firestoreStatus, setFirestoreStatus] = useState<string>('unknown');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const testFirestore = async () => {
    setFirestoreStatus('testing');
    try {
      // Force test Firestore connection
      const isAvailable = await HybridGuestService.testFirestore();
      setFirestoreStatus(isAvailable ? 'connected' : 'failed');

      if (isAvailable) {
        alert('✅ Firestore connecté ! Les nouvelles données seront sauvées dans Firestore.');
      } else {
        alert('❌ Firestore non disponible. Vérifiez la configuration Firebase Console.');
      }
    } catch (error) {
      setFirestoreStatus('error');
      alert('❌ Erreur lors du test Firestore: ' + error);
    }
  };

  const loadGuests = async () => {
    setIsLoading(true);
    try {
      console.log('Loading guests in Admin component...');

      // Update expired guests first
      await HybridGuestService.updateExpiredGuests();

      // Load guests with current status
      const currentGuests = await HybridGuestService.getGuestsWithCurrentStatus();
      console.log('Guests loaded:', currentGuests.length);
      setGuests(currentGuests);

      // Calculate stats
      const currentStats = await HybridGuestService.getGuestStats();
      console.log('Stats calculated:', currentStats);
      setStats(currentStats);

      console.log('Admin data loading completed successfully');
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading admin data:', error);
      // En cas d'erreur, essayer de charger depuis localStorage
      try {
        const fallbackGuests = await HybridGuestService.getGuestsWithCurrentStatus();
        const fallbackStats = await HybridGuestService.getGuestStats();
        setGuests(fallbackGuests);
        setStats(fallbackStats);
        console.log('Fallback data loaded successfully');
      } catch (fallbackError) {
        console.error('Fallback loading also failed:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
    // Refresh every 60 seconds (réduit de 30s pour éviter les conflits)
    const interval = setInterval(loadGuests, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredGuests = guests.filter(guest => {
    if (filter === 'confirmed') return guest.status === 'confirmed';
    if (filter === 'pending') return guest.status === 'pending';
    if (filter === 'absent') return guest.status === 'absent';
    if (filter === 'expired') return guest.status === 'expired';
    return true;
  });

  const getStatusLabel = (status: Guest['status']) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'absent': return 'Absent';
      case 'expired': return 'Expiré';
      default: return 'Inconnu';
    }
  };

  const exportToCSV = () => {
    const headers = ['Prénom', 'Nom', 'Ville', 'Statut', 'Présence', 'Message', 'Date de soumission', 'Dernière mise à jour'];
    const csvContent = [
      headers.join(','),
      ...filteredGuests.map(guest => [
        guest.firstName,
        guest.lastName,
        guest.city,
        getStatusLabel(guest.status),
        guest.attending === true ? 'Oui' : guest.attending === false ? 'Non' : 'Non défini',
        `"${guest.message.replace(/"/g, '""')}"`,
        guest.submittedAt.toLocaleDateString('fr-FR'),
        guest.lastUpdated ? guest.lastUpdated.toLocaleDateString('fr-FR') : 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invites-mariage-audrey-stephane-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = async () => {
    try {
      console.log('Début de l\'export PDF...');

      // Import dynamique pour éviter les problèmes de SSR
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;

      console.log('Bibliothèques PDF chargées');

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      console.log('Document PDF créé');

      // Couleurs
      const terracottaColor = [180, 100, 80];
      const darkGray = [60, 60, 60];
      const lightGray = [240, 240, 240];

      // En-tête avec style élégant
      doc.setFillColor(180, 100, 80);
      doc.rect(0, 0, pageWidth, 35, 'F');

      // Titre principal
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Mariage Audrey & Stephane', pageWidth / 2, 15, { align: 'center' });

      // Sous-titre
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('16 août 2025 - Liste des Invités', pageWidth / 2, 25, { align: 'center' });

      // Informations générales
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');

      const currentDate = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      doc.text(`Rapport généré le ${currentDate}`, 20, 50);
      doc.text(`Filtre appliqué: ${filter === 'all' ? 'Tous les invités' : filter}`, 20, 60);

      // Statistiques
      doc.setFillColor(240, 240, 240);
      doc.rect(15, 70, pageWidth - 30, 25, 'F');

      doc.setFont('helvetica', 'bold');
      doc.text('Statistiques:', 20, 82);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total: ${stats.total} | Confirmés: ${stats.confirmed} | En attente: ${stats.pending} | Absents: ${stats.absent} | Expirés: ${stats.expired}`, 20, 90);

      // Préparation des données pour le tableau
      const tableData = filteredGuests.map(guest => [
        `${guest.firstName} ${guest.lastName}`,
        guest.city || '-',
        guest.status === 'confirmed' ? 'Confirmé' :
        guest.status === 'pending' ? 'En attente' :
        guest.status === 'absent' ? 'Absent' : 'Expiré',
        guest.message ? (guest.message.length > 40 ? guest.message.substring(0, 40) + '...' : guest.message) : '-',
        guest.submittedAt.toLocaleDateString('fr-FR')
      ]);

      console.log('Données du tableau préparées:', tableData.length, 'lignes');

      // Vérifier si autoTable est disponible
      if (typeof autoTable === 'function') {
        console.log('Utilisation d\'autoTable');
        // Configuration du tableau
        autoTable(doc, {
        head: [['Nom complet', 'Ville', 'Statut', 'Message', 'Date']],
        body: tableData,
        startY: 105,
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [180, 100, 80],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
        },
        alternateRowStyles: {
          fillColor: [250, 250, 250],
        },
        columnStyles: {
          0: { cellWidth: 45 }, // Nom
          1: { cellWidth: 30 }, // Ville
          2: { cellWidth: 25 }, // Statut
          3: { cellWidth: 50 }, // Message
          4: { cellWidth: 25 }, // Date
        },
        margin: { left: 15, right: 15 },
        didDrawPage: function (data: any) {
          // Pied de page avec informations des fiancés
          const pageCount = doc.getNumberOfPages();
          const currentPage = doc.getCurrentPageInfo().pageNumber;

          // Ligne de séparation
          doc.setDrawColor(180, 100, 80);
          doc.setLineWidth(0.5);
          doc.line(15, pageHeight - 25, pageWidth - 15, pageHeight - 25);

          // Informations des fiancés
          doc.setTextColor(60, 60, 60);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');

          // Colonne gauche - Audrey
          doc.setFont('helvetica', 'bold');
          doc.text('Audrey', 20, pageHeight - 18);
          doc.setFont('helvetica', 'normal');
          doc.text('Email: audrey.stephane.mariage@gmail.com', 20, pageHeight - 13);
          doc.text('Téléphone: +225 07 87 03 68 311', 20, pageHeight - 8);

          // Colonne droite - Stéphane
          doc.setFont('helvetica', 'bold');
          doc.text('Stéphane', pageWidth / 2 + 10, pageHeight - 18);
          doc.setFont('helvetica', 'normal');
          doc.text('Email: audrey.stephane.mariage@gmail.com', pageWidth / 2 + 10, pageHeight - 13);
          doc.text('Téléphone: +225 05 05 45 45 45', pageWidth / 2 + 10, pageHeight - 8);

          // Numéro de page
          doc.setTextColor(180, 100, 80);
          doc.setFont('helvetica', 'bold');
          doc.text(`Page ${currentPage} sur ${pageCount}`, pageWidth - 30, pageHeight - 8);

          // Lieu et date du mariage
          doc.setTextColor(60, 60, 60);
          doc.setFont('helvetica', 'italic');
          doc.text('Bingerville, Côte d\'Ivoire', pageWidth / 2, pageHeight - 3, { align: 'center' });
        }
      });

      console.log('Tableau ajouté au PDF');

      } else {
        console.log('autoTable non disponible, création d\'un PDF simple');

        // Version simple sans tableau
        let yPosition = 110;

        // En-têtes
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Nom complet', 20, yPosition);
        doc.text('Ville', 80, yPosition);
        doc.text('Statut', 120, yPosition);
        doc.text('Date', 160, yPosition);

        yPosition += 10;
        doc.line(15, yPosition - 5, pageWidth - 15, yPosition - 5);

        // Données
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        filteredGuests.forEach((guest, index) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 30;
          }

          doc.text(`${guest.firstName} ${guest.lastName}`, 20, yPosition);
          doc.text(guest.city || '-', 80, yPosition);
          doc.text(guest.status === 'confirmed' ? 'Confirmé' :
                  guest.status === 'pending' ? 'En attente' :
                  guest.status === 'absent' ? 'Absent' : 'Expiré', 120, yPosition);
          doc.text(guest.submittedAt.toLocaleDateString('fr-FR'), 160, yPosition);

          yPosition += 8;
        });

        console.log('PDF simple créé');
      }

      // Sauvegarde du PDF
      const fileName = `liste-invites-mariage-audrey-stephane-${filter}-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      console.log('PDF sauvegardé:', fileName);

    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Vérifiez la console pour plus de détails.');
    }
  };

  const getAttendingBadge = (attending: boolean | null) => {
  };
  
  const getStatusBadge = (status: string) => {
    if (status === 'confirmed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4" />
          Confirmé
        </span>
      );
    } else if (status === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <XCircle className="w-4 h-4" />
          Rejeté
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
          <Calendar className="w-4 h-4" />
          En attente
        </span>
      );
    }
  };

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 bg-gradient-to-br from-terracotta-50 to-terracotta-warm-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 id="admin-space-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-terracotta-600 to-terracotta-700 bg-clip-text text-transparent mb-4">
            👑 Espace Administrateur
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-4">
            Gérez les invitations et consultez les statistiques du mariage
          </p>
          <p className="text-gray-500 text-sm mb-6">
            📊 Dernière actualisation : {lastRefresh.toLocaleTimeString('fr-FR')}
            <span className="ml-2">🔄 Auto-refresh : 60s</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={testFirestore}
              disabled={firestoreStatus === 'testing'}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              {firestoreStatus === 'testing' ? 'Test...' : '🔥 Test Firestore'}
            </button>

            <button
              onClick={loadGuests}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-colors duration-200 text-sm sm:text-base flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Chargement...' : 'Actualiser'}
            </button>

            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              Déconnexion
            </button>
          </div>

          {/* Firestore Status */}
          <div className="text-center mb-6">
            <span className="text-sm text-terracotta-600">
              Stockage: <strong>{firestoreStatus === 'Firestore' ? '🔥 Firestore' : '💾 localStorage'}</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta-500" />
            <div className="h-px bg-terracotta-300 w-12 sm:w-16"></div>
          </div>
          <p className="text-base sm:text-lg text-terracotta-700">Gestion des invités et confirmations</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Total</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Confirmés</div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.confirmed}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">En attente</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-600">{stats.pending}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Absents</div>
                <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.absent}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-600">Expirés</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-600">{stats.expired}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filtrer :</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent"
              >
                <option value="all">Tous les invités ({stats.total})</option>
                <option value="confirmed">Confirmés ({stats.confirmed})</option>
                <option value="pending">En attente ({stats.pending})</option>
                <option value="absent">Absents ({stats.absent})</option>
                <option value="expired">Expirés ({stats.expired})</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Exporter CSV ({filteredGuests.length})
              </button>

              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <FileText className="w-4 h-4" />
                Exporter PDF ({filteredGuests.length})
              </button>
            </div>
          </div>
        </div>

        {/* Guests Table */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-6 text-white">
            <h3 className="text-xl font-bold">Liste des Invités</h3>
            <p className="text-slate-200 mt-1">
              {filteredGuests.length} invité{filteredGuests.length !== 1 ? 's' : ''} affiché{filteredGuests.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Version Mobile - Cartes */}
          <div className="block lg:hidden space-y-4">
            {filteredGuests.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Aucun invité</h4>
                <p className="text-gray-500 text-sm">
                  {filter === 'all'
                    ? "Aucune confirmation reçue pour le moment."
                    : `Aucun invité dans la catégorie "${filter}".`
                  }
                </p>
              </div>
            ) : (
              filteredGuests.map((guest, index) => (
                <div key={guest.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {guest.firstName} {guest.lastName}
                      </h3>
                      {guest.city && (
                        <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{guest.city}</span>
                        </div>
                      )}
                    </div>
                    {getStatusBadge(guest.status)}
                  </div>

                  {guest.message && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{guest.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {guest.submittedAt.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })} à {guest.submittedAt.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Version Desktop - Table */}
          <div className="hidden lg:block overflow-x-auto">
            {filteredGuests.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Aucun invité</h4>
                <p className="text-gray-500">
                  {filter === 'all'
                    ? "Aucune confirmation reçue pour le moment."
                    : `Aucun invité dans la catégorie "${filter}".`
                  }
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom complet</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ville</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map((guest, index) => (
                    <tr key={guest.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {guest.firstName} {guest.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          {guest.city && <MapPin className="w-4 h-4" />}
                          <span>{guest.city || '-'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(guest.status)}
                      </td>
                      <td className="px-6 py-4">
                        {guest.message ? (
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                            <div className="text-sm text-gray-600 max-w-xs">
                              {guest.message.length > 50 
                                ? `${guest.message.substring(0, 50)}...` 
                                : guest.message
                              }
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Aucun message</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {guest.submittedAt.toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;