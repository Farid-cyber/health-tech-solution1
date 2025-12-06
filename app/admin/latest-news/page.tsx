"use client";
import { useEffect, useState } from "react";
import "./page.scss";
// import { Hos, Hospitalpital } from "@/app/type";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
// import { fetchDoctors } from "@/app/redux/slices/doctors";
// import { OxirgiXabar } from "@/app/type";
// import { addHospital, fetchXabarlar } from "@/app/redux/slices/xabar";
import { fetchXabarlar, addNew } from "@/app/redux/slices/news";
import { OxirgiXabar } from "@/app/type";
import {
  addNewXabar,
  fetchOxirgiXabarlar,
} from "@/app/redux/slices/latest.news";

const Doctors = () => {
  const { oxirgixabarlar } = useAppSelector((state) => state.oxirgixabarlar);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  //   const [imageFile, setImageFile] = useState<File | null>(null);
  const [xabar, setXabar] = useState<OxirgiXabar>({
    author: "",
    title: "",
    description: "",
    createdAt: "",
    // imageUrl: "",
  });

  // console.log(doctors);

  const handleSave = async () => {
    if (
      // xabar.degree === "" ||
      xabar.author === "" ||
      xabar.description === "" ||
      xabar.title === ""
      //   !imageFile
    ) {
      toast.error("Formani to'liq to'ldiring");
      return;
    }
    const reader = new FileReader();
    const base64Image = reader.result as string;
    const doctorObject: OxirgiXabar = {
      ...xabar,
      // imageUrl: base64Image,
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    console.log(doctorObject);
    dispatch(addNewXabar(doctorObject));
    toast.success("OxirgiXabar qo'shildi!");
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchOxirgiXabarlar());
  }, []);

  return (
    <div className="doctors-page-wrapper">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="button2-wrapper">
        <button onClick={() => setOpen(true)}>Add OxirgiXabar</button>
      </div>
      <div
        style={{ padding: "10px" }}
        className="life overflow-x-auto bg-neutral-primary-soft shadow-xs rounded m-4 border border-default p-10"
      >
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6! py-3 font-medium">
                Title
              </th>
              <th scope="col" className="w-[50px]! px-6! py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                CreatedAt
              </th>
              <th scope="col" className="px-6! py-3 font-medium">
                Auhtor
              </th>
            </tr>
          </thead>
          <tbody>
            {oxirgixabarlar.map((c) => (
              <tr className="bg-neutral-primary border-b border-default gap-10">
                <td className="px-6! py-4 ml-5!">{c.title}</td>
                <td className="px-6! py-4 line-clamp-1">{c.description}</td>
                {/* <td className="px-6 py-4">{c.telegramUserName}</td> */}
                <td className="px-6 py-4">{c.createdAt}</td>
                {/* <td className="px-6 py-4">{c.degree}</td> */}
                <td className="px-6 py-4">{c.author}</td>
                {/* <td className="px-6 py-4">{c.workinghours}</td> */}
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
            setXabar({
              author: "",
              title: "",
              description: "",
              createdAt: "",
              //   imageUrl: "",
            });
        }}
        customStyles={{
          width: "350px",
          height: "max-content",
          //   maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        <div className="mt-4 rodal-body-scroll">
          <p>Shifoxona nomini kiriting</p>
          <div className="rodal-inside"></div>
          <div className="mt-2 rodal-inside">
            <label htmlFor="name">Title</label>
            <input
              className="form-control mt-2"
              type="text"
              name="name"
              id="title"
              placeholder="Title..."
              value={xabar.title}
              onChange={(e) => setXabar({ ...xabar, title: e.target.value })}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex flex-col gap-2 rodal-inside">
              <label htmlFor="email">Description</label>
              <input
                className="form-control mt-2"
                type="email"
                name="email..."
                id="email"
                placeholder="Description..."
                value={xabar.description}
                onChange={(e) =>
                  setXabar({ ...xabar, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 rodal-inside">
              <label htmlFor="number">Author</label>
              <input
                className="form-control mt-2"
                type="text"
                name="number..."
                id="number"
                placeholder="Author..."
                value={xabar.author}
                onChange={(e) => setXabar({ ...xabar, author: e.target.value })}
              />
            </div>
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
