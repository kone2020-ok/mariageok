import { AuthService } from '../services/authService';
import { testFirebaseConfig } from './testFirebase';
import { HybridGuestService } from '../services/hybridGuestService';

export const initializeFirebase = async () => {
  try {
    // Test configuration first
    const configOk = testFirebaseConfig();
    if (!configOk) {
      return;
    }

    // Initialize hybrid service (will test Firestore availability)
    await HybridGuestService.initialize();

    // Create admin account if it doesn't exist (disabled until Firebase Console is configured)
    // await AuthService.createAdminAccount();
  } catch (error) {
    // Silent error handling for production
  }
};

// Call this function when the app starts
export default initializeFirebase;
