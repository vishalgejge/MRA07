import React, { useContext, useState, useEffect, useRef } from 'react';
import myContext from '../../../context/data/myContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, fireDB } from '../../../firebase/firebaseConfig';

function Reports() {
  const [typeCounts, setTypeCounts] = useState({});
  const dropdownRef = useRef(null);
  const context = useContext(myContext);
  const { mode } = context;

  const agreementTypeOptions = [
    'Food license custmore',
    'rent agreement',
    'Pest contral custmore',
    'Rent property detail for broker',
    'name of change in mseb and corporation',
  ];

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        const collectionRef = collection(fireDB, 'admins');
        const q = query(collectionRef, where('email', '!=', email));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          const documentData = { id: doc.id, ...doc.data() };
          data.push(documentData);
        });

        const vedorsData = data.map((vendor) => vendor.uid);

        const updatedTypeCounts = {};

        for (const vendorId of vedorsData) {
          const q1 = query(collectionRef, where('userId', '==', vendorId));
          const querySnapshot1 = await getDocs(q1);

          querySnapshot1.forEach((doc1) => {
            const documentAgreementData = { id: doc1.id, ...doc1.data() };

            // Increment the count for each agreement type
            const agreementType = documentAgreementData.agreementType;
            updatedTypeCounts[agreementType] = (updatedTypeCounts[agreementType] || 0) + 1;
          });
        }

        // Set the agreement counts in state
        setTypeCounts(updatedTypeCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        console.log('email->', userEmail);
        fetchUserData(userEmail);
      } else {
        console.error('User not logged in.');
        redirectToLogin();
      }
    });

    return () => unsubscribe();
  }, []); // Dependencies array should be empty if you want it to run only once when the component mounts

  // Ensure to unsubscribe from the auth state change listener when the component unmounts
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">All Reports</div>
            <div className="dropdown"></div>
          </div>
          <form action="" className="flex items-cente mb-4">
            <div className="relative w-full mr-2">
              <input
                type="text"
                className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                placeholder="Search..."
              />
              <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            </div>
            <select className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]">
              <option value="">All</option>
            </select>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead>
                <tr>
                  <th className="text-[12px] text-start uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 rounded-tl-md rounded-bl-md">
                    Agreement Type
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-center">
                    No of Agreement
                  </th>
                </tr>
              </thead>
              <tbody>
                {agreementTypeOptions.map((option, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-start border-b-gray-300">
                      <span className="text-[13px] font-medium text-slate-900">
                        {option}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center border-b-gray-300">
                      <span className="text-[13px] font-medium text-slate-900">
                        {typeCounts[option] || 0}
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

export default Reports;
