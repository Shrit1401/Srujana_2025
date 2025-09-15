"use client";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center text-sm">
          © {currentYear} Vidyapak. All rights reserved. Manipal blr | Shrit
          Shrivastava and Yash Sanjiv Bhawar
        </div>
      </div>
    </footer>
  );
};

export default Footer;
