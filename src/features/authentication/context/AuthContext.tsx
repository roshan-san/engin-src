import { createContext, useContext, type ReactNode, useEffect } from "react";
import { type User } from "@supabase/supabase-js";
import supabase from "@/utils/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signInWithGitHub: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isLoading,} = useQuery<User>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event,) => {
      await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      
      if (event === "SIGNED_IN") {
        navigate({to: "/register"});
      } else if (event === "SIGNED_OUT") {
        navigate({to: "/"});
      }
    });
  }, [queryClient]);

  const signInWithGoogle = async () => {    
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signInWithGitHub = async () => {    
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = async () => {
    console.log("Attempting to sign out...");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during sign out:", error);
      } else {
        console.log("Sign out successful");
      }
    } catch (err) {
      console.error("Exception during sign out:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user as User,
        isLoading,
        signInWithGoogle,
        signInWithGitHub,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
