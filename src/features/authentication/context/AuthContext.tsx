import { createContext, useContext, type ReactNode } from "react";
import { type User } from "@supabase/supabase-js";
import supabase from "@/utils/supabase";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()


const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
    queryClient.invalidateQueries({ queryKey: ["auth-user"] });
  }
});

window.addEventListener('beforeunload', () => {
  subscription.unsubscribe();
});

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => void;
  signInWithGitHub: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const redirectAfterLogin = window.location.origin + "/register";

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" ,options: {redirectTo: redirectAfterLogin}});
  };

  const signInWithGitHub = async () => {    
    await supabase.auth.signInWithOAuth({ provider: "github" ,options: {redirectTo: redirectAfterLogin}});
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ["auth-user"] });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
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
