import { useAuthStore } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";
import { Loader } from "../Loader";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const { pathname } = useRouter();

  return (
    <header className="flex justify-between py-8">
      <h1 className="text-3xl">mypass</h1>
      <nav className="flex items-center gap-4">
        <Link
          className={`p-2 ${
            pathname === "/"
              ? "bg-zinc-800 p-2 rounded-md transition-colors hover:bg-zinc-900"
              : ""
          }`}
          href="/"
        >
          passwords
        </Link>
        <Link
          className={`p-2 ${
            pathname === "/generate"
              ? "bg-zinc-800 p-2 rounded-md transition-colors hover:bg-zinc-900"
              : ""
          }`}
          href="/generate"
        >
          generate
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <div className="bg-zinc-800 flex items-center justify-center rounded-md w-10 h-10 relative overflow-hidden">
          {user?.picURL ? (
            <Image
              src={user.picURL}
              alt={user.name}
              fill
              className="w-auto h-auto"
            />
          ) : (
            <span>
              {user?.name.split(" ")[0][0].toUpperCase()}
              {user?.name.split(" ")[1][0].toUpperCase()}
            </span>
          )}
        </div>
        <span>{user?.name}</span>
        <button type="button">
          <CaretDown size={18} weight="bold" />
        </button>
        <button onClick={signOut}>signout</button>
      </div>
    </header>
  );
}
