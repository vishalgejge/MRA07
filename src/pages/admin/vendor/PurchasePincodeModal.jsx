import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { auth, fireDB } from '../../../firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const PurchasePincodeModal = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState('');
  const [pincodeList, setPincodeList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log('User UID:', user ? user.uid : 'No user');
    });

    return () => unsubscribe();
  }, []);

  const handleAddPincode = () => {
    if (pincode.trim() !== '') {
      setPincodeList([...pincodeList, pincode]);
      setPincode('');
    }
  };

  const handlePurchase = async () => {
    if (user) {
      try {
        const userDocRef = doc(fireDB, 'admins', user.uid);
        const userDoc = await getDoc(userDocRef);

        console.log('User document data:', userDoc.exists() ? userDoc.data() : 'Document not found', user.uid);
        const existingPincodes = userDoc.data()?.pincode || [];
        const updatedPincodes = [...existingPincodes, ...pincodeList];
        console.log('Updated Pincodes:', updatedPincodes); 
        await setDoc(userDocRef, { puid:user.uid, pincode: updatedPincodes }, { merge: true });
        if (userDoc.exists()) {
          onClose(); // Close the modal after a successful update
        } else {
          console.error('User document not found');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal-content w-50 bg-white border border-gray-100 shadow-md p-6 rounded-md">
      <div className="modal-header p-3 ps-4 bg-soft-warning">
        <h5 id="inviteMembersModalLabel" className="modal-title">
          Purchase Pincode
        </h5>
        <button type="button" onClick={onClose} aria-label="Close" className="btn-close"></button>
      </div>
      <div className="modal-body p-4">
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter Pincode"
            className="form-control ng-untouched ng-pristine ng-valid"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button type="button" id="button-addon2" className="btn btn-primary" onClick={handleAddPincode}>
            <FiPlus className='text-black' />
          </button>
        </div>
        <ul>
          {pincodeList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        </div>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-light w-xs">
            Cancel
          </button>
          <button type="button" className="btn btn-primary w-xs bg-red-500" onClick={handlePurchase}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePincodeModal;
