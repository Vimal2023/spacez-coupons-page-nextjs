import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

const Navbar = ({ onClickHandler }: any) => {
  return (
    <>
      <header className="flex justify-between items-center p-4 border-b">
        <Image
          src="https://res.cloudinary.com/dosz4fxdk/image/upload/v1762872447/logo_for_websiter_1_1_iz3hbc_zcotf0.webp"
          alt="SPACZ"
          width={120}
          height={100}
        />
        <button
          className="text-3xl font-bold text-[#9a5632]"
          onClick={() => onClickHandler("")}
        >
          <Menu color="#9a5632" />
        </button>
      </header>
    </>
  );
};

export default Navbar;
