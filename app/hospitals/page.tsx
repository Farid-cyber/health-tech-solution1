"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./page.scss";
import {
  fetchHospitals,
  fetchHospitalsByCity,
  fetchHospitalsByTitle,
  setCityName,
  setProtitle,
} from "../redux/slices/hospital";

const HospitalPage = () => {
  const { hospitals, hospitalname, cityName } = useAppSelector(
    (state) => state.hospitals
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHospitals());
  }, []);

  useEffect(() => {
    dispatch(fetchHospitalsByTitle(hospitalname));
  }, [hospitalname]);

  useEffect(() => {
    dispatch(fetchHospitalsByCity(cityName));
  }, [cityName]);

  // console.log(hospitals);

  // console.log(hospitals);
  return (
    <div className="hospitals-wrapper">
      <div className="wrapper-of-buttons">
        <p>Kasalxona nomi bo'yicha qidirish</p>
        <input
          onChange={(e) => dispatch(setProtitle(e.target.value))}
          value={hospitalname}
          type="text"
          placeholder="Kasalxona nomi bo'yicha qidirish..."
        />
        <p>Shaharlar bo'yicha qidirish</p>
        <select
          value={cityName}
          onChange={(e) => dispatch(setCityName(e.target.value))}
        >
          <option selected value="">All</option>
          <option value="Toshkent">Toshkent</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Farg'ona">Farg'ona</option>
          <option value="Andijon">Andijon</option>
          <option value="Namangan">Namangan</option>
          <option value="Qarshi">Qarshi</option>
          <option value="Nukus">Nukus</option>
        </select>
      </div>
      <div className="hospitals">
        {hospitals.map((c) => (
          <div className="hospital shadow-md">
            <img src={c.rasm} alt="" />
            <div className="second-child">
              <h1>Nomi: {c.name}</h1>
              <h2>Telefon raqam: {c.telefon}</h2>
              <h3>Manzili: {c.joylashuv}</h3>
              <h4>Ish vaqti: {c.ish_vaqti}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalPage;
