import { calculatePasswordStrength } from "@/utils/calculatePasswordStrenght";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowElbowRight, CopySimple } from "phosphor-react";
import { useState } from "react";
import { StrenghtBar } from "../StrenghtBar";
import { PasswordItemHeader } from "./PasswordItemHeader";

interface PasswordItemProps {
  item: string;
  password: {
    platform_img: string;
    platform: string;
    email: string;
    password: string;
    username?: string;
    website: string;
  };
}

export function PasswordItem({ item, password }: PasswordItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copyButtonColor, setCopyButtonColor] = useState("text-violet-600");
  const passwordStrength = calculatePasswordStrength(password.password);

  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText("123456")
      .then(() => {
        setCopyButtonColor("text-green-500");
        setTimeout(() => {
          setCopyButtonColor("text-violet-500");
        }, 2000);
      })
      .catch(() => {
        setCopyButtonColor("text-red-500");
        setTimeout(() => {
          setCopyButtonColor("text-violet-500");
        }, 2000);
      });
  };

  return (
    <Accordion.Item
      className="border border-zinc-800 p-4 rounded-md flex flex-col gap-4"
      value={item}
    >
      <Accordion.Header className="flex items-center justify-between w-full">
        <PasswordItemHeader
          email={password.email}
          platform={password.platform}
          platform_img={password.platform_img}
        />
      </Accordion.Header>
      <Accordion.Content>
        <div className="border border-zinc-800 rounded-md p-4 relative">
          <ul className="flex flex-col gap-4">
            <li>
              <strong className="mr-2">username:</strong>
              <span>{password.username}</span>
            </li>
            <li>
              <strong className="mr-2">email: </strong>
              <span>{password.email}</span>
            </li>
            <li>
              <strong
                onClick={() => setShowPassword(!showPassword)}
                className="mr-2 cursor-pointer"
              >
                password:
              </strong>
              <div className="inline-flex items-center gap-2">
                <span className={showPassword ? "" : "blur-sm"}>
                  {password.password}
                </span>
                <button type="button" onClick={handleCopyPassword}>
                  <CopySimple
                    size={14}
                    weight="bold"
                    className={`transition-colors ${copyButtonColor}`}
                  />
                </button>
              </div>
            </li>
            <li>
              <strong className="mr-2">strenght:</strong>
              <StrenghtBar passwordStrength={passwordStrength} />
            </li>
            <li>
              <strong className="mr-2">website:</strong>
              <a
                href="https://youtube.com"
                target="_blank"
                className="inline-flex gap-2 items-center"
                rel="noreferrer"
              >
                {password.website}{" "}
                <ArrowElbowRight
                  size={14}
                  weight="bold"
                  className="text-violet-600"
                />
              </a>
            </li>
          </ul>
          <button className="absolute right-4 top-4 px-4 py-1 bg-transparent border border-zinc-800 rounded-md transition-opacity hover:opacity-80">
            Edit
          </button>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
