
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const signUp = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Add user's name to their auth profile
  await updateProfile(user, { displayName: name });

  // Create a document in Firestore 'users' collection
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name: name,
    email: user.email,
  });

  return userCredential;
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return firebaseSignOut(auth);
};
