"use client";
import { useEffect, useState } from "react";
import "./page.scss";
// import { Hos, Hospitalpital } from "@/app/type";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
// import { fetchDoctors } from "@/app/redux/slices/doctors";
import { Hospital } from "@/app/type";
import {
  addHospital,
  deleteHospital,
  fetchHospitals,
  setEditingHos,
  updateHospital,
} from "@/app/redux/slices/hospital";

const Doctors = () => {
  const { hospitals, isEditingId } = useAppSelector((state) => state.hospitals);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hospital, setHospital] = useState<Hospital>({
    name: "",
    shahar: "",
    manzil: "",
    telefon: "",
    turi: "",
    rasm: "",
    joylashuv: "",
    ish_vaqti: "",
  });

  // console.log(doctors);

  const handleSave = async () => {
    if (
      // hospital.degree === "" ||
      !imageFile
    ) {
      toast.error("Formani to'liq to'ldiring");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      const doctorObject: Hospital = {
        ...hospital,
        rasm: base64Image,
      };
      console.log(doctorObject);
      if (isEditingId === null) {
        dispatch(addHospital(doctorObject));
      } else {
        const { id, ...userObj } = doctorObject; // Remove id from object
        if (!id) {
          return;
        }
        dispatch(updateHospital({ id, userObj }));
        dispatch(setEditingHos(null));
      }
      // addDoctor(doctorObject);

      toast.success("Hospital qo'shildi!");
      setOpen(false);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleEdit = (hospital: Hospital) => {
    console.log(hospital);

    dispatch(setEditingHos(hospital)); // use dispatch here for Redux
    setHospital(hospital); // local state for form
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchHospitals());
  }, []);

  return (
    <div className="doctors-page-wrapper">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="button2-wrapper">
        <button onClick={() => setOpen(true)}>Add Hospital</button>
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
                Name
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Phonenumber
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Location
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Working hours
              </th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((c) => (
              <tr className="bg-neutral-primary border-b border-default gap-10">
                <th
                  // scope="row"
                  className="px!-6 py-4!"
                >
                  {/* <img width={100} src={c.imageUrl} alt="" /> */}
                </th>
                <td className="px-6! py-4 ml-5!">{c.id}</td>
                <td className="px-6! py-4 ml-5!">{c.name}</td>
                {/* <td className="px-6! py-4">{c.phonenumber}</td> */}
                {/* <td className="px-6 py-4">{c.telegramUserName}</td> */}
                {/* <td className="px-6 py-4">{c.email}</td> */}
                {/* <td className="px-6 py-4">{c.degree}</td> */}
                {/* <td className="px-6 py-4">{c.location}</td>/ */}
                {/* <td className="px-6 py-4">{c.workinghours}</td> */}
                <td>
                  <button
                    onClick={() => dispatch(deleteHospital(c.id!))}
                    className="bg-black p-2 rounded text-white"
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-black p-2 rounded"
                  >
                    Edit
                  </button>
                </td>
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
            setHospital({
              name: "",
              shahar: "",
              manzil: "",
              telefon: "",
              turi: "",
              rasm: "",
              joylashuv: "",
              ish_vaqti: "",
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
            <label htmlFor="name">Name</label>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              id="title"
              placeholder="Name..."
              value={hospital.name}
              onChange={(e) =>
                setHospital({ ...hospital, name: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="image">Image of Hospital</label>
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
              <label htmlFor="email">Turi</label>
              <input
                className="form-control mt-2"
                type="email"
                name="email..."
                id="email"
                placeholder="Email..."
                value={hospital.turi}
                onChange={(e) =>
                  setHospital({ ...hospital, turi: e.target.value })
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
                value={hospital.telefon}
                onChange={(e) =>
                  setHospital({ ...hospital, telefon: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="working">Working Hours</label>
            <input
              className="form-control mt-2"
              type="text"
              name="working..."
              id="working"
              placeholder="9PM-18PM..."
              value={hospital.ish_vaqti}
              onChange={(e) =>
                setHospital({ ...hospital, ish_vaqti: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="location">Location</label>
            <input
              className="form-control mt-2"
              type="text"
              name="location..."
              id="location"
              placeholder="Location.."
              value={hospital.manzil}
              onChange={(e) =>
                setHospital({ ...hospital, manzil: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="city">City</label>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              id="city"
              placeholder="shahar..."
              value={hospital.shahar}
              onChange={(e) =>
                setHospital({ ...hospital, shahar: e.target.value })
              }
            />
          </div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="location">Joylashuv</label>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              id="location"
              placeholder="Joylashv..."
              value={hospital.joylashuv}
              onChange={(e) =>
                setHospital({ ...hospital, joylashuv: e.target.value })
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

export default Doctors;
