import React, { useState, useEffect } from 'react';
import AddItems from './setting-content/AddItems';
import ChangePasswordPage from './setting-content/ChangePasswordPage';
import { storage } from '../../../firebase/firebaseConfig';
import { auth, fireDB } from '../../../firebase/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [userUid, setUserUid] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef);
      console.log(url);
      setImageUrl(url);

      // Update the user's profileURL in Firestore
      updateProfileUrlInFirestore(userUid, url);
    }
  };

  const updateProfileUrlInFirestore = async (uid, url) => {
    try {
      const userRef = collection(fireDB, 'admins');
      const querySnapshot = await getDocs(query(userRef, where('uid', '==', uid)));

      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, { profileURL: url });
      }
    } catch (error) {
      console.error('Error updating profileURL in Firestore:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email;
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
        setUserUid(userData.uid);
        console.log('->',userData.profileURL) 
        setProfileImageUrl(userData.profileURL)// Set the user UID in state
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };


    return (
      <>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="tabs-example" role="tablist">
            <li className="me-2" role="presentation">
              <button
                className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${activeTab === 'profile' ? 'border-gray-300 text-gray-600' : ''}`}
                id="profile-tab-example"
                type="button"
                role="tab"
                aria-controls="profile-example"
                aria-selected={activeTab === 'profile'}
                onClick={() => handleTabClick('profile')}
              >
                Profile
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${activeTab === 'dashboard' ? 'border-gray-300 text-gray-600' : ''}`}
                id="dashboard-tab-example"
                type="button"
                role="tab"
                aria-controls="dashboard-example"
                aria-selected={activeTab === 'dashboard'}
                onClick={() => handleTabClick('dashboard')}
              >
                Agreement Type
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${activeTab === 'settings' ? 'border-gray-300 text-gray-600' : ''}`}
                id="settings-tab-example"
                type="button"
                role="tab"
                aria-controls="settings-example"
                aria-selected={activeTab === 'settings'}
                onClick={() => handleTabClick('settings')}
              >
                Change Password
              </button>
            </li>
          </ul>
        </div>
        <div id="tabContentExample">
        <div
        className={`rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${activeTab === 'profile' ? '' : 'hidden'}`}
        id="profile-example"
        role="tabpanel"
        aria-labelledby="profile-tab-example"
      >
     <label htmlFor="profile-image" className="relative cursor-pointer">
          {profileImageUrl ? (
            <img
            className="rounded-full w-28 h-28"
              src={profileImageUrl}
              alt="Profile"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="rounded-full w-96 h-96 bg-gray-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a6 6 0 00-6 6H4a8 8 0 008-8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12v0a8 8 0 01-8 8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v0a8 8 0 008 8" />
              </svg>
            </div>
          )}
        </label>
    <input
      type="file"
      className="hidden"
      id="profile-image"
      name="profileImage"
      onChange={(e) => handleFileChange(e)}
    />
    
    <button className={` bg-sky-800 h-10 inline-block align-middle p-2 mt-5 text-white rounded ${
      activeTab === "settings" ? "border-gray-300 text-gray-600"  : ''}`}
                onClick={handleUpload}>Upload Image</button>
    {/* {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />} */}
  </div>

          <div
            className={`rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${activeTab === 'dashboard' ? '' : 'hidden'}`}
            id="dashboard-example"
            role="tabpanel"
            aria-labelledby="dashboard-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <AddItems />
            </p>
          </div>
          <div
            className={`rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${activeTab === 'settings' ? '' : 'hidden'}`}
            id="settings-example"
            role="tabpanel"
            aria-labelledby="settings-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <ChangePasswordPage />
            </p>
          </div>
          <div
            className={`rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${activeTab === 'contacts' ? '' : 'hidden'}`}
            id="contacts-example"
            role="tabpanel"
            aria-labelledby="contacts-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content for the Contacts tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.
            </p>
          </div>
        </div>
      </>
    );
  };

  export default Setting;
