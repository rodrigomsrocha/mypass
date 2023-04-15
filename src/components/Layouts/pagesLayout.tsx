import { ReactNode } from "react";
import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
}

export function PagesLayout({ children }: LayoutProps) {
  return (
    <div className="max-w-[1580px] px-5 mx-auto">
      <Header />
      {children}
    </div>
  );
}
