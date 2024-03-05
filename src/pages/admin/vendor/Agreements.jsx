import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import AgreementForm from "./AgreementForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../../firebase/firebaseConfig";

function Agreements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreementsData, setAgreementsData] = useState([]);
  const [user, setUser] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log("User UID is:", user.uid);
    });

    const fetchData = async () => {
      try {
        const collectionRef = collection(fireDB, "admins");
        const userUid = user.uid;

        const q = query(collectionRef, where("userId", "==", userUid));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setAgreementsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Ensure to unsubscribe from the auth state change listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [user]); // Fetch data only once when the component mounts

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">All Agreements ( Vendors )</div>
            <div className="dropdown"></div>
          </div>
          <form action="" className=" items-center mb-4  gap-4 md:flex-row md:flex">
            <div className="relative w-full mr-2">
              <input
                type="text"
                className="py-2  mb-4 pr-4 pl-10 bg-gray-50 w-full md:w-8/12 outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                placeholder="Search..."
              />
              <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div
              className="text-sm text-center py-2 pl-4 pr-12 flex w-fit cursor-pointer bg-green-700 text-white border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]"
              onClick={openModal}
            >
              <div className="mr-2 mt-1">
                <FiPlus />
              </div>
              <div>Agreement</div>
            </div>
          </form>
          <AgreementForm isOpen={isModalOpen} onClose={closeModal} />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead>
                <tr>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                    ID
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Teanat Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Owner Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Tenant Mo
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Owner Mo
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Broker Mo
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Token No
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Village
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Socity
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    City
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Expiry Date
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Agreement Date
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Biometric Vendor Mobile No.
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Biometric Vendor City
                  </th>
                </tr>
              </thead>
              <tbody>
                {agreementsData.map((admins, index) => (
                  <tr key={admins.id}>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {index + 1}
                      </span>
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
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.partyDetails?.tenantMobileNo}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.partyDetails?.ownerMobileNo}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.otherDetails?.brokerMobileNo}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.registryDetails?.tokenNo}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.propertyDetails?.villageName}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.propertyDetails?.societyName}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.propertyDetails?.city}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.registryDetails?.expiryDate}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {/* Assuming 'time' is a timestamp field */}
                        {admins.time &&
                          new Date(admins.time.toMillis()).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.otherDetails?.biometricVendorMobileNo}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-gray-400">
                        {admins.otherDetails?.biometricVendorNameCity}
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
  );
}

export default Agreements;
