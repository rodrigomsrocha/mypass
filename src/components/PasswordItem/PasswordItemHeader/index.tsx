import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import { CaretDown } from "phosphor-react";

interface PasswordHeaderProps {
  platform_img: string;
  platform: string;
  email: string;
}

export function PasswordItemHeader({
  email,
  platform,
  platform_img,
}: PasswordHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md overflow-hidden">
          <Image
            src={platform_img}
            alt={`${platform} logo`}
            width={40}
            height={40}
          />
        </div>
        <div className="flex items-center gap-2">
          <strong>{platform}</strong>
          <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
          <span className="text-zinc-600">{email}</span>
        </div>
      </div>
      <Accordion.Trigger type="button">
        <CaretDown size={18} weight="bold" />
      </Accordion.Trigger>
    </header>
  );
}
