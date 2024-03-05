

import React from 'react';

const Sidebar = ({ togglePanel }) => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
      <div className="flex items-center pb-4 border-b border-b-gray-800">
        <img
          src="https://maharashtrarentagreement.com/assets/images/land-logo.png"
          alt=""
          className="inline-block w-60 h-15"
        />
      </div>
      <ul className="mt-4">
        <li className="mb-1 group">
          <div
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            onClick={() => togglePanel('dashboard')}
          >
            <i className="ri-home-2-line mr-3 text-lg" />
            <span className="text-sm">Dashboard</span>
          </div>
        </li>
        <li className="mb-1 group">
          <div
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            onClick={() => togglePanel('Vendors')}
          >
            <i className="ri-instance-line mr-3 text-lg" />
            <span className="text-sm">Vendors</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
          </div>
        </li>
        <li className="mb-1 group">
          <div
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            onClick={() => togglePanel('Leads')}
          >
            <i className="ri-instance-line mr-3 text-lg" />
            <span className="text-sm">Leads</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
          </div>
        </li>
        <li className="mb-1 group">
          <div
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            onClick={() => togglePanel('Agreements')}
          >
            <i className="ri-instance-line mr-3 text-lg" />
            <span className="text-sm">Agreements</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
          </div>
        </li>
        <li className="mb-1 group">
          <div
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
            onClick={() => togglePanel('Reports')}
          >
            <i className="ri-instance-line mr-3 text-lg" />
            <span className="text-sm">Reports</span>
            <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
          </div>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
