import { SpinnerGap } from "phosphor-react";

export function Loader() {
  return (
    <SpinnerGap
      size={18}
      className="transition-transform animate-spin"
      weight="bold"
    />
  );
}
