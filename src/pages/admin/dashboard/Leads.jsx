import React, { useState, useEffect } from 'react';
import { auth, fireDB } from '../../../firebase/firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    const fetchLeadsData = async () => {
      const leadsCollection = collection(fireDB, 'leads');
      const userDocQuery = query(leadsCollection);

      try {
        const querySnapshot = await getDocs(userDocQuery);
        const leadsData = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          leadsData.push({
            name: userData.name,
            email: userData.email,
            mobile: userData.number,
          });
        });

        setLeads(leadsData);
        setFilteredLeads(leadsData); // Set filtered leads initially to all leads
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    };

    fetchLeadsData();
  }, []); // empty dependency array to run only once when the component mounts

  useEffect(() => {
    // Filter leads based on the search input
    const filtered = leads.filter((lead) =>
      lead.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredLeads(filtered);
  }, [searchInput, leads]);

  return (
    <div>
     
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="flex justify-between mb-4 items-start">
            <div className="font-medium">All Leads</div>
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
                    Name
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Email
                  </th>
                  <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                    Mobile Number
                  </th>
                  </tr>
              </thead>
              <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <div className="flex items-center">
                      <div className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                        #{index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">{lead.name}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">{lead.email}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-b-gray-50">
                    <span className="text-[13px] font-medium text-gray-400">{lead.mobile}</span>
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

export default Leads;
