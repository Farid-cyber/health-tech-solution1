"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.auth/firebaseauth.con";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [emailadress, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEnter = () => {
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    signInWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid === "") {
          toast.error("Siz ro'yxatdan o'tmagansiz.");
          return;
        } else {
          toast.success("Siz muvaffaqiyatli kirdingiz");
          if (user.email === "farid@gmail.com") {
            router.push("/admin/consultations");
          } else {
            router.push("/");
            console.log(user.uid);
          }
        }
      })
      .catch((error) => {
        console.log(error.toString());
        if (
          error.toString() ===
          "FirebaseError: Firebase: Error (auth/invalid-credential)."
        ) {
          toast.error(`${error}`);
        }
      });
  };

  const handleSave = () => {
    if (emailadress === "" || password === "") {
      toast.error("Formani to'liq to'ldiring.");
      return;
    }

    if (password.length < 8) {
      toast.error("Parol 8 ta harf yoki raqamdan katta bo'lishi kerak!");
      return;
    }
    createUserWithEmailAndPassword(auth, emailadress, password)
      .then((userCredential) => {
        toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");
        const user = userCredential.user;
        console.log(user.displayName);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`);
      });
  };

  return (
    <div className="register">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {open === false ? (
        <div className="register-card">
          <h3>Akkauntga kirish</h3>
          <div className="input-wrapper addition">
            <label className="cursor-pointer" htmlFor="email">
              Iltimos email kiriting
            </label>
            <input
              id="email"
              placeholder="email@gmail.com"
              type="text"
              className="input"
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper addition">
            <label className="cursor-pointer" htmlFor="password">
              Iltimos parolni kiriting
            </label>
            <input
              id="password"
              placeholder="........."
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h1 onClick={() => setOpen(true)}>
            Akkauntingiz yo'qmi? <span>Ro'yxatdan o'ting</span>
          </h1>
          <button
            onClick={handleEnter}
            className="register-button cursor-pointer"
          >
            Sahifaga kirish
          </button>
        </div>
      ) : (
        <div className="register-card">
          <h3>Ro'yxatdan o'tish</h3>
          <div className="input-wrapper addition">
            <label className="cursor-pointer" htmlFor="email">
              Iltimos email kiriting
            </label>
            <input
              id="email"
              placeholder="email@gmail.com"
              type="text"
              className="input"
              value={emailadress}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper addition">
            <label className="cursor-pointer" htmlFor="password">
              Iltimos parolni kiriting
            </label>
            <input
              id="password"
              placeholder="........."
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h1 onClick={() => setOpen(false)}>Akkauntga kirish</h1>
          <button
            onClick={handleSave}
            className="register-button cursor-pointer"
          >
            Ro'yxatdan o'tish
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
