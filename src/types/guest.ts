export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  message: string;
  attending: boolean | null;
  submittedAt: Date;
  status: 'confirmed' | 'pending' | 'absent' | 'expired';
  confirmLater: boolean;
  lastUpdated?: Date;
  confirmationToken?: string; // Pour permettre le retour
}

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  city: string;
  message: string;
  attending: boolean | null;
  confirmLater: boolean;
}

export interface GuestStats {
  total: number;
  confirmed: number;
  pending: number;
  absent: number;
  expired: number;
}

// Utilitaires pour la gestion des invités
export const getGuestStatus = (guest: Guest, deadline: number): Guest['status'] => {
  const now = new Date().getTime();
  
  // Si le délai est dépassé et que l'invité n'a pas confirmé
  if (now > deadline && guest.status === 'pending') {
    return 'expired';
  }
  
  return guest.status;
};

export const calculateStats = (guests: Guest[], deadline: number): GuestStats => {
  const stats: GuestStats = {
    total: guests.length,
    confirmed: 0,
    pending: 0,
    absent: 0,
    expired: 0
  };

  guests.forEach(guest => {
    const status = getGuestStatus(guest, deadline);
    stats[status]++;
  });

  return stats;
};

export const generateConfirmationToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const findGuestByToken = (guests: Guest[], token: string): Guest | null => {
  return guests.find(guest => guest.confirmationToken === token) || null;
};

export const updateGuestStatus = (
  guests: Guest[], 
  guestId: string, 
  attending: boolean | null,
  status: Guest['status']
): Guest[] => {
  return guests.map(guest => {
    if (guest.id === guestId) {
      return {
        ...guest,
        attending,
        status,
        lastUpdated: new Date()
      };
    }
    return guest;
  });
};
