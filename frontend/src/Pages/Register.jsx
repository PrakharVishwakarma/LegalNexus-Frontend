import SignUpform from "../Components/Register/SignUpform";

// import SignUpPng from '../assets/SignUonLN.png'

import Navbar from "../Components/LandingPg/Navbar";

import Lottie from "lottie-react";

import lottieRegisterAnm1 from '../assets/lottie/lottieRegisterAnm1.json'

const Register = () => {
 
  return (<div>
    <Navbar></Navbar>
    <div style={{ height: '50rem' }}>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div id="registerBox">
          <SignUpform></SignUpform>
        </div>
        <div className="hidden lg:block bg-fuchsia-200 justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <div className="h-10/12 w-8/12 overflow-hidden">
              {/* <img src={SignUpPng} alt="Sign Up" className="h-full w-full object-contain" /> */}
              <Lottie animationData={lottieRegisterAnm1} loop={true} />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Register;