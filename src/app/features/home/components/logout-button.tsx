"use client";

import { useAuth } from "../../auth/context/auth-context";

export const LogoutButton = () => {
  const { user,logout,loading } = useAuth();



  return (
    <button type="button" className="border px-2 py-1 rounded cursor-pointer" onClick={()=>{
        if(user?.id)
        {
            logout(user.id)
        }
    }}>
      {loading?`loading ..`:`Logout`}
    </button>
  );
};
