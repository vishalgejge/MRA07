import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { RxCross2 } from "react-icons/rx";
import landLogo from "../images/land-logo1.png";
import Signup from "../../pages/registration/Signup";
import { fireDB } from "../../firebase/firebaseConfig";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import "../../components/navbar/navbar.css";

import {
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore"; // Import the Signup component

function Navbar() {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const context = useContext(myContext);
  const { mode, toggleMode } = context;

  const toggleSignup = (userData) => {
    setSignupOpen(!signupOpen);

    // Store the user data in the state
    setUserData(userData);
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-100"
            enterTo="opacity-0"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-0"
            leaveTo="opacity-100"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="bg-slate-800 relative flex w-full max-w-xs flex-col overflow-y-auto  pb-12 shadow-xl">
              
              <div className="flex px-4 pb-2 pt-4">
                  <Link to={"/"} className="flex-1">
                    <div className="flex  bg-white">
                      <h1 className=" text-2xl font-bold text-white  rounded">
                        <img
                          className="inline-block w-60 h-full "
                          src={landLogo}
                          alt="Dan_Abromov"
                        />
                      </h1>
                    </div>
                  </Link>
                </div>
                <div className="flex px-4 pb-2 pt-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white text-2xl font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 text-gray-400 font-semibold text-xl pl-8 mt-4">
                  <div className="flow-root">
                    <Link to={"/"}>Home</Link>
                  </div>
                  <div className="flow-root">
                    <Link to={"/downloadPdf"}>Download PDF</Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/videoSection"}
                      className=""
                    >
                      Hows It Works?
                    </Link>
                  </div>

                  <div className="relative inline-block text-left">
      <div className="flow-root">
        <button
          type="button"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={handleToggleDropdown}
        >
          Support
          {/* Heroicon name: solid/chevron-down */}
        </button>
      </div>

      {/* Dropdown panel, show/hide with aria-expanded */}
      {isOpen && (
        <div
          className="origin-top-center absolute z-10 top-12 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Ftechnical_support.pdf?alt=media&token=335cf3fd-8f0d-444e-94e7-b5b806b638cb")}
            >
              Technical
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fout_of_maharashtra.pdf?alt=media&token=abcb9601-ff0c-4b84-b8b4-3f3f59bb3554")}
            >
              Out Of Maharashtra
            </button>
          </div>
        </div>
      )}
    </div>
                  <div className="flow-root">
                    <Link to={"/contactus"}>Contact Us</Link>
                  </div>



                  <div className="flow-root">
                    <Link
                      to={"/LoginAdmin"}
                      className=""
                    >
                      Partner Login
                    </Link>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative ">
        <div className="parent">
          <div className="child ">
            <div className="left-side  ">
              <div className="pt-1">
                <FaPhoneAlt />
              </div>
              <p className="left-content">+91 738 511 6583</p>
            </div>
            <p className="middle-side">
              Govt. Registration Website is working.
            </p>
            <div className="right-side ">
              <div className="socials ">
                <div className="social-1">
                  <a href="https://www.facebook.com/profile.php?id=100084550695042&mibextid=LQQJ4d" target="_blank">
                    <FaFacebookF />
                  </a>
                </div>
                <div className="social-3">
                  <a href="https://www.linkedin.com/company/maharashtra-rent-agreement/" target="_blank">
                    <FaLinkedin />
                  </a>
                </div>

              {userData ? (
                <div className="flow-root">
                  <div
                    onClick={async () => {
                      try {
                        // Log out logic here

                        const userRefa = doc(
                          fireDB,
                          "leadActivity",
                          "m8mTyrerAF9YXUfu1WcC"
                        ); // Assuming 'm8mTyrerAF9YXUfu1WcC' is the document ID

                        const data = {
                          activity: false,
                          // Add other fields you want to update here
                        };

                        await updateDoc(userRefa, data);
                        console.log(
                          "LeadActivity document updated successfully"
                        );

                        setUserData(null);
                      } catch (error) {
                        console.error(
                          "Error updating LeadActivity document:",
                          error
                        );
                        // Handle the error as needed
                      }
                    }}
                    className="-m-2 block p-2 font-medium text-white cursor-pointer"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {userData.name}
                    Logout
                  </div>
                </div>
              ) : (
                <p className="flow-root">
                  <Link
                    onClick={() => {
                      toggleSignup(userData);
                    }}
                    className="focus:outline-none"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Login
                  </Link>
                </p>
              )}
              {/* </div> */}
            </div>
              </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="bg-white shadow-xl h-20 align-middle  pt-2 sticky top-0"
        >
          <div className="">
            <div className="flex h-10 items-center">
              <div className="nav-logo flex justify-between w-11/12 m-auto">
                {/* Logo */}
                <div className=" flex pl-4 lg:ml-0">
                  <Link to={"/"} className="flex-1">
                    <div className="flex ">
                      <h1 className=" text-2xl font-bold text-black  rounded">
                        <img
                          className="inline-block w-60 h-full "
                          src={landLogo}
                          alt="Dan_Abromov"
                        />
                      </h1>
                    </div>
                  </Link>
                </div>

                <div className=" flex items-center ">
                  <div className="hidden lg:flex  lg:items-center  lg:space-x-6">
                    <Link
                      to={"/"}
                      className="text-base font-medium text-gray-700 cursor-pointer hover:text-amber-400"
                    >
                      Home
                    </Link>
                    <Link
                      to={"/downloadPdf"}
                      className="text-base font-medium text-gray-700 cursor-pointer hover:text-amber-400"
                    >
                      Download
                    </Link>

                    <Link
                      to={"/videoSection"}
                      className="text-base font-medium text-gray-700 cursor-pointer hover:text-amber-400"
                    >
                      Hows We Works?
                    </Link>
                    <Link
                      to={"/contactus"}
                      className="text-base font-medium text-gray-700 cursor-pointer hover:text-amber-400"
                    >
                      Contact Us
                    </Link>
                    <div 
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div>
        <button
          type="button"
          className="text-base font-medium text-gray-700 hover:text-amber-400 focus:ring-amber-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={handleToggleDropdown}
        >
          Support
          {/* Heroicon name: solid/chevron-down */}
          
        </button>
      </div>

      {/* Dropdown panel, show/hide with aria-expanded */}
      {isOpen && (
        <div
          className="origin-top-center absolute z-10 center mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1" role="none">
          <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Ftechnical_support.pdf?alt=media&token=335cf3fd-8f0d-444e-94e7-b5b806b638cb")}
            >
              Technical
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/maharentagreement-79b07.appspot.com/o/pdfs%2Fout_of_maharashtra.pdf?alt=media&token=abcb9601-ff0c-4b84-b8b4-3f3f59bb3554")}
            >
                Out Of Maharashtra
              </button>
            {/* Add another option if needed */}
          </div>
        </div>
      )}
    </div>
                    <Link
                      to={"/LoginAdmin"}
                      className="text-base font-medium text-gray-700 cursor-pointer hover:text-amber-400"
                    >
                      Partner Login
                    </Link>
                  </div>

                  {/* Search */}
                  {/* <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div> */}

                  {/* Cart */}
                </div>
                <div className="div"></div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white pr-3 text-gray-900 mt-2 text-2xl lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <Transition.Root show={signupOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={toggleSignup}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-black rounded-lg p-6 w-full max-w-md">
                <Signup onClose={toggleSignup} />{" "}
                {/* Pass onClose function to close the modal */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Navbar;
