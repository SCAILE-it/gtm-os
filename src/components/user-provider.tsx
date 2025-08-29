"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
  company: string;
}

interface UserContextType {
  user: User;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data - in a real app this would come from authentication
const mockUser: User = {
  name: "Tilman",
  email: "tilman@company.com", 
  company: "Growth Startup Inc",
  avatar: undefined
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user: mockUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
