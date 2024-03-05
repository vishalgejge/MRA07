import React, { useContext, useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Vendors from "./Vendors";
import Reports from "./Reports";
import Setting from "./setting";
import Agreements from "./Agreements";
import Leads from "./Leads"; // Assuming you have a separate OrderPanel component
import myContext from "../../../context/data/myContext";
import { auth } from "../../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/firebaseConfig";

import { IoLocationOutline } from "react-icons/io5";

function Dashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [activePanel, setActivePanel] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [numberOfAgreements, setNumberOfAgreements] = useState(0); 
  const [numberOfVendors, setNumberOfVendors] = useState(0); 
  const [specificNumberOfAgreements, setSpecificNumberOfAgreements] = useState(0); 
  const [vendorNames, setVendorNames] = useState([]);
  const [vendorsLength, setVendorsLength] = useState([]);
  const [numberOfPincodes, setNumberOfPincodes] = useState(0); 
  const [agreementsData, setAgreementsData] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const dropdownRef = useRef(null);
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        fetchUserData(userEmail);
      } else {
        console.error('User not logged in.');
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
        console.log('User Data:', userData);
        console.log('Milgaya:', userData.uid);
        const profileURL = userData.profileURL;
        setProfileImageUrl(profileURL);
        console.log('URL -> ',profileURL);
        const collectionRef = collection(fireDB, 'admins');
        const agreementsCollectionRef = collection(fireDB, 'admins'); 
        const vendorsCollectionRef = collection(fireDB, 'admins'); 
        const pincodesCollectionRef = collection(fireDB, 'admins');
        const adminsQuerySnapshot = await getDocs(
          query(vendorsCollectionRef, where('role', '==', 'vendor'))
        );
        // const adminsQuerySnapshot = await getDocs(
        //   query(vendorsCollectionRef, where('role', '==', 'vendor'))
        // );
          
        // const vendorNames = [];

        // adminsQuerySnapshot.forEach((doc) => {
        //   const vendorData = doc.data();
        //   const vendorName = vendorData.name; // Replace 'name' with the actual field name in your document
        //   vendorNames.push(vendorName);
        // });

        // console.log('Vendor Names:', vendorNames);

        const fetchData = async () => {
          try {
            const vendors = await Promise.all(
              adminsQuerySnapshot.docs.map(async (doc) => {
                try {
                  const vendorData = doc.data();
                  const vendorName = vendorData.name;
                  const vendorUid = vendorData.uid;
                  console.log('data uid1 -> ', vendorData.uid);
                  console.log('data name -> ', vendorData.name);
        
                  const agreementsQuerySnapshot = await getDocs(
                    query(agreementsCollectionRef, where('userId', '==', vendorUid))
                  );
                  const numberOfAgreements = agreementsQuerySnapshot.size;
        
                  console.log('data numberOfAgreements -> ', agreementsQuerySnapshot);
                  // Fetch number of pincodes
                  // const pincodesQuerySnapshot = await getDocs(
                  //   query(pincodesCollectionRef, where('puid', '==', vendorUid))
                  // );
                  // const numberOfPincodes = pincodesQuerySnapshot.size;
                  // const vendorsLengthCount = vendorsLength;
                  let vendorsLengthCount = vendorsLength;
                  let pinCodeCount = 0;
                  
                  const numberOfUniquePincodesArray = [];

                  const pincodesQuery = query(pincodesCollectionRef, where('puid', '==', vendorUid));
                    
                  const pincodesSnapshot = await getDocs(pincodesQuery);
                  let numberOfUniquePincodes = 0;

                  while (vendorsLengthCount >= 0) {
                  
                    const pincodesData = [];
                    pincodesSnapshot.forEach((doc) => {
                      pincodesData.push({ id: doc.id, ...doc.data() });
                    });
                  
                    const flattenedPincodes = pincodesData.flatMap((item) => item.pincode);
                  
                    // Extract unique pincodes from the flattened array
                    const uniquePincodes = [...new Set(flattenedPincodes)];
                  
                    // console.log('Unique Pincodes for:', vendorUid, ' :', uniquePincodes);
                    // Count the number of unique pincodes
                    numberOfUniquePincodes = uniquePincodes.length;
                    console.log('Number of Unique Pincodes:', numberOfUniquePincodes);
                    numberOfUniquePincodesArray.push(numberOfUniquePincodes);

                    // console.log('Pre picode count:', pinCodeCount);
                    pinCodeCount = pinCodeCount + numberOfUniquePincodes;
                    console.log('pin code count here',pinCodeCount);
                  
                    vendorsLengthCount--; // Decrement the loop counter
                  }
                  console.log('-------->',numberOfUniquePincodes);
                  setNumberOfPincodes(numberOfUniquePincodes);
                  return {
                    name: vendorName,
                    uid: vendorUid,
                    numberOfAgreements,
                    numberOfUniquePincodes,
                  };
                } catch (error) {
                  console.error('Error fetching data for vendor:', error);
                  return null; // Handle the error gracefully, you can modify this as needed
                }
              })
            );
        
            const filteredVendors = vendors.filter((vendor) => vendor !== null);
            setVendorNames(filteredVendors);
            console.log('Vendor Names:', filteredVendors);
            console.log('Vendor length:', filteredVendors.length);
            setVendorsLength(filteredVendors.length);
          } catch (error) {
            console.error('Error fetching vendor data:', error);
          }
        };
        
        fetchData();
        

// console.log('Vendor Data:', vendorDataArray);

        const numberOfUsers = adminsQuerySnapshot.size;

        console.log(`Number of vendors: ${numberOfUsers}`);
        setNumberOfVendors(numberOfUsers);

        const adminsQuerySnapshot1 = await getDocs(
          query(vendorsCollectionRef, where('userId', '!=', userData.uid))
        );
        const q = query(collectionRef, where('userId', '!=', userData.uid));
        const querySnapshot = await getDocs(q);
  
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
  
        setAgreementsData(data);

        const numberOfuserId = adminsQuerySnapshot1.size;

        console.log(`Number of userid: ${numberOfuserId}`);
        setNumberOfAgreements(numberOfuserId);


        const adminsQuerySnapshot2 = await getDocs(
          query(vendorsCollectionRef, where('puid', '!=', userData.uid))
        );
  

        const numberOfpinId = adminsQuerySnapshot2.size;

        console.log(`Number of pinid: ${numberOfpinId}`);
        setNumberOfPincodes(numberOfpinId);

        if (adminsQuerySnapshot.size > 0) {
          adminsQuerySnapshot.forEach((doc) => {
            console.log('Other Data:', doc.data());
          });
        } else {
          console.log('No admins found with email not equal to "admin@mail.com"');
        }
  
      } else {
        console.log('User email:', email);
        console.error('User data not found');
        redirectToLogin();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      redirectToLogin();
    }
  };

  const getUserData = async (email) => {
    const userRef = collection(fireDB, 'admins');
    const querySnapshot = await getDocs(query(userRef, where('email', '==', email)));

    if (querySnapshot.size > 0) {
      return querySnapshot.docs[0].data();
    }

    return null;
  };

  const redirectToLogin = () => {
    navigate('/loginAdmin');
    // window.location.href = '/loginAdmin';
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigate('/loginAdmin');
      // window.location.href = '/loginAdmin';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const togglePanel = (panel) => {
    setActivePanel(panel);
  };

  const toggleDropdown = () => {
    console.log('Toggle dropdown clicked');
    setShowDropdown((prev) => {
      console.log('Previous state:', prev);
      return !prev;
    });
  };
  
  // const ToggleSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleToggle = () => {
      setIsChecked(prevState => !prevState);
    };


  return (

    // this is admion
    <>
      <Sidebar togglePanel={togglePanel} className="hidden mdblock" />
      <div className="fixed top-0 left-0 w-full h-full z-40 md:hidden" />
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-white min-h-screen transition-all main">
        

        <div className=" px-8 bg-white  items-center sticky  left-0 z-30  flex justify-between top-0">
          <button
            type="button"
            className="text-lg text-gray-600 sidebar-toggle"
          >

          </button>

          <div className="flex items-center ml-auto">
            
          
          <label className="inline-flex items-center cursor-pointer">
            <span className="ms-3 text-sm font-medium text-black dark:text-gray-300 mr-5">Govt. Registration Website Working</span>
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={userProfile ? userProfile.toggleState : false} 
              onChange={handleToggle} 
            />
            <div 
              className={`relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${userProfile ? (userProfile.toggleState ? 'peer-checked:bg-blue-600' : '') : ''}`}
            ></div>
          </label>
          
            <div className="dropdown ml-3 relative" ref={dropdownRef}>
              
              <button
                type="button"
                className="dropdown-toggle flex items-center focus:outline-none"
                onClick={toggleDropdown}
              >
                {userProfile ? (
                  <div className="flex items-center p-2 bg-blue-100">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        className="w-8 h-8 rounded block object-cover align-middle"
                        alt=""
                      />
                    ) : (
                      <CgProfile className="w-8 h-8 rounded block object-cover align-middle" />
                    )}


                    <span className="ml-2">
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
                        Settings
                      </div>
                    </li>
                    <li>
                      <button
                        className="flex text-sm items-center py-2 px-4 text-slate-900 hover:text-slate-900 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
                        onClick={logout}
                      >

                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 bg-purple-50">
          {activePanel === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                  <div className="flex justify-between ">


                    <div className="text-sm font-medium text-gray-400">
                      Total Vendors
                    </div>
                    <div className="div bg-blue-100 rounded-full w-12 h-12 flex">
                      <IoLocationOutline className="text-blue-400 text-3xl m-auto z-20  " />

                    </div>
                  </div>
                  <div className="text-2xl text-gray-500 font-semibold mb-1">
                    {numberOfVendors}
                  </div>

                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                  <div className="flex justify-between ">

                    <div className="text-sm font-medium text-gray-400">                      Total Agreements
                    </div>
                    <div className="div bg-blue-100 rounded-full w-12 h-12 flex">
                      <IoLocationOutline className="text-blue-400 text-3xl m-auto z-20  " />

                    </div>

                  </div>
                  <div className="text-2xl text-gray-500 font-semibold mb-1">
                    {" "}
                    {numberOfAgreements}
                  </div>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                  <div className="flex justify-between">


                    <div className="text-sm font-medium text-gray-400">
                      Total Purchased Pincodes
                    </div>
                    <div className="div bg-blue-100 rounded-full w-12 h-12 flex">
                      <IoLocationOutline className="text-blue-400 text-3xl m-auto z-20  " />

                    </div>

                  </div>
                  <div className="text-2xl text-gray-500 font-semibold mb-1">
                    {(() => {
                      let count = 0;
                      vendorNames.forEach((vendor, index) => {
                        count += vendor.numberOfUniquePincodes;
                      });
                      return count;
                    })()}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:flex gap-2 ">
                <div className="w-3/4 bg-white border-1 p-1">
                  <div className="flex justify-between mb-0 p-2 items-start">
                    <div className="font-medium">Latest Agreements</div>
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
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                            Sr. No.
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            Tenant
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            Owner
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                            Type
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            Expiry Date
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                            Renewal Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {" "}
                        {agreementsData.map((admins, index) => (
                          <tr key={admins.id}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                {admins.partyDetails?.nameOfTenant}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                {admins.partyDetails?.nameOfOwner}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                In progress
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                $56
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                In progress
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white border-1 w-96">
                  <div className="flex justify-between mb-0 items-start p-2 ">
                    <div className="font-medium">Latest Vendors</div>
                    <div className="dropdown"></div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px]">
                      <thead>
                        <tr>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                            sr. no.
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            Name
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            No. of Agreement
                          </th>
                          <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                            No. of Pincode
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorNames.map((vendor, index) => (
                          <tr key={index}>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <div className="flex items-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                {vendor.name}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                {vendor.numberOfAgreements}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b border-b-gray-50">
                              <span className="text-[13px] font-medium text-gray-400">
                                {vendor.numberOfUniquePincodes}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activePanel === "Vendors" && <Vendors />}
          {activePanel === "Leads" && <Leads />}
          {activePanel === "setting" && <Setting />}
          {activePanel === "Agreements" && <Agreements />}
          {activePanel === "Reports" && <Reports />}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
