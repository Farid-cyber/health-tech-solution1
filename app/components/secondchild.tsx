import Image from "next/image";
import "./secondchild.scss";

const SecondChild = () => {
  return (
    <div className="secondChild">
      <h4>Sizga qanday yordamimiz tegishi mumkin</h4>
      <div className="hero1">
        <div className="child1-hero1">
          <div className="left-child1-hero1">
            <h1>Koronavirusni davolash</h1>
            <p>
              Barcha siyosatlarimiz COVID-19 holatida davolash va diagnostikani
              qamrab oladi, chunki hamma mamlakatlar ham koronavirusni davolash
              uchun pul to‘lashga tayyor emas. Tibbiy xarajatlarning maksimal
              qoplanishi 100 000 USD/EUR. Siyosat, shuningdek, agar
              sug'urtalangan shaxs COVID-19 bilan shartnoma tuzsa, sayohatni
              bekor qilish xavfi uchun kompensatsiyani ham nazarda tutadi.
            </p>
          </div>
          <div className="right-child1-hero1">
            <img className="medicine12" src="/online-doctor.svg" alt="" />
          </div>
        </div>
        <div className="child1-hero1 addition">
          <div className="left-child1-hero1">
            <h1>Surunkali kasalliklarning birinchi yordam</h1>
            <p>
              Hozir hattoki 30 yoshdan kichik bo‘lgan odamlarda ham vaqti-vaqti
              bilan o‘zini eslatib turadigan surunkali kasalliklar bor.
              Qolaversa, keksalar haqida gapirmasa ham bo‘ladi — ular uchun
              surunkali kasalliklarning kuchayishi vaqtida yordam ayniqsa muhim.
              Shuning uchun biz surunkali kasalliklar kuchayishini bartaraf
              etish bo‘yicha bozordagi eng katta qoplamalardan birini taklif
              qilamiz — 3 000 dollargacha.
            </p>
          </div>
          <div className="right-child1-hero1">
            <img className="medicine" src="/Medicine-amico.svg" alt="" />
          </div>
        </div>
        <div className="child1-hero1">
          <div className="left-child1-hero1">
            <h1>Doktor onlayn 24/7</h1>
            <p>
              Hozir hattoki 30 yoshdan kichik bo‘lgan odamlarda ham vaqti-vaqti
              bilan o‘zini eslatib turadigan surunkali kasalliklar mavjud.
              Qolaversa, keksalar haqida gapirmasa ham bo‘ladi — ular uchun
              surunkali kasalliklar kuchayganida yordam ayniqsa muhim. Shu
              sababli biz surunkali kasalliklarning kuchayishini bartaraf etish
              bo‘yicha bozordagi eng katta qoplamalardan birini taklif qilamiz —
              3 000 dollargacha.
            </p>
          </div>
          <div className="right-child1-hero1">
            <img className="medicine12" src="/Doctors-pana.svg" alt="" />
          </div>
        </div>
        <div className="child1-hero1 addition">
          <div className="left-child1-hero1">
            <h1>Surunkali kasalliklar kuchayganda yordam</h1>
            <p>
              2-turdagi diabet va semizlik kabi surunkali kasalliklarning o‘n
              yillardan beri ortib borayotganligining ko‘pgina sabablari mavjud.
              Ayrimlari irqiy omillar va odamlarning uzoqroq yashayotganlaridan
              iborat oddiy haqiqat kabi oldini olib bo‘lmaydigan xatar omillari
              tufaylidir.
            </p>
          </div>
          <div className="right-child1-hero1">
            <Image
              width={100}
              height={100}
              className="medicine"
              src="/person-mask.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondChild;
