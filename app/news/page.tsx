"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./page.scss";
import { fetchXabarlar } from "../redux/slices/news";
import { fetchOxirgiXabarlar } from "../redux/slices/latest.news";

const ConsultationPage = () => {
  const { xabarlar } = useAppSelector((state) => state.xabarlar);
  const { oxirgixabarlar } = useAppSelector((state) => state.oxirgixabarlar);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchXabarlar());
    dispatch(fetchOxirgiXabarlar());
  }, []);

  // console.log(xabarlar);

  return (
    <div className="news-wrapper">
      <h1>Sog‘lom hayot yangiliklari</h1>
      <div className="w-full flex flex-wrap gap-3">
        <div className="wrapper">
          {xabarlar.map((c) => (
            <div className="new">
              <img src={c.imageUrl} alt="" />
              <p>{c.createdAt}</p>
              <h2 className="line-clamp-2">{c.title}</h2>
            </div>
          ))}
        </div>
        <div className="wrapper-2">
          {oxirgixabarlar.map((c) => (
            <div className="latest-new">
              <h4 className="line-clamp-2">{c.title}</h4>
              <h6 className="line-clamp-1">{c.description}</h6>
              <h5>{c.createdAt}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
