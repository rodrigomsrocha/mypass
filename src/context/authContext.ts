import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  updateUser: (user: User | null) => void;
  updateLoading: (loading: boolean) => void;
  authWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const provider = new GoogleAuthProvider();

  return {
    user: null,
    loading: true,
    updateUser: (user) => set(() => ({ user })),
    updateLoading: (loading) => set(() => ({ loading })),
    authWithGoogle: async () => {
      await signInWithPopup(auth, provider);
    },
  };
});
