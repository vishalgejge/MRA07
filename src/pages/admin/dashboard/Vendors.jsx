import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase/firebaseConfig';
import { getDocs, updateDoc, deleteDoc, query, collection, where, doc, onSnapshot } from 'firebase/firestore';
import { fireDB } from '../../../firebase/firebaseConfig';
// import { onSnapshot } from 'firebase/firestore';

// import { CiSearch } from "react-icons/ci";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  const [adminUserId, setAdminUid] = useState('');
  const [vendorsUserId, setVendorUid] = useState('');
  const [userUid, setUserUid] = useState(null);
  const [numberOfPincodes, setNumberOfPincodes] = useState(0);
  const [permitStatus, setPermitStatus] = useState(0);
  const [realtimePermitStatus, setRealtimePermitStatus] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all',

  const agreementsCollectionRef = collection(fireDB, 'admins');
  const pincodesCollectionRef = collection(fireDB, 'admins');
  const vendorsCollectionRef = collection(fireDB, 'admins');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // setUserUid(user.uid);
        setAdminUid(user.uid);
        console.log("Admins users id is -> :", user.uid)
      } else {
        setAdminUid(null);
      }
    });

    // Cleanup function to unsubscribe from the auth state changes
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorsQuerySnapshot = await getDocs(
          query(vendorsCollectionRef, where('role', '==', 'vendor'))
        );

        const vendors = await Promise.all(
          vendorsQuerySnapshot.docs.map(async (doc) => {
            try {
              const vendorData = doc.data();
              const vendorName = vendorData.name;
              const vendorUid = vendorData.uid;
              const vendorEmail = vendorData.email;
              const vendorMobile = vendorData.mobile;
              setVendorUid(vendorData.uid);
              console.log('data vendors uid -> ', vendorData.uid);
              console.log('data name -> ', vendorData.name);
              console.log('data mobile -> ', vendorData.mobile);
              console.log('data email -> ', vendorData.email);
              console.log('data permit -> ', vendorData.permit);
              let permitStatusFF = vendorData.permit;


              const agreementsQuerySnapshot = await getDocs(
                query(agreementsCollectionRef, where('userId', '==', vendorUid))
              );
              const numberOfAgreements = agreementsQuerySnapshot.size;

              console.log('data numberOfAgreements -> ', numberOfAgreements);

              const pincodesQuery = query(pincodesCollectionRef, where('puid', '==', vendorUid));
              const pincodesSnapshot = await getDocs(pincodesQuery);

              const pincodesData = [];
              pincodesSnapshot.forEach((doc) => {
                pincodesData.push({ id: doc.id, ...doc.data() });
              });

              const flattenedPincodes = pincodesData.flatMap((item) => item.pincode);

              const uniquePincodes = [...new Set(flattenedPincodes)];
              console.log('Unique Pincodes for:', vendorUid, ' :', uniquePincodes);

              const numberOfUniquePincodes = uniquePincodes.length;
              console.log('Number of Unique Pincodes:', numberOfUniquePincodes);
              setNumberOfPincodes(numberOfUniquePincodes);

              setPermitStatus(permitStatusFF);
              console.log('permit status -> ', permitStatusFF)

              return {
                name: vendorName,
                uid: vendorUid,
                vendorMobile,
                vendorEmail,
                numberOfAgreements,
                numberOfUniquePincodes,
                permitStatusFF,
              };
            } catch (error) {
              console.error('Error fetching data for vendor:', error);
              return null;
            }
          })
        );

        const filteredVendors = vendors.filter((vendor) => vendor !== null);
        setVendors(filteredVendors);
        console.log('Vendor Names:', filteredVendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once, similar to componentDidMount
  const handleApprove = async (vendorUidC) => {
    try {
      console.log('Button clicked for vendorUid:', vendorUidC);
      const vendorsCollectionRefApprove = collection(fireDB, 'admins');
      const vendorQuerySnapshotC = await getDocs(
        query(vendorsCollectionRefApprove, where('uid', '==', vendorUidC))
      );

      if (vendorQuerySnapshotC.docs.length === 0) {
        console.error('Vendor not found with uid:', vendorUidC);
        return;
      }

      const vendorDocRefC = vendorQuerySnapshotC.docs[0].ref;

      // Update permit status in the database
      await updateDoc(vendorDocRefC, { permit: true });

      // Fetch updated data
      const updatedVendorSnapshot = await getDocs(vendorDocRefC);
      const updatedVendorData = updatedVendorSnapshot.data();

      // Update local state
      setPermitStatus(updatedVendorData.permit);
    } catch (error) {
      console.error('Error updating permit status:', error);
    }
  };
  const handleDelete = async (vendorUidCC) => {
    try {
      console.log('Button clicked for vendorUid:', vendorUidCC);
      const vendorsCollectionRefDelete = collection(fireDB, 'admins');

      const vendorQuerySnapshotCC = await getDocs(
        query(vendorsCollectionRefDelete, where('uid', '==', vendorUidCC), where('userId', '==', vendorUidCC))
        // query(vendorsCollectionRefDelete, where('uid', '==', vendorUidCC), where('role', '==', 'vendor'))

      );
      // console.log('Query:', query(vendorsCollectionRefDelete, where('uid', '==', vendorUidCC), where('role', '==', 'vendor')));

      console.log('Vendor found:', vendorUidCC);

      if (vendorQuerySnapshotCC.docs.length === 0) {
        console.error('Vendor not found with uid:', vendorUidCC);
        return;
      }

      const vendorDocRefCC = vendorQuerySnapshotCC.docs[0].ref;
      console.log(vendorDocRefCC);

      // Delete the document
      await deleteDoc(vendorDocRefCC);

      // Optionally, you can clear the local state or perform other actions as needed.
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  useEffect(() => {
    // Filter vendors based on the search input
    const filtered = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [searchInput, vendors]);

  useEffect(() => {
    // ... (existing code for fetching vendors)

    // Filter vendors based on the selected approval status
    const filtered = vendors.filter((vendor) => {
      if (selectedStatus === 'all') {
        return true; // Show all vendors
      } else if (selectedStatus === 'approved') {
        return vendor.permitStatusFF === true; // Show only approved vendors
      } else if (selectedStatus === 'notApproved') {
        return vendor.permitStatusFF === false; // Show only not approved vendors
      }
      return true;
    });

    setFilteredVendors(filtered);
  }, [selectedStatus, vendors]);

  return (
    <div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">All Vendors</div>
            <div className="dropdown">
            </div>
          </div>
          <form action="" className="flex items-center mb-4">
            <div className=" w-full mr-2">

              <input
              type="text"
              className="py-2 relative pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            </div>
            <select
          className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="notApproved">Not Approved</option>
        </select>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead >
                <tr >
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    ID
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Name
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Email
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Mobile
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Total Agreement
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    No. of Pincode
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Status
                  </th>
                  <th className="text-[12px] text-gray-600 uppercase tracking-wide font-bold  py-2 px-4 bg-gray-50 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
        {filteredVendors.map((vendor, index) => (
          <tr key={vendor.uid}>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                        #{index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-sm font-base text-slate-900 ">
                      {vendor.name}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-sm font-base text-slate-900 ">
                      {vendor.vendorEmail}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-sm font-base text-slate-900 ">
                      {vendor.vendorMobile}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-sm font-base text-slate-900 ">
                      {vendor.numberOfAgreements}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-sm font-base text-slate-900 ">
                      {vendor.numberOfUniquePincodes}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[12px] font-bold bg-gray-100 p-1 text-gray-400 ">
                  {console.log(vendor.permitStatusFF)}
                      {vendor.permitStatusFF === false ? (
                        <>
                          NOT APPROVED
                        </>
                      ) : (
                        <>
                        APPROVED
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-100 bg-red-500 rounded-sm p-1">
                      {console.log(vendor.permitStatusFF)}
                      {vendor.permitStatusFF === false ? (
                        <>
                          <button onClick={() => handleApprove(vendor.uid)}> [Approve] </button>
                        </>
                      ) : (
                        <button onClick={() => handleDelete(vendor.uid)}> [Delete] </button>
                      )}

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

export default Vendors;
