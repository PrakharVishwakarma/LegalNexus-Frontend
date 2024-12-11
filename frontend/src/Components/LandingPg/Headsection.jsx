import "./Headsection.css";

import JudgePng from '../../assets/rb_2150716263_11zon.png';
import LawyerPng from '../../assets/rb_2151046709_11zon.png';
import VictimPng from '../../assets/rb_14363_11zon.png';
import CopPng from '../../assets/rb_12114_11zon.png';



const Headsection = () => {
  return (<div className="h-[47rem] w-full grid grid-cols-4 lg:grid-cols-6">
    <div className="hidden lg:block col-span-1 bg-gray-100 ">
      <div className="w-full h-full flex flex-col justify-between py-20">

        <div className="h-44 w-full flex justify-end">
          <img src={JudgePng} alt="JudgePng" style={{ width: '10rem', height: '11.5rem' }} className='up-down-Home' />
        </div>
        <div className="h-44 w-full flex justify-start">
          <img src={CopPng} alt="CopPng" style={{ width: '12rem', height: '12rem' }} className='up-down-Home' />
        </div>

      </div>
    </div>

    <div className="col-span-4 lg:col-span-4 bg-white flex items-center justify-center ">
      <div className='h-60 w-[47rem] text-center'>
        <h1>Legal Nexus  Secure & Transparent eVault System</h1>
        <br />
        <div className="para-conta
        iner">

        <p className="cursor typewriter-animation">Secure Your Legal Records With your Evault Nexus</p>
        </div>
      </div>
    </div>

    <div className="hidden lg:block col-span-1 bg-gray-100 ">

      <div className="w-full h-full flex flex-col justify-between py-20">
        <div className="h-44 w-full flex justify-start">
          <img src={LawyerPng} alt="CopPng" style={{ width: '12rem', height: '12rem' }} className='up-down-Home' />
        </div>

        <div className="h-44 w-full flex justify-end">
          <img src={VictimPng} alt="JudgePng" style={{ width: '11rem', height: '11rem' }} className='up-down-Home' />
        </div>

      </div>
    </div>
  </div>);
};

export default Headsection;
