"use client";
import Link from "next/link";
import "./firstchild.scss";
// import Image from "next/image";

const FirstChild = () => {
  return (
    <div className="firstChild">
      <div className="left-child">
        <h1>Uyigizni tark etmasdan, davolaning</h1>
        <p>
          Xalqaro diplomga ega shifokorlar bilan o'z kasaligingizni davolang. V,
          shu bilan birga, bepul konsultatsiyalrni qo'lga kiriting
        </p>
        <Link href={"/consultations"}>
          <button className="cursor-pointer">Bepul Konsultatsiyalar</button>
        </Link>
        <div className="last-child-left-child w-full">
          <div className="b">
            <h4>
              10<span>+</span>
            </h4>
            <h5>Xalqaro Doktorlar</h5>
          </div>
          <div className="b">
            <h4>
              2,000<span>+</span>
            </h4>
            <h5>Mijozlar</h5>
          </div>
          <div>
            <h4>
              500<span>+</span>
            </h4>
            <h5>Baxtli mijozlar</h5>
          </div>
        </div>
      </div>
      <div className="right-child">
        <img
          alt="rasm"
          src={"/doctor.webp"}
          width={1000}
          height={100}
        />
      </div>
    </div>
  );
};

export default FirstChild;
