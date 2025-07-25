import { db, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const testFirebaseConnection = async () => {
  try {
    // Test 1: Firestore connection
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Test connection',
      timestamp: new Date()
    });

    // Test 2: Auth connection
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';

    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);

    return { success: true, message: 'Firebase fully configured' };

  } catch (error: any) {
    
    if (error.code === 'permission-denied') {
      return { 
        success: false, 
        message: 'Firestore rules need to be configured',
        action: 'Configure Firestore security rules'
      };
    }
    
    if (error.code === 'auth/operation-not-allowed') {
      return { 
        success: false, 
        message: 'Email/Password authentication not enabled',
        action: 'Enable Email/Password in Firebase Console'
      };
    }
    
    return { 
      success: false, 
      message: error.message,
      action: 'Check Firebase Console configuration'
    };
  }
};

// Test configuration only
export const testFirebaseConfig = () => {

  
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };
  
  const missing = Object.entries(config)
    .filter(([key, value]) => !value)
    .map(([key]) => key);
  
  if (missing.length > 0) {
    return false;
  }
  
  return true;
};
