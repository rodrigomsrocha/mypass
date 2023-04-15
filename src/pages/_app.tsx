import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { onIdTokenChanged } from "firebase/auth";
import { useAuthStore } from "@/context/authContext";
import { auth } from "@/lib/firebase";

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
    const subscriber = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        updateUser(null);
        updateLoading(false);
        return;
      } else {
        updateLoading(true);
        updateUser(user);
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
