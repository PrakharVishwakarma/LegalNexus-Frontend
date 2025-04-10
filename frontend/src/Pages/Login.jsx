// frontend/src/Pages/Login.jsx

import SignIn from "../Components/Login/SignIn";

// import SignInLN from '../assets/SignInLN.png'

import Navbar from "../Components/LandingPg/Navbar";

import Lottie from "lottie-react";

import lottieLoginAnm1 from '../assets/lottie/lottieLoginAnm1.json'


const Login = () => {

  return (<div>

    <Navbar></Navbar>
    <div style={{ height: '50rem' }}>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

        <div className="hidden lg:block bg-fuchsia-200" id="AuthDesc">
          <div className="w-full h-full flex justify-center items-center">
            
            <div className="w-12/12 h-12/12 overflow-hidden">
              {/* <img src={SignInLN} alt="SignIn Graphics" className="w-full h-full object-contain" /> */}
              <Lottie animationData={lottieLoginAnm1} loop={true} />
            </div>

          </div>
        </div>

        <div className="flex justify-center items-center" id="loginBox">
          <SignIn></SignIn>
        </div>

      </div>
    </div>
  </div>);
};

export default Login;