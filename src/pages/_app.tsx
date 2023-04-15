import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { FormattedUser, useAuthStore } from "@/context/authContext";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { updateUser, updateLoading } = useAuthStore((state) => ({
    updateUser: state.updateUser,
    updateLoading: state.updateLoading,
  }));

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        updateUser(null);
        updateLoading(false);
        return;
      } else {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        updateLoading(true);
        updateUser(docSnap.data() as FormattedUser);
        updateLoading(false);
      }
    });

    return subscriber;
  }, [updateUser, updateLoading]);

  return getLayout(
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
