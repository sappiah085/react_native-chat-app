import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_type } from "./context";
const firebaseConfig = {
  apiKey: process.env.api_key,
  authDomain: "chat-c3da7.firebaseapp.com",
  projectId: "chat-c3da7",
  storageBucket: "chat-c3da7.firebasestorage.app",
  messagingSenderId: "422198067599",
  appId: "1:422198067599:web:a534262f6a9f348d5f8bfa",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const store = getFirestore(app);

export const getUser = async (id: string) => {
  const docRef = doc(store, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};
export async function createUser(id: string, payload: any) {
  // Add a new document in collection "cities"
  const user = await setDoc(doc(store, "users", id), payload);
  return user;
}

export async function getAllUsers(name: string) {
  const data: user_type[] = [];
  let q = query(collection(store, "users"));
  if (name.length > 0)
    q = query(collection(store, "users"), where("name", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((d) => data.push(d.data() as user_type));
  return data;
}
export const signUp = async (email: string, password: string) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential.user.uid;
  } catch (error) {
    return undefined;
  }
};
export const signIn_func = async (email: string, password: string) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user.uid;
  } catch (error) {
    return undefined;
  }
};
export type message = {
  message: string;
  time: Timestamp;
  person: user_type;
};
export type room = {
  id: string;
  other_user: user_type;
  members: string[];
  messages: message[];
  time: Timestamp;
  who_created: user_type;
};
export async function getRooms(id: string) {
  if (!id) return [];
  const rooms: room[] = [];
  let q = query(
    collection(store, "rooms"),
    where("members", "array-contains", id),
    orderBy("time", "desc")
  );
  const rooms_from_cloud = await getDocs(q);
  rooms_from_cloud.forEach((d) => rooms.push(d.data() as room));
  return rooms;
}

export async function createRoom(id: string, payload: Partial<room>) {
  const room = await setDoc(doc(store, "rooms", id), {
    ...payload,
    time: serverTimestamp(),
  });
  return room;
}
export const getRoom = async (id: string) => {
  const docRef = doc(store, "rooms", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as room;
  } else {
    return undefined;
  }
};

export const sendMessage = async (id: string, message: Partial<message>) => {
  const t = serverTimestamp();
  try {
    const docRef = doc(store, "rooms", id);

    await updateDoc(docRef, {
      messages: arrayUnion({ ...message, time: Timestamp.now() }),
      time: t,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
