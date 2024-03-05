import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const AgreementForm = ({ isOpen, onClose }) => {
  const [agreementType, setAgreementType] = useState("Select Agreement Type");
  const [nameOfOwner, setNameOfOwner] = useState("");
  const [ownerMobileNo, setOwnerMobileNo] = useState("");
  const [nameOfTenant, setNameOfTenant] = useState("");
  const [tenantMobileNo, setTenantMobileNo] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [city, setCity] = useState("");
  const [tokenNo, setTokenNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [sroNo, setSroNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [brokerMobileNo, setBrokerMobileNo] = useState("");
  const [biometricVendorNameCity, setBiometricVendorNameCity] = useState("");
  const [biometricVendorMobileNo, setBiometricVendorMobileNo] = useState("");
  const [userId, setUid] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [agreementTypeOptionssetted, setAgreementTypeOptions] = useState([
    "Select Agreement Type",
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        setUid(user.uid);
        // console.log("users id is :",user.uid)
      } else {
        setUserUid(null);
      }
    });

    // Cleanup function to unsubscribe from the auth state changes
    return () => unsubscribe();
  }, []);

  const fetchData = async (uid) => {
    try {
      const agreementTypesCollectionRef = collection(fireDB, "agreementTypes");
      const agreementTypesDocRef = await addDoc(agreementTypesCollectionRef, {
        uid: uid,
      });
      setDocumentNo(agreementTypesDocRef.id);

      const docSnapshot = await getDoc(agreementTypesDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data().items || [];
        setItems(data);

        // Update the agreementTypeOptions array
        setAgreementTypeOptions(["Select Agreement Type", ...data]);
      }
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  const handleAddAgreement = async () => {
    if (agreementType === "Select Agreement Type") {
      return toast.error("Please select an agreement type");
    }

    const agreementRef = collection(fireDB, "admins");

    try {
      const agreementData = {
        agreementType,
        partyDetails: {
          nameOfOwner,
          ownerMobileNo,
          nameOfTenant,
          tenantMobileNo,
        },
        propertyDetails: {
          societyName,
          villageName,
          city,
        },
        registryDetails: {
          tokenNo,
          documentNo,
          sroNo,
          expiryDate,
        },
        otherDetails: {
          brokerName,
          brokerMobileNo,
          biometricVendorNameCity,
          biometricVendorMobileNo,
        },
        time: Timestamp.now(),
        userId,
      };

      console.log("Agreement Data:", agreementData);

      await addDoc(agreementRef, agreementData);

      toast.success("Agreement added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding agreement:", error);
      toast.error("Error adding agreement");
    }
  };

  if (!isOpen) {
    return null;
  }

  const agreementTypeOptions = [
    "Select Agreement Type",
    "Food license custmore",
    "rent agreement",
    "Pest contral custmore",
    "Rent property detail for broker",
    "name of change in mseb and corporation",
  ];

  return (
    <div className="  inset-0 z-50 flex items-center justify-center bg bg-opacity-50">
      <div className="modal-content mb-5  w-full m-auto md:w-50 bg-white border border-gray-100 shadow-md p-1 rounded-md">
        <div className="modal-header p-3 ps-4 bg-soft-warning">
          <h5 id="inviteMembersModalLabel" className="modal-title text-xl font-semibold">
            Agreement Form
          </h5>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body p-4">
          <div className="mb-4 ">
            <label className="form-label text-base">Agreement Type</label>
            <select
              className="form-select "
              value={agreementType}
              onChange={(e) => setAgreementType(e.target.value)}
            >
              {agreementTypeOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-6 ">
              <h5 className="text-base" style={{ fontWeight: 600 }}>Party Details</h5>
              <div className="mb-3 mt-2">
                <label className="form-label">Name of Owner</label>
                <input
                  type="text"
                  className="form-control"
                  value={nameOfOwner}
                  onChange={(e) => setNameOfOwner(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Owner Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  value={ownerMobileNo}
                  onChange={(e) => setOwnerMobileNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name Of Tenant</label>
                <input
                  type="text"
                  className="form-control"
                  value={nameOfTenant}
                  onChange={(e) => setNameOfTenant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tenant Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  value={tenantMobileNo}
                  onChange={(e) => setTenantMobileNo(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="text-base" style={{ fontWeight: 600 }}>Property Details</h5>
              <div className="mb-3 mt-2">
                <label className="form-label">Society Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={societyName}
                  onChange={(e) => setSocietyName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Village Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-6 mt-3">
              <h5 className="text-base" style={{ fontWeight: 600 }}>Registry Details</h5>
              <div className="mb-3 mt-2">
                <label className="form-label">Token No</label>
                <input
                  type="number"
                  className="form-control"
                  value={tokenNo}
                  onChange={(e) => setTokenNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Document No.</label>
                <input
                  type="number"
                  className="form-control"
                  value={documentNo}
                  onChange={(e) => setDocumentNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">SRO No.</label>
                <input
                  type="number"
                  className="form-control"
                  value={sroNo}
                  onChange={(e) => setSroNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                {/* You can use a date picker component here */}
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <h5 className="text-base" style={{ fontWeight: 600 }}>Other Details</h5>
              <div className="mb-3 mt-2">
                <label className="form-label">Broker Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={brokerName}
                  onChange={(e) => setBrokerName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Broker Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  value={brokerMobileNo}
                  onChange={(e) => setBrokerMobileNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Biometric Vendor Name & City
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={biometricVendorNameCity}
                  onChange={(e) => setBiometricVendorNameCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Biometric Vendor Mobile No.
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={biometricVendorMobileNo}
                  onChange={(e) => setBiometricVendorMobileNo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-light w-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary w-xs bg-red-500"
            onClick={handleAddAgreement}
          >
            Add Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementForm;
