import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Lead {
  id?: string;
  name: string;
  email: string;
  subject: string;
  timezone: string;
  background: string;
  message: string;
  createdAt: Timestamp | Date;
}

export const saveLead = async (lead: Omit<Lead, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      ...lead,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getLeads = async (): Promise<Lead[]> => {
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Lead));
};
