import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
