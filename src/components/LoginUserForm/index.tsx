import { useAuthStore } from "@/context/authContext";
import { ArrowRight } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Loader } from "../Loader";

export function LoginUserForm() {
  const { loginUser, loading } = useAuthStore((state) => ({
    loginUser: state.loginUser,
    loading: state.loading,
  }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = async (e: FormEvent) => {
    e.preventDefault();
    await loginUser({ email, password });
  };
  return (
    <form
      onSubmit={handleLoginUser}
      className="flex flex-col gap-2 w-full mb-4"
    >
      <label htmlFor="email">Your E-mail</label>
      <input
        className="mb-4 bg-transparent border border-zinc-800 rounded-md px-4 py-2"
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        className="mb-4 bg-transparent border border-zinc-800 rounded-md px-4 py-2"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center bg-violet-600 rounded-md px-4 py-2 mt-4 transition-opacity hover:opacity-80 disabled:opacity-80 disabled:cursor-progress"
      >
        <span className="mx-auto">Continue</span>
        {loading ? <Loader /> : <ArrowRight size={18} weight="bold" />}
      </button>
    </form>
  );
}