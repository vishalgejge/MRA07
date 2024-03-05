import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Signup from "../../pages/registration/Signup";
import heroImage from "../images/homeImage.jpg"; // Adjust the path accordingly
import bgImage from "../images/bg1.png"; // Adjust the path accordingly
import ProductCard from "../../components/productCard/ProductCard";
import { doc, query, collection, getDoc, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";

import "../../components/heroSection/hero.css";

// const pincodesCollectionRef = collection(fireDB, 'admins');

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pinCodeArray, setPinCodeArray] = useState([]);
  // const [signupOpen, setSignupOpen] = useState(false);

  // const toggleSignup = () => {
  //   setSignupOpen(!signupOpen);
  // };
  const handleSearch = async () => {
    try {
      // Removed the condition for checking lead activity
      console.log("fetched");
      const pincodesCollectionRef = collection(fireDB, "admins");

      const pincodesQuery = query(pincodesCollectionRef);
      const pincodesSnapshot = await getDocs(pincodesQuery);

      const pincodesData = [];
      pincodesSnapshot.forEach((doc) => {
        pincodesData.push({ id: doc.id, ...doc.data() });
      });

      const filteredPincodes = pincodesData.filter((item) => {
        console.log("item.pincode:", item.pincode);
        console.log("searchQuery:", searchQuery);
        return item.pincode && item.pincode.includes(searchQuery);
      });
      if (filteredPincodes.length > 0) {
        // Set the pincode array using setPinCodeArray
        setPinCodeArray(filteredPincodes);
        // Optionally, you can perform additional actions based on the filtered pincodes
        // For example, you might want to update the UI or trigger some other logic
      } else {
        // Handle the case where no matching pincodes were found
        console.log("No matching pincodes found");
      }
      console.log("Filtered Pincodes:", filteredPincodes);
      console.log("Alert will be shown next");
      // alert(`Searching for: ${searchQuery}`);
      console.log("After alert");
    } catch (error) {
      console.error("Error checking LeadActivity document:", error);
    }
    // };
  };

  return (
    <div>
      <div className="hero-body">
        <img src={bgImage} alt="img bg" className="hero-img" />

        <div className="hero-content">
          <h1 className="">Rental Agreements Made Easy</h1>
          <span className="sub-content">
            Find the right agent to register your e-rental agreement online.
          </span>
          <div className="search">
            <input
              type="text"
              id="zipCode"
              placeholder="Search for agreement "
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="">
              Search
            </button>
          </div>
        </div>
      </div>
      {pinCodeArray.length > 0 && (
        <>
          {console.log("Array ->", pinCodeArray)}
          <ProductCard pinCodeArray={pinCodeArray} />
        </>
      )}
    </div>
  );
}

export default HeroSection;
