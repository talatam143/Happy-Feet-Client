import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination,Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import "./Banner.css";
import roadster1 from "../../images/banner images/roadster1.png";
import kiana from "../../images/banner images/kiana.png";
import adidas from "../../images/banner images/adidas.png";
import hrx from "../../images/banner images/hrx.png";
import harbour from "../../images/banner images/harbour.png";
import uspa from "../../images/banner images/uspa.png";
import hereNow from "../../images/banner images/hereNow.png";

const bannerList = [
  {
    imageSrc: adidas,
    classId: "bannerEachContainer1",
    height: "100%",
    brandName: "ADIDAS",
    navigateLink: "/products/6338baba2a0bc1bb89e1e879",
    para: "GET YOURSELF COMFORT WITH NEW PRODUCT BY ADIDAS",
    color: "#4e4376",
  },
  {
    imageSrc: kiana,
    classId: "bannerEachContainer2",
    height: "100%",
    brandName: "KIANA",
    navigateLink: "/products/6338c0f02a0bc1bb89e1e90e",
    para: "SLAY IN FLATS LIKE A QUEEN",
    color: "#203a43",
  },
  {
    imageSrc: harbour,
    classId: "bannerEachContainer3",
    height: "105%",
    brandName: "MAST & HARBOUR",
    navigateLink: "/products/6338b9452a0bc1bb89e1e85c",
    para: "YOU CANNOT TURN YOUR HEAD WITH THIS COLOR",
    color: "black",
  },
  {
    imageSrc: roadster1,
    classId: "bannerEachContainer4",
    height: "100%",
    brandName: "ROADSTER",
    navigateLink: "/products?brand=Roadster",
    para: "MOST SOLD BRAND EVER",
    color: "#302b63",
  },
  {
    imageSrc: hrx,
    classId: "bannerEachContainer5",
    height: "200px",
    brandName: "HRX",
    navigateLink: "/products?brand=HRX%2520by%2520Hrithik%2520Roshan",
    para: "IF STYLE HAS A FACE, IT WILL ONLY BE THESE",
    color: "#333333",
  },
  {
    imageSrc: uspa,
    classId: "bannerEachContainer6",
    height: "100%",
    brandName: "U.S.P.A",
    navigateLink: "/products?brand=U.S.%2520Polo%2520Assn.",
    para: "GET PRODUCTS FROM TOP CLASS BRAND",
    color: "#83a4d4",
  },
  {
    imageSrc: hereNow,
    classId: "bannerEachContainer7",
    height: "100%",
    brandName: "HERE & NOW",
    navigateLink: "/products/6338bebc2a0bc1bb89e1e8db",
    para: "STYLE THAT YOU WILL FELL IN LOVE",
    color: "#1d2b64",
  },
];

function Banners() {
  const navigate = useNavigate();

  return (
    <div className="bannerContainer">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[Autoplay,EffectCreative, Pagination]}
        className="myBannerSwiper"
      >
        {bannerList.map((eachBanner) => (
          <SwiperSlide key={eachBanner.imageSrc}>
            <div
              className={`eachBannerParentStye ${eachBanner.classId}`}
              onClick={() => navigate(eachBanner.navigateLink)}
            >
              <img
                src={eachBanner.imageSrc}
                alt="banner-logo"
                width={130}
                height={eachBanner.height}
              />
              <div className="eachBannerParaContainer">
                <p className="eachBannerPara">{eachBanner.para}</p>
                <p
                  className="eachBannerBrandPara"
                  style={{ color: eachBanner.color }}
                >
                  {eachBanner.brandName}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banners;
