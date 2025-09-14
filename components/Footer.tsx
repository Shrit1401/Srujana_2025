"use client";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center text-gray-600 text-sm">
          © {currentYear} Vidyapak. All rights reserved. Manipal blr
        </div>
      </div>
    </footer>
  );
};

export default Footer;
