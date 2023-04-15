import AuthLayout from "@/components/Layouts/authLayout";
import { LoginUserForm } from "@/components/LoginUserForm";
import { useAuthStore } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, GoogleLogo } from "phosphor-react";
import { ReactElement } from "react";

const SignIn = () => {
  const authWithGoogle = useAuthStore((state) => state.authWithGoogle);
  const router = useRouter();

  return (
    <>
      <div>
        <h1 className="text-2xl">Sign in</h1>
        <span className="text-zinc-600 mb-8 block">be safe</span>
        <button
          onClick={async () => {
            await authWithGoogle();
            router.push("/");
          }}
          className="border border-zinc-800 rounded-md flex items-center justify-center gap-4 py-2 w-full mb-4"
        >
          <GoogleLogo size={24} weight="bold" /> Sign in with Google
        </button>
      </div>
      <span className="text-zinc-600 mb-4 flex items-center gap-2 after:w-full after:h-px after:bg-zinc-800 before:w-full before:bg-zinc-800 before:h-px">
        or
      </span>
      <LoginUserForm />
      <span>
        Don&apos;t have an account?{" "}
        <Link className="text-violet-600" href="/sign-up">
          Sing up
        </Link>
      </span>
    </>
  );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
