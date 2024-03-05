import React, { useContext, useState, useEffect, useRef } from 'react';
import myContext from '../../../context/data/myContext';
import { auth, fireDB } from '../../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Agreements() {
  
  // const [activePanel, setActivePanel] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [numberOfAgreements, setNumberOfAgreements] = useState(0); 
  const [agreementType, setAgreementType] = useState([]); 
  const [numberOfVendors, setNumberOfVendors] = useState(0); 
  const [specificNumberOfAgreements, setSpecificNumberOfAgreements] = useState(0); 
  const [vendorNames, setVendorNames] = useState([]);
  const [agreementsData, setAgreementsData] = useState([]);
  const [agreementsDataNew, setAgreementsDataNew] = useState([]);
  const [vendorsCompNewData, setVendorsCompNewData] = useState([]);
  const dropdownRef = useRef(null);
  const context = useContext(myContext);
  const { mode } = context;

  const [activePanel, setActivePanel] = useState('dashboard');
  const [searchInput, setSearchInput] = useState('');
  const [filteredAgreements, setFilteredAgreements] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
        console.log(userEmail)
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
        const collectionRef = collection(fireDB, 'admins');
        const agreementsCollectionRef = collection(fireDB, 'admins'); 
        const vendorsCollectionRef = collection(fireDB, 'admins'); 
        const vendorsCollectionRefNew = collection(fireDB, 'admins'); 
        const adminsQuerySnapshot = await getDocs(
          query(vendorsCollectionRef, where('userId', '!=', 'userData.uid'))
        );   
        const adminsQuerySnapshotNew = await getDocs(
          query(vendorsCollectionRefNew, where('uid', '!=', 'userData.uid'))
        );  
const fetchData = async () => {
  try {
    const vendors = await Promise.all(
      adminsQuerySnapshot.docs.map(async (doc) => {
        try {
          const vendorData = doc.data();
          const agreementsQuerySnapshot = await getDocs(
            query(agreementsCollectionRef, where('userId', '!=', userData.uid))
          );

          console.log('data agreementsQuerySnapshot -> ', agreementsQuerySnapshot.docs);

          // Assuming you want to set agreement type for each agreement
          const agreementTypes = agreementsQuerySnapshot.docs.map((doc) => {
            const agreementData = doc.data();
            const agreementType = agreementData.agreementType; // Replace 'agreementType' with your actual field name
            console.log('Agreement Data:', doc.id, agreementData);
            console.log('Agreement Type:', agreementType);
            return agreementType;
          });

          // You may want to calculate numberOfAgreements based on the length of agreementTypes
          const numberOfAgreements = agreementTypes.length;

          return {
            name: vendorData.name,
            agreementTypes: agreementTypes,
            numberOfAgreements: numberOfAgreements,
          };
        } catch (error) {
          console.error('Error fetching vendor or agreement data:', error);
          return null; // Handle error appropriately
        }
      })
    );
    const vendorsCompData = await Promise.all(
      adminsQuerySnapshotNew.docs.map(async (doc) => {
        try {
          const vendorData = doc.data();
          const agreementsQuerySnapshotNew = await getDocs(
            query(agreementsCollectionRef, where('uid', '!=', userData.uid))
          );

          console.log('data agreementsQuerySnapshotNew -> ', agreementsQuerySnapshotNew.docs);

          // Assuming you want to set agreement type for each agreement
          const vendorsCompleteData = agreementsQuerySnapshotNew.docs.map((doc) => {
            const vendorsNewData = doc.data();
            const VendorsNames = vendorsNewData.name; 
            const VendorsUids = vendorsNewData.uid; // Replace 'agreementType' with your actual field name
            console.log('Vendors complete Data:', doc.id, vendorsNewData);
            console.log('Vendor Name:', VendorsNames);
            return VendorsNames;
          });

          // You may want to calculate numberOfAgreements based on the length of vendorsCompleteData
          const numberOfAgreements = vendorsCompleteData.length;

          return {
            name: vendorData.name,
            id: vendorData.uid,
            vendorsCompleteData: vendorsCompleteData,
          };
        } catch (error) {
          console.error('Error fetching vendor or agreement data:', error);
          return null; // Handle error appropriately
        }
      })
    );

    // Now vendors will be an array of objects, each containing name, agreementTypes, and numberOfAgreements
    console.log('Vendors:', vendors);
    console.log('Vendors Data:', vendorsCompData);
    setVendorsCompNewData(vendorsCompData);
  } catch (error) {
    console.error('Error fetching vendors:', error);
  }
};

// Call the fetchData function
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

        if (adminsQuerySnapshot.size > 0) {
          adminsQuerySnapshot.forEach((doc) => {
            console.log('Other Data:', doc.data());
          });
          console.log('Other Data:',data);
          console.log('Other Data:', data.map(item => item.agreementType));
          setAgreementsDataNew(data);
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
    window.location.href = '/loginAdmin';
  };

  useEffect(() => {
    // Filter agreements based on the search input
    const filtered = agreementsDataNew.filter((agreement) =>
      agreement.agreementType.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredAgreements(filtered);
  }, [searchInput, agreementsDataNew]);

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/loginAdmin';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const togglePanel = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div>
     
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">All Agreements</div>
            <div className="dropdown">
            </div>
          </div>
          <form action="" className="flex items-center mb-4">
            <div className="relative w-full mr-2">
            <input
            type="text"
            className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
              <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            </div>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                        ID
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                        Vendor
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                        Tenant
                      </th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                        Owner
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
                        Agreement Type
                      </th>
                    </tr>
              </thead>
              <tbody>{filteredAgreements.map((item, index) => (
          <tr key={item.id}>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                      {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                    {(() => {
                      for (const vendor of vendorsCompNewData) {
                        // console.log(vendor.id,' == ,',item.userId)
                        if (vendor.id === item.userId) {
                          console.log(vendor.vendorsCompleteData[0])
                          return vendor.vendorsCompleteData[0]; // Display the first name if there are multiple
                        }
                      }
                      return null; // Return null if no match is found
                    })()}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.partyDetails && item.partyDetails.nameOfTenant}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                      {item.partyDetails && item.partyDetails.nameOfOwner}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.partyDetails && item.partyDetails.tenantMobileNo}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.partyDetails && item.partyDetails.ownerMobileNo}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                      {item.otherDetails && item.otherDetails.brokerMobileNo}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.registryDetails && item.registryDetails.tokenNo}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.propertyDetails && item.propertyDetails.villageName}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                      >
                      {item.propertyDetails && item.propertyDetails.societyName}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                    {item.propertyDetails && item.propertyDetails.city}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">
                      {item.agreementType}
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
