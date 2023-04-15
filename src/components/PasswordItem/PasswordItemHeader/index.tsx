import Image from "next/image";
import { CaretDown } from "phosphor-react";
import * as Accordion from "@radix-ui/react-accordion";

export function PasswordItemHeader() {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md overflow-hidden">
          <Image
            src="https://img.freepik.com/vetores-premium/logo-vermelho-do-youtube-logo-de-midia-social_197792-1803.jpg?w=2000"
            alt="youtube logo"
            width={40}
            height={40}
          />
        </div>
        <div className="flex items-center gap-2">
          <strong>YouTube</strong>
          <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
          <span className="text-zinc-600">rodrigo@gmail.com</span>
        </div>
      </div>
      <Accordion.Trigger type="button">
        <CaretDown size={18} weight="bold" />
      </Accordion.Trigger>
    </header>
  );
}
