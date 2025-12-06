"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./page.scss";
import { fetchDoctors } from "../redux/slices/doctors";
import { FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const DoctorsPage = () => {
  const { doctors } = useAppSelector((state) => state.doctors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);
  return (
    <div className="doctor-page">
      <h1>Bizning ekspert jamoamiz</h1>
      <p>
        Keng jamoa bilan ishlash harqdan kassalikka davo topish demadir. Bizing
        jamoamiz 100 bemorlarga davolanish uchun yordam bergan
      </p>
      <div className="card-wrapper">
        {doctors.map((c) => (
          <div className="card shadow-md">
            <div className="image-wrapper">
              <img width={100} className="image" src={c.imageUrl} alt="" />
              <div>
                <h2 >Dr {c.fullname}</h2>
                <h4 >{c.job}</h4>
              </div>
            </div>
            <div className="button-wrapper">
              <button>Consultatsiyaga yozilish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
