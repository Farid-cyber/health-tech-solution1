"use client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.scss";

import { useState } from "react";
import Sidebar from "./sidebar";
import HeaderAdmin from "./adminHeader";
// import HeaderAdmin from "./adminHeader";
// import Sidebar2 from "./sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className=" flex flex-col">
      <HeaderAdmin sidebar={sidebar} setSidebar={setSidebar} />
      <div className="flex zzzz w-full relative h-full">
        <div className="">
          <Sidebar sidebar={sidebar} />
        </div>
        <main className="llll w-full p-5">{children}</main>
      </div>
    </div>
  );
}
