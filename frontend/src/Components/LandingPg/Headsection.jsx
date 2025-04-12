import "./Headsection.css";

import JudgePng from "../../assets/rb_2150716263_11zon.png";
import LawyerPng from "../../assets/rb_2151046709_11zon.png";
import VictimPng from "../../assets/rb_14363_11zon.png";
import CopPng from "../../assets/rb_12114_11zon.png";
import MainHeadPng from "../../assets/compressmainHead.png";

const Headsection = () => {
  return (
    <div className="h-[46rem] w-full grid grid-cols-4 lg:grid-cols-6 bg-cyan-50">
      {/* Left Section */}
      <div className="hidden lg:block col-span-1 ">
        <div className="w-full h-full flex flex-col justify-between py-20">
          <div className="h-44 w-full flex justify-end">
            <img
              src={JudgePng}
              alt="JudgePng"
              style={{ width: "10rem", height: "11.5rem" }}
              className="up-down-Home"
            />
          </div>
          <div className="h-44 w-full flex justify-start">
            <img
              src={CopPng}
              alt="CopPng"
              style={{ width: "12rem", height: "12rem" }}
              className="up-down-Home"
            />
          </div>
        </div>
      </div>

      {/* Main Section with Background */}
      <div
        className="col-span-4 lg:col-span-4 flex items-start justify-center relative"
        style={{
          backgroundImage: `url(${MainHeadPng})`,
          backgroundSize: "55rem 30rem",
          backgroundPosition: "bottom center",
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="h-[12rem] w-[47rem] text-center mt-8 flex flex-col justify-evenly">

          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-800">
              Legal Nexus Secure & Transparent eVault System
            </h1>
          </div>

          <div className="min-h-14 para-container">
            <p className="cursor typewriter-animation">
              Secure Your Legal Records With Your Evault Nexus
            </p>
          </div>

        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block col-span-1 ">
        <div className="w-full h-full flex flex-col justify-between py-20">
          <div className="h-44 w-full flex justify-start">
            <img
              src={LawyerPng}
              alt="LawyerPng"
              style={{ width: "12rem", height: "12rem" }}
              className="up-down-Home"
            />
          </div>
          <div className="h-44 w-full flex justify-end">
            <img
              src={VictimPng}
              alt="VictimPng"
              style={{ width: "11rem", height: "11rem" }}
              className="up-down-Home"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headsection;
