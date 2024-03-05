import React, { useState, useEffect } from 'react';
import { auth, fireDB } from '../../../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PersonalDetails = () => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [firmName, setFirmName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userNumber, setUserNumber] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUser2(user);
      console.log('->', user?.uid);
      if (user) {
        setUserID(user.uid);
        setUserEmail(user.email);
        setLoading(false);
      } else {
        console.error('User not logged in.');
        setLoading(false);
        // You may want to redirect to the login page or handle this case accordingly
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const adminsCollection = collection(fireDB, 'admins');
        const userDocQuery = query(adminsCollection, where('uid', '==', user.uid));

        try {
          const querySnapshot = await getDocs(userDocQuery);
          querySnapshot.forEach((doc) => {
            // Access your document data here using doc.data()
            // console.log('Document data:', doc.data());
            const userData = doc.data();
            setFirmName(userData.firmName);
            setUserName(userData.name);
            setUserAddress(userData.address);
            setUserEmail(userData.email);
            setUserNumber(userData.mobile);
            setUserLatitude(userData.latitude);
            setUserLongitude(userData.longitude);
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);
  
  return (
    <div className="card-body ">
      <div className="tab-content">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="ngb-nav-0-panel" role="tabpanel" aria-labelledby="ngb-nav-0">
            <form noValidate action="javascript:void(0);" className="ng-untouched ng-pristine ng-valid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="firmNameInput" className="form-label text-slate-800 font-medium">Firm Name</label>
                    <input type="text" id="firmNameInput" value={firmName} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label font-medium text-slate-800">Name</label>
                    <input type="text" id="nameInput" value={userName} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label text-slate-800 font-medium">Email</label>
                    <input type="email" id="emailInput" value={userEmail} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="phoneNumberInput" className="form-label text-slate-800 font-medium">Phone Number</label>
                    <input type="number" id="phoneNumberInput" value={userNumber} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label text-slate-800 font-medium">Address</label>
                    <input type="text" id="addressInput" value={userAddress} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="latitudeInput" className="form-label text-slate-800 font-medium">Latitude</label>
                    <input type="text" id="latitudeInput" value={userLatitude} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="longitudeInput" className="form-label text-slate-800 font-medium">Longitude</label>
                    <input type="text" id="longitudeInput" value={userLongitude} className="form-control ng-untouched ng-pristine ng-valid" />
                  </div>
                </div>
                <p className="btn btn-link text-sky-800 font-normal text-sm">Get My Location</p>
                <div className="col-lg-12">
                  <div className="hstack gap-2 justify-content-end">
                    <button type="submit" className="bg-sky-800 text-white px-3 py-2 font-medium rounded-md hover:bg-sky-900">Update</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
