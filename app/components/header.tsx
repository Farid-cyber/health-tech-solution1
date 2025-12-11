import { FaHandHoldingMedical } from "react-icons/fa";
import "./header.scss";
import Image from "next/image";
import { LuCross } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.auth/firebaseauth.con";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchDoctors } from "../redux/slices/doctors";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {}, [pathname]);
  const [id, setId] = useState<null | string>(null);
  const [checkAdmin, setCheckAdmin] = useState<string | null>(null);
  const { doctors } = useAppSelector((state) => state.doctors);
  const dispatch = useAppDispatch();

  const check = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if()
        const findedDoctor = doctors.find((c) => c.email === user.email);
        if (findedDoctor) {
          setCheckAdmin("doctor");
        } else if (user.email === "farid@gmail.com") {
          setCheckAdmin("farid@gmail.com");
        } else {
          setCheckAdmin(user.email);
        }

        if (!user.uid || user.uid === "") {
          router.push("/registration");
        } else {
          setId(user.uid);
        }
      } else {
        setCheckAdmin("");
        setId(null);
      }
    });
  };

  const logout = () => {
    // console.log(auth);
    signOut(auth)
      .then(() => {
        console.log("// Sign-out successful.");
        // setUser(false);
        setId(null);
        router.push("/registration");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    check();
    dispatch(fetchDoctors());
    // checking();
  }, [checkAdmin]);
  return (
    <div className="header">
      {/* <div className="left-side-header">
        <FaHandHoldingMedical className="left-child-left-side-header" />
        <div className="right-child-left-side-header">
          <h1>MyHealth</h1>
          <span>Medical assistant</span>
        </div>
      </div> */}
      {/* <Image alt="" src={"/1600w-aya2Z3L1jTU.webp"} height={100} width={100}/>
       */}
      <Link href={"/"}>
        <div className="left-side-header">
          <div className="first-child-left-side-header p-2 rounded-xl border-2">
            <LuCross className="icon" strokeWidth={1} />
          </div>
          <h1 className="second-child-left-side-header font-semibold text-gray-900 tracking-tight">
            HealthTech
          </h1>
          <p className="third-child-left-side-header font-medium">
            MEDICAL SOLUTIONS
          </p>
        </div>
      </Link>
      <div className="middle-side-header">
        <Link href={"/"}>
          <p className={`${pathname === "/" ? "selected" : ""}`}>
            Biz Haqimizda
          </p>
        </Link>
        <Link href={"/doctors"}>
          <p className={`${pathname === "/doctors" ? "selected" : ""}`}>
            Top Doktorlar
          </p>
        </Link>
        <Link href={"/news"}>
          <p className={`${pathname === "/news" ? "selected" : ""}`}>
            So'ngi xabarlar
          </p>
        </Link>
        <Link href={"/hospitals"}>
          <p className={`${pathname === "/hospitals" ? "selected" : ""}`}>
            Xalqaro Shifoxonalar
          </p>
        </Link>
      </div>
      <div className="right-side-header">
        <div className="dropdown-wrapper">
          <Menu as="div" className="dropdown relative inline-block">
            <MenuButton className="life inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3! py-2! text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
              Sahifalar
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1 life">
                <MenuItem>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Biz Haqimizda
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/doctors"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Top Doktorlar
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/news"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Xabarlar
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/hospitals"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Xalqaro Shifonalar
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        {checkAdmin === "farid@gmail.com" ? (
          <button
            onClick={() => router.push("/admin/consultations")}
            className="kirish-button"
          >
            Admin
          </button>
        ) : checkAdmin === "doctor" ? (
          <button
            onClick={() => router.push("/admin/consultations")}
            className="kirish-button"
          >
            My Profile
          </button>
        ) : checkAdmin !== "" ? (
          <button onClick={logout} className="kirish-button">
            Chiqish
          </button>
        ) : (
          <button
            onClick={() => router.push("/registration")}
            className="kirish-button"
          >
            Kirish
          </button>
        )}
        {/* {checkAdmin === "farid@gmail.com" ? (
          <button
            onClick={() => router.push("/admin/consultations")}
            className="kirish-button"
          >
            Admin
          </button>
        ) : (
          <>
            {id === null ? (
              <button
                onClick={() => router.push("/registration")}
                className="kirish-button"
              >
                Kirish
              </button>
            ) : (
              <button onClick={logout} className="kirish-button">
                Chiqish
              </button>
            )}
          </>
        )} */}
        {/* {checkAdmin === "admin" ? (
          <>
            <button
              onClick={() => router.push("/admin/consultations")}
              className="kirish-button"
            >
              Admin
            </button>
          </>
        ) : checkAdmin === "user" ? (
          <>
            <button onClick={logout} className="kirish-button">
              Chiqish
            </button>
          </>
        ) : (
          <button onClick={logout} className="kirish-button">
            Panel
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Header;
