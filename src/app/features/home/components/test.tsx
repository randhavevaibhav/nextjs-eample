"use client";

import { useAuth } from "@/app/features/auth/context/auth-context";

export const Test = () => {
  const { user } = useAuth();
console.log("user in Test ==> ",user)
  return <div>Hello {`user with id ` + user?.id}</div>;
};
