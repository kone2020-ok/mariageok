import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Guest, RSVPFormData, generateConfirmationToken, getGuestStatus, calculateStats, GuestStats } from '../types/guest';

const COLLECTION_NAME = 'guests';
const DEADLINE = new Date('2025-07-31T23:59:59').getTime();

export class FirestoreGuestService {
  // Add a new guest
  static async addGuest(formData: RSVPFormData): Promise<{ guest: Guest; token: string }> {
    try {
      const token = generateConfirmationToken();
      
      const guestData = {
        ...formData,
        submittedAt: Timestamp.now(),
        status: formData.confirmLater ? 'pending' : (formData.attending ? 'confirmed' : 'absent'),
        confirmationToken: token,
        lastUpdated: null
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), guestData);
      
      const guest: Guest = {
        id: docRef.id,
        ...formData,
        submittedAt: guestData.submittedAt.toDate(),
        status: guestData.status as Guest['status'],
        confirmationToken: token
      };

      return { guest, token };
    } catch (error: any) {


      if (error.code === 'permission-denied') {
        throw new Error('Configuration Firebase incomplète. Veuillez contacter l\'administrateur.');
      } else if (error.code === 'unavailable') {
        throw new Error('Service temporairement indisponible. Veuillez réessayer.');
      } else {
        throw new Error('Erreur lors de l\'enregistrement de l\'invité. Veuillez réessayer.');
      }
    }
  }

  // Get all guests
  static async getAllGuests(): Promise<Guest[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const guests: Guest[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        guests.push({
          id: doc.id,
          firstName: data.firstName,
          lastName: data.lastName,
          city: data.city,
          message: data.message,
          attending: data.attending,
          submittedAt: data.submittedAt.toDate(),
          status: data.status,
          confirmLater: data.confirmLater,
          lastUpdated: data.lastUpdated ? data.lastUpdated.toDate() : undefined,
          confirmationToken: data.confirmationToken
        });
      });

      return guests;
    } catch (error) {

      throw new Error('Erreur lors du chargement des invités');
    }
  }

  // Find guest by confirmation token
  static async findGuestByToken(token: string): Promise<Guest | null> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('confirmationToken', '==', token));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        message: data.message,
        attending: data.attending,
        submittedAt: data.submittedAt.toDate(),
        status: data.status,
        confirmLater: data.confirmLater,
        lastUpdated: data.lastUpdated ? data.lastUpdated.toDate() : undefined,
        confirmationToken: data.confirmationToken
      };
    } catch (error) {

      return null;
    }
  }

  // Update guest confirmation
  static async updateGuestConfirmation(guestId: string, attending: boolean): Promise<boolean> {
    try {
      const now = new Date().getTime();
      if (now > DEADLINE) return false; // Deadline passed

      const guestRef = doc(db, COLLECTION_NAME, guestId);
      await updateDoc(guestRef, {
        attending,
        status: attending ? 'confirmed' : 'absent',
        lastUpdated: Timestamp.now()
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  // Update expired guests (batch operation)
  static async updateExpiredGuests(): Promise<number> {
    try {
      const now = new Date().getTime();
      if (now <= DEADLINE) return 0; // Deadline not passed yet

      const q = query(collection(db, COLLECTION_NAME), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) return 0;

      const batch = writeBatch(db);
      let updatedCount = 0;

      querySnapshot.forEach((docSnapshot) => {
        const guestRef = doc(db, COLLECTION_NAME, docSnapshot.id);
        batch.update(guestRef, {
          status: 'expired',
          attending: false,
          lastUpdated: Timestamp.now()
        });
        updatedCount++;
      });

      await batch.commit();
      return updatedCount;
    } catch (error) {

      return 0;
    }
  }

  // Get guests with current status
  static async getGuestsWithCurrentStatus(): Promise<Guest[]> {
    try {
      const guests = await this.getAllGuests();
      return guests.map(guest => ({
        ...guest,
        status: getGuestStatus(guest, DEADLINE)
      }));
    } catch (error) {

      throw error;
    }
  }

  // Calculate statistics
  static async getGuestStats(): Promise<GuestStats> {
    try {
      const guests = await this.getGuestsWithCurrentStatus();
      return calculateStats(guests, DEADLINE);
    } catch (error) {

      return { total: 0, confirmed: 0, pending: 0, absent: 0, expired: 0 };
    }
  }

  // Check if deadline is passed
  static isDeadlinePassed(): boolean {
    return new Date().getTime() > DEADLINE;
  }

  // Get deadline
  static getDeadline(): number {
    return DEADLINE;
  }

  // Generate return URL
  static generateReturnUrl(token: string): string {
    return `${window.location.origin}${window.location.pathname}?confirm=${token}`;
  }

  // Find guest by name (for duplicate checking)
  static async findGuestByName(firstName: string, lastName: string): Promise<Guest | null> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        where('firstName', '==', firstName),
        where('lastName', '==', lastName)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        message: data.message,
        attending: data.attending,
        submittedAt: data.submittedAt.toDate(),
        status: data.status,
        confirmLater: data.confirmLater,
        lastUpdated: data.lastUpdated ? data.lastUpdated.toDate() : undefined,
        confirmationToken: data.confirmationToken
      };
    } catch (error) {

      return null;
    }
  }
}
