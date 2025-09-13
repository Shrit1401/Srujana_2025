"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { ChevronDownIcon } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-18 py-4">
      <a href="/" className="flex items-center cursor-pointer">
        <Image
          src="/logo.png"
          alt="Vidyapak Logo"
          width={60}
          height={60}
          className="mr-2"
        />
      </a>
      <div className="flex items-center gap-4">
        {!loading && (
          <>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-none shadow-none py-6"
                  >
                    <img
                      src={user.photoURL ?? ""}
                      className="rounded-full w-8 h-8"
                    />
                    <span className="text-md">
                      {user.displayName?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn} size="sm">
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
