"use client";
import { useEffect } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.auth/firebaseauth.con";
import { useRouter } from "next/navigation";
import store from "./redux/store";
import { Provider } from "react-redux";
// import "./global.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const check = () => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user && location.pathname.startsWith("/admin")) {
        const uid = user.uid;
        console.log(uid);
        if (user.email !== "farid@gmail.com") {
          router.push("/");
        }
      } else if (location.pathname.startsWith("/admin")) {
        router.push("/");
      }
    });
  };

  useEffect(() => {
    check();
  }, []);

  // const life = 5;
  return (
    <div className="flex flex-col">
      <Provider store={store}>
        <Header />
        <div className="main w-full">
          <html lang="en">
            <body>{children}</body>
          </html>
        </div>
        <Footer />
      </Provider>
    </div>
  );
}
