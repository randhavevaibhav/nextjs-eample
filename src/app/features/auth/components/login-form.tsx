"use client";

import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

export const LoginForm = () => {
  const { loading, error, login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("email ==> ", email);
    console.log("password ==> ", password);
    if (!email || !password) {
      alert("please enter valid email, password");
    } else {
      login(email.toString(), password.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="border px-3 py-2 w-full rounded"
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        className="border px-3 py-2 w-full rounded"
      />
      <button type="submit" className="border px-2 py-1 rounded cursor-pointer">
        {loading?`Loading ...`:`Submit`}
      </button>
      {error ? (
        <p className="text-red-600 ">Error while submitting form !! {error}</p>
      ) : null}
    </form>
  );
};
