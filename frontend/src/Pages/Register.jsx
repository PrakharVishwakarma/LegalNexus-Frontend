import SignUpform from "../Components/Register/SignUpform";

import SignUpPng from '../assets/SignUonLN.png'

import Navbar from "../Components/LandingPg/Navbar";


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
            <div className="h-4/5 w-10/12 overflow-hidden">
              <img src={SignUpPng} alt="Sign Up" className="h-full w-full object-contain" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Register;