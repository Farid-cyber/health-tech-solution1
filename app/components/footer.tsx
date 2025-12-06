import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <hr className="hr" />
      <div className="hero5">
        <div className="child1-hero5">
          <h1>Axborot markazi</h1>
          <ul>
            <li>Biz haqimizda</li>
            <li>Sharhlar</li>
            <li>Hamkorlar uchun</li>
          </ul>
        </div>
        <div className="child1-hero5">
          <h1>Mahsulotlar</h1>
          <ul>
            <li>Shengen uchun sug'urta</li>
            <li>Rossiya uchun sug'urta</li>
            <li>Mamlakatlarga sug'urta</li>
            <li>Chang'i sug'urtasi</li>
            <li>Yillik sug'urta</li>
          </ul>
        </div>
        <div className="child1-hero5">
          <h1>Hujjatlar</h1>
          <ul>
            <li>Foydalanuvchi shartnomasi</li>
            <li>Ma'lumotlarni qayta ishlash siyosati</li>
            <li>Axborot xavfsizligi siyosati</li>
          </ul>
        </div>
        <img className="image-hero5" src="/Group 17 (1).svg" alt="" />
      </div>
    </footer>
  );
};

export default Footer;
