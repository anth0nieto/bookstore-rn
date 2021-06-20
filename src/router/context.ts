import React, {createContext} from "react";

type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => void;
  signUp: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);