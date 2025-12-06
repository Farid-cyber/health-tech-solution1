"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import { Doctor } from "@/app/type";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { addDoctor, fetchDoctors } from "@/app/redux/slices/doctors";

const Doctors = () => {
  const { doctors } = useAppSelector((state) => state.doctors);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [doctor, setDoctor] = useState<Doctor>({
    fullname: "",
    phonenumber: "",
    telegramUserName: "",
    email: "",
    degree: "",
    job: "",
    jobdescription: "",
    workinghours: "",
    imageUrl: "",
  });

  // console.log(doctors);

  const handleSave = async () => {
    if (
      doctor.degree === "" ||
      doctor.email === "" ||
      doctor.fullname === "" ||
      doctor.job === "" ||
      !imageFile
    ) {
      toast.error("Formani to'liq to'ldiring");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const doctorObject: Doctor = {
        ...doctor,
        imageUrl: base64Image,
      };
      console.log(doctorObject);
      // addDoctor(doctorObject);
      dispatch(addDoctor(doctorObject));
      toast.success("Doctor qo'shildi!");
      setOpen(false);
    };
    reader.readAsDataURL(imageFile);
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, []);

  return (
    <div className="doctors-page-wrapper">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="button-wrapper">
        <button onClick={() => setOpen(true)}>Add Doctor</button>
      </div>
      <div
        style={{ padding: "10px" }}
        className="life overflow-x-auto bg-neutral-primary-soft shadow-xs rounded m-4 border border-default p-10"
      >
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6! py-3 font-medium">
                Picture
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Fullname
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Phonenumber
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Telegram Username
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Degree
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Job
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Job Description
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Working hours
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((c) => (
              <tr className="bg-neutral-primary border-b border-default gap-10">
                <th
                  // scope="row"
                  className="px!-6 py-4!"
                >
                  <img width={100} src={c.imageUrl} alt="" />
                </th>
                <td className="px-6! py-4 ml-5!">{c.fullname}</td>
                <td className="px-6! py-4">{c.phonenumber}</td>
                <td className="px-6 py-4">{c.telegramUserName}</td>
                <td className="px-6 py-4">{c.email}</td>
                <td className="px-6 py-4">{c.degree}</td>
                <td className="px-6 py-4">{c.job}</td>
                <td className="px-6 py-4">{c.jobdescription}</td>
                <td className="px-6 py-4">{c.workinghours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Rodal
        className="rodal"
        visible={open}
        onClose={() => {
          setOpen(false),
            setDoctor({
              fullname: "",
              phonenumber: "",
              telegramUserName: "",
              email: "",
              degree: "",
              job: "",
              jobdescription: "",
              workinghours: "",
              imageUrl: "",
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
          <p>Mahsulot kiriting</p>
          {/* <form onSubmit={(e) => handleSave(e)}> */}
          <div className="rodal-inside"></div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="fullname">Fullname</label>
            <input
              className="form-control mt-2"
              type="text"
              name="fullname"
              id="title"
              placeholder="Falonchayev Falonchi..."
              value={doctor.fullname}
              onChange={(e) =>
                setDoctor({ ...doctor, fullname: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="image">Image of Doctor</label>
            <input
              className="form-control mt-2"
              type="file"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
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
                value={doctor.email}
                onChange={(e) =>
                  setDoctor({ ...doctor, email: e.target.value })
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
                value={doctor.phonenumber}
                onChange={(e) =>
                  setDoctor({ ...doctor, phonenumber: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="username">Telegram Username</label>
            <input
              className="form-control mt-2"
              type="text"
              name="username..."
              id="username"
              placeholder="Telegram Username..."
              value={doctor.telegramUserName}
              onChange={(e) =>
                setDoctor({ ...doctor, telegramUserName: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="job">Job title</label>
            <input
              className="form-control mt-2"
              type="text"
              name="job..."
              id="job"
              placeholder="Job title..."
              value={doctor.job}
              onChange={(e) => setDoctor({ ...doctor, job: e.target.value })}
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="description">Job description</label>
            <input
              className="form-control mt-2"
              type="text"
              name="description..."
              id="description"
              placeholder="Telegram Username..."
              value={doctor.jobdescription}
              onChange={(e) =>
                setDoctor({ ...doctor, jobdescription: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="degree">Degree</label>
            <input
              className="form-control mt-2"
              type="text"
              name="degree..."
              id="degree"
              placeholder="Degree..."
              value={doctor.degree}
              onChange={(e) => setDoctor({ ...doctor, degree: e.target.value })}
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="working">Working Hours</label>
            <input
              className="form-control mt-2"
              type="text"
              name="working..."
              id="working"
              placeholder="9PM-18PM..."
              value={doctor.workinghours}
              onChange={(e) =>
                setDoctor({ ...doctor, workinghours: e.target.value })
              }
            />
          </div>
          <button
            onClick={handleSave}
            className="comment-button btn adding-image w-full btn-primary mt-1"
          >
            Save
          </button>
          {/* </form> */}
        </div>
      </Rodal>
    </div>
  );
};

export default Doctors;
