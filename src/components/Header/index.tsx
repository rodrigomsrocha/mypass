import Link from "next/link";
import { useRouter } from "next/router";
import { CaretDown } from "phosphor-react";

export function Header() {
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
        <span className="bg-zinc-800 p-2 rounded-md">RM</span>
        <span>Rodrigo Marques</span>
        <button type="button">
          <CaretDown size={18} weight="bold" />
        </button>
      </div>
    </header>
  );
}
