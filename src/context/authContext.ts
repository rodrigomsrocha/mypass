import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";

interface SignUpUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export interface FormattedUser {
  name: string;
  email: string;
  picURL: string | null;
}

interface AuthState {
  user: FormattedUser | null;
  loading: boolean;
  updateUser: (user: FormattedUser | null) => void;
  updateLoading: (loading: boolean) => void;
  authWithGoogle: () => Promise<void>;
  signUpUser: (data: SignUpUserData) => Promise<void>;
  loginUser: (data: LoginUserData) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const provider = new GoogleAuthProvider();

  const authWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const formattedUser = {
        name: user.displayName,
        email: user.email,
        picURL: user.photoURL,
      } as FormattedUser;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set(() => ({ user: formattedUser }));
      } else {
        addNewUserToFirestore(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUpUser = async ({ email, password, name }: SignUpUserData) => {
    try {
      set(() => ({ loading: true }));
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(db, "users", user.uid);

      const formattedUser = {
        name,
        email,
        picURL: null,
      };
      await setDoc(docRef, {
        ...formattedUser,
      });
      set(() => ({ user: formattedUser }));
      set(() => ({ loading: false }));
    } catch (error) {
      console.error(error);
    } finally {
      set(() => ({ loading: false }));
    }
  };

  const loginUser = async ({ email, password }: LoginUserData) => {
    try {
      set(() => ({ loading: true }));
      await signInWithEmailAndPassword(auth, email, password);
      set(() => ({ loading: false }));
    } catch (error) {
      console.error(error);
    } finally {
      set(() => ({ loading: false }));
    }
  };

  return {
    user: null,
    loading: false,
    updateUser: (user) => set(() => ({ user })),
    updateLoading: (loading) => set(() => ({ loading })),
    authWithGoogle,
    signUpUser,
    loginUser,
    signOut: async () => {
      await signOut(auth);
    },
  };
});

async function addNewUserToFirestore(user: User) {
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, {
    name: user.displayName,
    email: user.email,
    picURL: user.photoURL ?? null,
  });
}
