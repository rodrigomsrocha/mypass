import { Header } from "@/components/Header";
import { AuthContextProvider } from "@/context/authContext";
import { CategoriesContextProvider } from "@/context/categoriesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <AuthContextProvider>
      <CategoriesContextProvider>
        {pathname === "/sign-up" || pathname === "/sign-in" ? (
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        ) : (
          <main className={`${inter.className} max-w-[1580px] px-5 mx-auto`}>
            <Header />
            <Component {...pageProps} />
          </main>
        )}
      </CategoriesContextProvider>
    </AuthContextProvider>
  );
}
