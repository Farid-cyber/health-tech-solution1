"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./page.scss";
import {
  fetchDoctors,
  fetchDoctorsByJobName,
  fetchDoctorsByName,
  setdoctorName,
  setjobName,
} from "../redux/slices/doctors";
import { FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const DoctorsPage = () => {
  const { doctors, doctorName, jobName } = useAppSelector(
    (state) => state.doctors
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  useEffect(() => {
    dispatch(fetchDoctorsByName(doctorName));
  }, [doctorName]);

  useEffect(() => {
    dispatch(fetchDoctorsByJobName(jobName));
  }, [jobName]);

  return (
    <div className="doctor-page">
      <div className="wrapper-of-buttons">
        <p>Doktorlar nomlari bo'yicha qidirish</p>
        <input
          onChange={(e) => dispatch(setdoctorName(e.target.value))}
          value={doctorName}
          type="text"
          placeholder="Doktorlar nomlari bo'yicha qidirish..."
        />
        <p>Kasblar bo'yicha qidirish</p>
        <input
          onChange={(e) => dispatch(setjobName(e.target.value))}
          value={jobName}
          type="text"
          placeholder="Kasblar bo'yicha qidirish..."
        />
      </div>
      <h1 className="first-child">Bizning ekspert jamoamiz</h1>
      <p className="second-child">
        Keng jamoa bilan ishlash harqdan kassalikka davo topish demadir. Bizing
        jamoamiz 100 bemorlarga davolanish uchun yordam bergan
      </p>
      <div className="card-wrapper">
        {doctors.map((c) => (
          <div className="card shadow-md">
            <div className="image-wrapper">
              <img width={100} className="image" src={c.imageUrl} alt="" />
              <div>
                <h2>Dr {c.fullname}</h2>
                <h4>{c.job}</h4>
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
