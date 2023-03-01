import React from "react";
import Carousel from "../components/Carosel";
import Marquee from "../components/Marquee";
import SidebarCard from "../components/SidebarCard";
import MainBody from "../components/Mainbody/Mainbody";
import Counter from "../components/Counter";
import "../assets/styles/home.css";

const Home = () => {
  return (
    <>
      <section
        className="carousle_section px-6 lg:mx-10 lg:my-6"
      >
        <div style={{}} className="carousleContainer  flex flex-col lg:flex-row" >
          
            <Carousel />
        </div>
        <div className="marque ">
          <Marquee />
        </div>
      </section>
      <section className="counter bg-[#edecec] py-10">
        <Counter />
      </section>
      <section>
        <MainBody />
      </section>
    </>
  );
};

export default Home;
