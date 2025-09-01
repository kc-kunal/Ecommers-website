import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const { fetchAllProduct, data } = useContext(DataContext);
  const navigate = useNavigate();
  //console.log(data);
  useEffect(() => {
    fetchAllProduct();
  }, []);

  //this function for carosol arrow

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrow"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
          // onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        />
      </div>
    );
  };

  const SamplePreArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrow"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
          // onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        />
      </div>
    );
  };
  //  this var setting for casrosal and we get this From react slick site
  var settings = {
    dots: false,
    autoplay: true,
    autoplayspeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePreArrow to="pre" />,
  };
  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
            >
              <div className="flex flex-col md:flex-row justify-center items-center h-[600px]">
                <div className="flex flex-col md:flex-row gap-5 justify-center items-center px-4">
                  <div className="space-y-3 md:space-y-6  ">
                    <h1 className="text-red-500 font-semibold text-lg">
                      Powering your world with the best in {" "}
                      <span className="text-blue-200 text-2xl ">
                        {item.category.toUpperCase()}
                      </span>
                    </h1>
                    <h3 className="md:text-4xl text-2xl font-bold line-clamp-3 uppercase md:w-[500px] text-white">
                      {item.title}
                    </h3>
                    <p className="md:w-[500px]  text-gray-400 pr-7">
                      {item.description}
                    </p>
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                  <div>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="rounded-full md:w-[400px] w-[180px] hover:scale-105 transition-all shadow-2xl shadow-blue-300 "
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category />
    </div>
  );
}

export default Carousel;
