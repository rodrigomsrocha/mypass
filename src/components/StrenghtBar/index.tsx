import * as Progress from "@radix-ui/react-progress";

interface StrenghtBarProps {
  passwordStrength: number;
}

export function StrenghtBar({ passwordStrength }: StrenghtBarProps) {
  const progressStyles = {
    width: `${passwordStrength}%`,
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Progress.Root className="w-40 h-2 bg-zinc-800 rounded-md inline-flex">
        <Progress.Indicator
          className={`rounded-md h-2 ${
            passwordStrength <= 25
              ? "bg-red-500"
              : passwordStrength <= 50
              ? "bg-yellow-500"
              : passwordStrength <= 75
              ? "bg-lime-500"
              : "bg-green-500"
          }`}
          style={progressStyles}
        />
      </Progress.Root>
      <span
        className={`text-sm ${
          passwordStrength <= 25
            ? "text-red-500"
            : passwordStrength <= 50
            ? "text-yellow-500"
            : passwordStrength <= 75
            ? "text-lime-500"
            : "text-green-500"
        }`}
      >
        {passwordStrength <= 25
          ? "very weak"
          : passwordStrength <= 50
          ? "weak"
          : passwordStrength <= 75
          ? "strong"
          : "very strong"}
      </span>
    </div>
  );
}
