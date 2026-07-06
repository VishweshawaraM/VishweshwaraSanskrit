import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
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

export const deleteLead = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'leads', id));
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export interface AdminLog {
  id?: string;
  action: string;
  status: 'success' | 'failure';
  details?: string;
  ip?: string;
  createdAt: Timestamp | Date;
}

export const logAdminActivity = async (log: Omit<AdminLog, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'adminLogs'), {
      ...log,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error logging admin activity: ", e);
    // Don't throw to avoid breaking the main flow
  }
};

export const getAdminLogs = async (limitCount = 50): Promise<AdminLog[]> => {
  try {
    // using limit for safety if requested, although imported limit would be needed
    const q = query(collection(db, 'adminLogs'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AdminLog));
  } catch (e) {
    console.error("Error fetching admin logs: ", e);
    return [];
  }
};
