"use client";
import "rodal/lib/rodal.css";
import { useEffect, useState } from "react";
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
import Rodal from "rodal";
import { Order } from "../type";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.con";

const DoctorsPage = () => {
  const [open, setOpen] = useState(false);
  const [consultation, setConsultation] = useState<Order>({
    contactType: "",
    doctorEmail: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    problemDescription: "",
    problemType: "",
    telegramUsername: "",
    type: false,
  });
  const [doctorEmail, setDoctorEmail] = useState<string | null>(null);
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

  const handleOrder1 = (value: string) => {
    setOpen(true);
    setDoctorEmail(value);
    setConsultation({ ...consultation, type: false });
  };

  useEffect(() => {}, [doctorEmail]);

  const handleSave = async () => {
    const orderObj = {
      ...consultation,
      doctorEmail: doctorEmail,
    };
    try {
      await addDoc(collection(db, "orders"), orderObj);
      setOpen(false);
      setDoctorEmail(null);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

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
              <button onClick={() => handleOrder1(c.email)}>
                Consultatsiyaga yozilish
              </button>
            </div>
          </div>
        ))}
      </div>
      <Rodal
        className="rodal"
        visible={open}
        onClose={() => {
          setOpen(false),
            setConsultation({
              contactType: "",
              doctorEmail: "",
              fullname: "",
              email: "",
              phoneNumber: "",
              problemDescription: "",
              problemType: "",
              telegramUsername: "",
              type: false,
            });
        }}
        customStyles={{
          width: "350px",
          height: "auto",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        <div className="mt-4 rodal-body-scroll">
          <p>Shifoxona nomini kiriting</p>
          <div className="rodal-inside"></div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="name">To'liq ism</label>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              id="title"
              placeholder="To'liq ism..."
              value={consultation.fullname}
              onChange={(e) =>
                setConsultation({ ...consultation, fullname: e.target.value })
              }
            />
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex flex-col gap-2 rodal-inside">
              <label htmlFor="email">Email</label>
              <input
                className="form-control mt-2"
                type="email"
                name="email..."
                id="email"
                placeholder="Email..."
                value={consultation.email}
                onChange={(e) =>
                  setConsultation({ ...consultation, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 rodal-inside">
              <label htmlFor="number">Phone Number</label>
              <input
                className="form-control mt-2"
                type="text"
                name="number..."
                id="number"
                placeholder="Phone Number..."
                value={consultation.phoneNumber}
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="Telegram">Telegram</label>
            <input
              className="form-control mt-2"
              type="text"
              name="Telegram..."
              id="Telegram"
              placeholder="Telegram..."
              value={consultation.telegramUsername}
              onChange={(e) =>
                setConsultation({
                  ...consultation,
                  telegramUsername: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="contacttype">Bog'lanish turini tanlang</label>
            <select
              onChange={(e) =>
                setConsultation({
                  ...consultation,
                  contactType: e.target.value,
                })
              }
              value={consultation.contactType}
              id="contacttype"
            >
              <option value="" disabled>Tanlang</option>
              <option value="uyali qo'g'iroq">Uyali qo'g'iroq</option>
              <option value="telegram">Telegram orqali</option>
              <option value="email">Zoom orqali</option>
            </select>
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="working">Muammo turi</label>
            <input
              className="form-control mt-2"
              type="text"
              name="working..."
              id="working"
              placeholder="Muammo turi..."
              value={consultation.problemType}
              onChange={(e) =>
                setConsultation({
                  ...consultation,
                  problemType: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="location">Muammo tavfisifi</label>
            <input
              className="form-control mt-2"
              type="text"
              name="location..."
              id="location"
              placeholder="Muammo tavfisifi.."
              value={consultation.problemDescription}
              onChange={(e) =>
                setConsultation({
                  ...consultation,
                  problemDescription: e.target.value,
                })
              }
            />
          </div>
          <button
            onClick={handleSave}
            className="comment-button btn adding-image w-full btn-primary mt-1"
          >
            Save
          </button>
        </div>
      </Rodal>
    </div>
  );
};

export default DoctorsPage;
