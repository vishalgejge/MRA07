import React, { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import landLogo from "../images/land-logo.png";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import "../../components/footer/footer.css";

export default function Footer() {
  const context = useContext(myContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { mode } = context;

  return (
    <footer className="">
      <div className="footer-container">
        <div className=" footer-content">
          <div className="left-footer">
            <Link to={"/"} className="">
              <div className="flex ">
                <h1 className=" text-xl font-bold text-black  rounded">
                  <img
                    className="inline-block w-60 h-full "
                    src={landLogo}
                    alt="Dan_Abromov"
                  />
                </h1>
              </div>
            </Link>
          </div>
          <div className="footer-arrow" onClick={scrollToTop}>
            <MdKeyboardDoubleArrowUp className="text-black text-4xl hover:text-gray-200 cursor-pointer transition-colors duration-300" />
          </div>

          <div className="footer-list">
            <nav className="list-items">
              <li className="">
                <Link to={"/termsnconditions"} className="">
                  Terms & Conditions
                </Link>
              </li>
              <li className="">
                <Link to={"/privacypolicy"} className="">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={"/refundpolicy"} className="">
                  Refund Policy
                </Link>
              </li>
            </nav>
          </div>
          <div className="footer-right">
            <p className="">
              ©Copyright 2022. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
