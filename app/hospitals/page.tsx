"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./page.scss";
import { fetchHospitals } from "../redux/slices/hospital";

const HospitalPage = () => {
  const { hospitals } = useAppSelector((state) => state.hospitals);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHospitals());
  }, []);
  return (
    <div className="hospitals-wrapper">
      <div className="hospitals">
        {hospitals.map((c) => (
          <div className="hospital shadow-md">
            <img src={c.imageUrl} alt="" />
            <div className="second-child">
              <h1>Nomi: {c.name}</h1>
              <h2>Telefon raqam: {c.phonenumber}</h2>
              <h3>Manzili: {c.location}</h3>
              <h4>Pochta manzili: {c.email}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalPage;
