import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
      <div>
        <Button>Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
