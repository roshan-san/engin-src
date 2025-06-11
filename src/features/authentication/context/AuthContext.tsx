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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
          navigate({ to: "/register" });
        } catch (error) {
          console.error("Error during sign in:", error);
        }
      } else if (event === "SIGNED_OUT") {
        try {
          await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
          navigate({ to: "/" });
        } catch (error) {
          console.error("Error during sign out:", error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, navigate]);

  const signInWithGoogle = async () => {    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/register"
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithGitHub = async () => {    
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "github",
        options: {
          redirectTo: window.location.origin + "/register"
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
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
