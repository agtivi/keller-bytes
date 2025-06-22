'use client'
import React, { useState } from "react";
import { HamburgerList } from "./HamburgerList";

export const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-80 transition-transform duration-500 bg-white/45 backdrop-blur z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-80'
        }`}
      >
        <div className="pt-15 pl-6">
          <HamburgerList/>
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`fixed top-4 left-4 z-50 flex flex-col bg-gray-400/50 rounded w-7 h-6.5 justify-center items-center`}
      >
        <span
          className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        />
        <span
          className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        />
      </button>
    </>
  );
};
