import React, { useContext, useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./Sidebar";
import Agreements from "./Agreements";
import Setting from "./setting";
import myContext from "../../../context/data/myContext";
import { auth } from "../../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/firebaseConfig";
import { FiPlus } from "react-icons/fi";
import PurchasePincodeModal from "./PurchasePincodeModal";
import { RiMenu2Line } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const [numberOfAgreements, setNumberOfAgreements] = useState(0);
  const [numberOfPincodes, setNumberOfPincodes] = useState(0);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const dropdownRef = useRef(null);
  const context = useContext(myContext);
  const { mode } = context;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        fetchUserData(userEmail);
      } else {
        console.error("User not logged in.");
        redirectToLogin();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (email) => {
    try {
      const userData = await getUserData(email);

      if (userData) {
        setUserProfile(userData);
        console.log("User Data:", userData);
        console.log("Milgaya:", userData.uid);
        const profileURL = userData.profileURL;
        setProfileImageUrl(profileURL);
        const collectionRef = collection(fireDB, "admins");

        // Query for agreements
        const agreementsQuery = query(
          collectionRef,
          where("userId", "==", userData.uid)
        );
        const agreementsSnapshot = await getDocs(agreementsQuery);

        // Query for pincodes
        const pincodesQuery = query(
          collectionRef,
          where("puid", "==", userData.uid)
        );
        const pincodesSnapshot = await getDocs(pincodesQuery);

        const agreementsData = [];
        agreementsSnapshot.forEach((doc) => {
          agreementsData.push({ id: doc.id, ...doc.data() });
        });

        const pincodesData = [];
        pincodesSnapshot.forEach((doc) => {
          pincodesData.push({ id: doc.id, ...doc.data() });
        });

        // Count the number of agreements and log it in the console
        const numberOfAgreements = agreementsData.length;
        // console.log('Number of Agreements:', numberOfAgreements);
        setNumberOfAgreements(numberOfAgreements);
        const flattenedPincodes = pincodesData.flatMap((item) => item.pincode);

        // Extract unique pincodes from the flattened array
        const uniquePincodes = [...new Set(flattenedPincodes)];

        // Count the number of unique pincodes
        const numberOfUniquePincodes = uniquePincodes.length;
        console.log("Number of Unique Pincodes:", numberOfUniquePincodes);
        setNumberOfPincodes(numberOfUniquePincodes);
      } else {
        console.log("User email:", email);
        console.error("User data not found");
        redirectToLogin();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      redirectToLogin();
    }
  };

  const getUserData = async (email) => {
    const userRef = collection(fireDB, "admins");
    const querySnapshot = await getDocs(
      query(userRef, where("email", "==", email))
    );

    if (querySnapshot.size > 0) {
      return querySnapshot.docs[0].data();
    }

    return null;
  };

  const redirectToLogin = () => {
    window.location.href = "/loginAdmin";
  };

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/loginAdmin";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const togglePanel = (panel) => {
    setActivePanel(panel);
  };

  const toggleDropdown = () => {
    console.log("Toggle dropdown clicked");
    setShowDropdown((prev) => {
      console.log("Previous state:", prev);
      return !prev;
    });
  };


  return ( 

  
    <>
      <Sidebar togglePanel={togglePanel} className="hidden md:block" />
      <div className="fixed top-0 left-0 w-full h-full z-40 md:hidden" />
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-white min-h-screen transition-all main">
        <div className=" px-8 bg-white  items-center sticky  left-0 z-30  flex justify-between top-0">
          <button
            type="button"
            className="text-lg text-gray-600 sidebar-toggle"
          >
            {/* <RiMenu2Line className="text-xl text-gray-600 font-bold" /> */}
          </button>

          <div className="flex items-center justify-between bg-blue-50 p-2 ">
            <div
              className="dropdown ml-3 
             relative"
              ref={dropdownRef}
            >
              <button
                type="button"
                className="dropdown-toggle flex items-center focus:outline-none"
                onClick={toggleDropdown}
              >
                {userProfile ? (
                  <div className="flex items-center w-32 gap-2">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        className="w-9 h-9 rounded-full block object-cover align-middle"
                        alt=""
                      />
                    ) : (
                      <CgProfile className="w-8 h-8 rounded block object-cover align-middle" />
                    )}

                    <div className="div">
                      <span className="text-sm font-normal text-gray-800 tracking-wider">
                        {userProfile.name
                          ? userProfile.name
                          : "Name not available"}
                      </span>
                      <p className="ml-2 text-sm text-gray-500">
                        {userProfile.role
                          ? userProfile.role
                          : "Role not available"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <CgProfile className="w-8 h-8 rounded block object-cover align-middle" />
                )}
              </button>
              {userProfile && showDropdown && (
                <div
                  className="dropdown absolute top-full right-0 mt-2 w-36 bg-white border rounded-sm"
                  style={{ zIndex: 1000 }}
                >
                  {/* Dropdown content */}
                  <ul>
                    <li>
                      <div
                        className="flex text-sm items-center py-2 px-4 text-slate-900 hover:border-b-2  group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        onClick={() => togglePanel("setting")}
                      >
                        <FaUserCircle className="text-2xl pr-2 text-gray-400" />
                        Settings
                      </div>
                    </li>
                    <li>
                      <button
                        className="flex text-sm items-center py-2 px-4 text-slate-900 hover:text-slate-900 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        onClick={logout}
                      >
                        <IoIosLogOut className="text-2xl pr-2 text-gray-400" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <div className="middle-portion top-0 border-b-2 border-t-2 ">
            <h5 className="text-gray-700  px-4 py-2 font-bold uppercase">
              Dashboard
            </h5>
          </div>
        </div>
        <div className="p-6 bg-purple-50">
          {activePanel === "dashboard" && (
            <div>
              <div className="first flex justify-between bg-slate-800 rounded mb-4 ">
                <div className="pt-5 px-3 ">
                  <div className="flex justify-between text-white ">
                    <div>
                      <div className="pb-3">
                        Upgrade your plan from a{" "}
                        <span className="font-semibold">Free trial</span>, to
                        ‘Premium Plan’
                      </div>
                      <form action="" className="flex items-center mb-4">
                        <div
                          className="text-sm text-center px-3 py-2 flex bg-slate-500 border  rounded-md text-white font-semibold outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]"
                          onClick={openModal}
                        >
                          <div className="">{/* <FiPlus /> */}</div>
                          <div>Purchace Pincode !</div>
                        </div>
                      </form>
                      <PurchasePincodeModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="div flex gap-4 flex-col md:flex-row">
                <div className="bg-white rounded-md border border-gray-100 py-3 px-3 shadow-md shadow-black/5 flex-1">
                  <div className="div flex justify-between ">
                    <div className="flex justify-between mb-4 ">
                      <div>
                        <div className="text-sm font-medium text-gray-400">
                          Total Agreements
                        </div>
                        <div className="flex items-center mb-1">
                          <div className="text-2xl font-semibold">
                            {numberOfAgreements}
                          </div>
                          <div className="p-1 rounded bg-emerald-500/10 text-emeral-500 text-[12px] font-semibold leading-none ml-2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="div bg-blue-100 rounded-full w-12 h-12 flex">
                      <IoNewspaperOutline className="text-blue-400 text-2xl m-auto z-20 " />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-3 shadow-md shadow-black/5 flex-1">
                  <div className="di flex justify-between">
                    <div className="flex justify-between mb-6">
                      <div>
                        <div className="text-sm font-medium text-gray-400">
                          Total Pincodes
                        </div>
                        <div className="text-2xl font-semibold mb-1">
                          {numberOfPincodes}
                        </div>
                      </div>
                    </div>
                    <div className="div bg-blue-100 rounded-full w-12 h-12 flex">
                      <IoLocationOutline className="text-blue-400 text-3xl m-auto z-20  " />
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> */}
              <div className="bg-white  mt-4  shadow-md shadow-black/5 rounded h-auto">
                <div className="flex justify-between mb-0 p-3 items-start text-gray-600 tracking-wide">
                  <div className="font-medium">Expiring Agreements</div>
                  <div className="dropdown"></div>
                </div>
                <div className="overflow-x-auto">
                  <table
                    className="w-full min-w-[540px]"
                    data-tab-for="order"
                    data-page="active"
                  >
                    <thead>
                      <tr>
                        <th className="text-sm  tracking-wide font-bold text-gray-500 py-2 pl-4 bg-pink-50 text-left ">
                          Sr. No.
                        </th>
                        <th className="text-sm tracking-wide text-gray-500 py-2 pl-4 bg-pink-50 text-start font-bold">
                          Tenant
                        </th>
                        <th className="text-sm font-bold  tracking-wide  text-gray-500 py-2 px-4 bg-pink-50 text-left">
                          Owner
                        </th>
                        <th className="text-sm font-bold  tracking-wide  text-gray-500 py-2 px-4 bg-pink-50 text-left rounded-tr-md rounded-br-md">
                          Type
                        </th>
                        <th className="text-sm font-bold  tracking-wide  text-gray-500 py-2 px-4 bg-pink-50 text-left">
                          Expiry Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <div className="flex items-center">{/* 1 */}</div>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {/* 3 days */}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {/* $56 */}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                            {/* In progress */}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b border-b-gray-50">
                          <span className="text-[13px] font-medium text-gray-400">
                            {/* $56 */}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white  mt-4 h-auto shadow-md shadow-black/5 rounded">
                <div className="flex justify-between mb-0 items-start p-3 ">
                  <div className="font-medium">Agreements Chart</div>
                  <div className="dropdown"></div>
                </div>
                <div className="overflow-x-auto"></div>
              </div>
            </div>
            // </div>
          )}
          {activePanel === "Agreements" && <Agreements />}
          {activePanel === "setting" && <Setting />}
        </div>
        <div className="div mt-4 bg-white text-gray-400 text-sm p-3 bottom-0 ">
          <h5>© 2024 All Rights Reserved.</h5>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
