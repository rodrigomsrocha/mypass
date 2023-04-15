import { ReactNode, useEffect } from "react";
import { Header } from "../Header";
import { useAuthStore } from "@/context/authContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export function PagesLayout({ children }: LayoutProps) {
  const { user, loading } = useAuthStore((state) => ({
    user: state.user,
    loading: state.loading,
  }));
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push("/sign-up");
  }, [user, loading, router]);

  return (
    <div className="max-w-[1580px] px-5 mx-auto">
      <Header />
      {children}
    </div>
  );
}
