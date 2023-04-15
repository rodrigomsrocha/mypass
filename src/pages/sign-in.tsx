import AuthLayout from "@/components/Layouts/authLayout";
import Link from "next/link";
import { ArrowRight, GoogleLogo } from "phosphor-react";
import { ReactElement } from "react";

const SignIn = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl">Sign in</h1>
        <span className="text-zinc-600 mb-8 block">be safe</span>
        <button className="border border-zinc-800 rounded-md flex items-center justify-center gap-4 py-2 w-full mb-4">
          <GoogleLogo size={24} weight="bold" /> Sign in with Google
        </button>
      </div>
      <span className="text-zinc-600 mb-4 flex items-center gap-2 after:w-full after:h-px after:bg-zinc-800 before:w-full before:bg-zinc-800 before:h-px">
        or
      </span>
      <form className="flex flex-col gap-2 w-full mb-4">
        <label htmlFor="email">Your E-mail</label>
        <input
          className="mb-4 bg-transparent border border-zinc-800 rounded-md px-4 py-2"
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
        />
        <label htmlFor="password">Password</label>
        <input
          className="mb-4 bg-transparent border border-zinc-800 rounded-md px-4 py-2"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-violet-600 rounded-md px-4 py-2 mt-4 transition-opacity hover:opacity-80"
        >
          <span className="ml-auto">Continue</span>
          <ArrowRight className="ml-auto" weight="bold" />
        </button>
      </form>
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
