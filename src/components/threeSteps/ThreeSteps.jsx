import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { ImEqualizer } from "react-icons/im";
import { IoPeopleSharp } from "react-icons/io5";

import "../../components/threeSteps/three.css";

function threeSteps() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div>
      <section className="three-section">
        <div className=" three-head">
          <h1 className="">Three Simple Steps</h1>
          <h2 className=" ">
            <span className=" text-pink-500"></span>
          </h2>
          <div className="three-content">
            <div className="first-content">
              <div className="">
                <ImEqualizer className=" mb-8  object-center  inline-block border-none bg-white text-yellow-500 text-4xl" />
                <h2 className="">Contact Us</h2>
                <p className="leading-relaxed text-sm text-center text-gray-500">
                  Maharashtra Rental Agreement is a self service platform.
                  Simply enter your pin code and connect with our registered
                  members. We have a wide network of executives across India and
                  there are remote support options for those living abroad.
                </p>
              </div>
            </div>
            <div className="second-content">
              <div className="">
                <IoDocumentTextSharp className="mb-8  object-center  inline-block border-none bg-white text-yellow-500 text-4xl" />
                <h2 className="">Agent Will Visit Your Doorsteps</h2>
                <p className="leading-relaxed text-sm text-center text-gray-500">
                  Connect with the agent and share your expectations. Executives
                  registered on our portal are vetted beforehand to ensure
                  transparent dealing. Connect with multiple vendors to find the
                  right executive for your need.
                </p>
              </div>
            </div>
            <div className="third-content">
              <div className="">
                <FaUserFriends className="mb-8  object-center  inline-block border-none bg-white text-yellow-500 text-4xl" />
                <h2 className="">Easy Home Delivery Of Your Agreement</h2>
                <p className="leading-relaxed text-sm text-center text-gray-500">
                  The executive will visit your home or preferred location and
                  complete the registration of the agreement through biometric
                  and Aadhar validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default threeSteps;
