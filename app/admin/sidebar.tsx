"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./sidebar.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { auth } from "../firebase.auth/firbase.cons.auth";
import { useEffect } from "react";
import { auth } from "../firebase.auth/firebaseauth.con";
type InitialProps = {
  sidebar: boolean;
};
export default function Sidebar({ sidebar }: InitialProps) {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: "/admin/consultations", label: "Consultations" },
    { href: "/admin/doctors", label: "Doctors" },
    { href: "/admin/hospitals", label: "Hospitals" },
    { href: "/admin/news", label: "Xabarlar" },
    { href: "/admin/latest-news", label: "Oxirgi Xabarlar" },
    { href: "/", label: "Home" },
  ];

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        // setUser(true);
        if (user.uid! == "" || user) {
        }
      } else {
        // setUser(false)
      }
    });
  };

  // useEffect(() => {
  //   check();
  // }, []);

  const signOu = () => {
    // console.log(auth);
    localStorage.removeItem("userId");
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav
      className={`${
        sidebar === true
          ? "sidebar22 flex flex-col p-4 gap-2"
          : "sidebar222 flex flex-col p-4 gap-2"
      }`}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 fff p-2 rounded-md font-medium transition 
            ${
              pathname === link.href
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
        >
          {link.label}
        </Link>
      ))}
      <div
        // key={link.href}
        onClick={signOu}
        // href={"/"}
        className={`px-4 fff py-2 rounded-md font-medium transition  cursor-pointer
            ${
              pathname === "/registration"
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
      >
        Logout
      </div>
    </nav>
  );
}
