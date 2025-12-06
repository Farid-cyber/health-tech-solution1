"use client";

// import Sidebar from "@/app/components/sidebar";
// import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
// import Sidebar2 from "../sidebar";
// import { log } from "console";
import "./adminHeader.scss"
type InitialProps = {
  sidebar: boolean;
  setSidebar: (val: boolean) => void;
};
const HeaderAdmin = ({ setSidebar, sidebar }: InitialProps) => {
  const setHandle = (val: boolean) => {
    if (sidebar === val) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  };
  return (
    <div className="life p-5 flex justify-between items-center border-b  w-full cursor-pointer">
      <div className="flex items-center! w-full px-2 gap-2 ">
        <FiAlignJustify
          onClick={() => setHandle(true)}
          className="text-primary"
          size={35}
        />
        <h1
          style={{ color: "black", fontWeight: "700", fontSize: "25px" }}
          className="text-primary mt-1"
        >
          {" "}
          Admin
        </h1>
      </div>
    </div>
  );
};

export default HeaderAdmin;
