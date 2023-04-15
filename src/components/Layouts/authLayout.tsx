import { ReactNode, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthStore } from "@/context/authContext";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user, loading } = useAuthStore((state) => ({
    user: state.user,
    loading: state.loading,
  }));
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) router.push("/");
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen">
      <div className="w-2/3 bg-zinc-900 min-h-screen border-r border-zinc-800 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl max-w-lg mb-20 leading-normal">
          {router.pathname === "/sign-up"
            ? "Get started"
            : "Welcome back sign in"}{" "}
          and keep your passwords <span className="text-violet-600">safe</span>.
        </h1>
        <Image src="/hero.svg" alt="hero" width={500} height={500} />
      </div>
      <div className="flex flex-col items-center justify-center w-1/3 px-4">
        <div className="w-2/3">{children}</div>
      </div>
    </div>
  );
}
