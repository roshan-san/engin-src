import React, { createContext } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import type { Doc } from "@/../convex/_generated/dataModel";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Navigate } from "@tanstack/react-router"; 

type UserContextType = {
  profile: Doc<"profiles">;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export { UserContext };

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useQuery(api.auth.getUser);
  const profile = data?.profile;

  if (profile === undefined) {
    return <FullScreenLoader />;
  }

  if (!profile) {
    return <Navigate to="/" />;
  }

  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  );
};
