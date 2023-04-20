import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import nookies from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SignUpUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface FormattedUser {
  name: string;
  email: string;
  picURL: string | null;
}

interface AuthContextProps {
  user: FormattedUser | null;
  loading: boolean;
  authWithGoogle: () => Promise<void>;
  signUpUser: (data: SignUpUserData) => Promise<void>;
  loginUser: (data: LoginUserData) => Promise<void>;
  signUserOut: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<FormattedUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
        nookies.set(undefined, "token", "", { path: "/" });
        return;
      } else {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        setLoading(true);
        setUser(docSnap.data() as FormattedUser);
        setLoading(false);
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        return;
      }
    });

    return unsubscribe;
  }, []);

  async function addNewUserToFirestore(user: User) {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      name: user.displayName,
      email: user.email,
      picURL: user.photoURL ?? null,
    });
  }

  const authWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

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
        setUser(formattedUser);
      } else {
        addNewUserToFirestore(user);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUpUser = async ({ email, password, name }: SignUpUserData) => {
    try {
      setLoading(true);
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
      setUser(formattedUser);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async ({ email, password }: LoginUserData) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUserOut = async () => {
    await signOut(auth);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authWithGoogle,
        signUpUser,
        loginUser,
        signUserOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
