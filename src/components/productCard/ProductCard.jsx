import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { query, collection, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import myContext from '../../context/data/myContext';
import Signup from '../../pages/registration/Signup'; // Replace with the actual path to your Signup component
import { MdOutgoingMail } from "react-icons/md";

function ProductCard({ pinCodeArray }) {
  const [userData, setUserData] = useState([]);
  const [signupOpen, setSignupOpen] = useState(false);
  const [sactivity, setActivity] = useState(false);
  const [sactid, setSactid] = useState();
  const context = useContext(myContext);
  const { mode } = context;
  const UserDataCollectionRef = collection(fireDB, 'admins');

  const toggleSignup = () => {
    setSignupOpen(!signupOpen);
  };

  const handleClick = async () => {
    try {
      // Check leadActivity for activity and actid
      const leadActivityDocRef = doc(fireDB, 'leadActivity', 'm8mTyrerAF9YXUfu1WcC');
      const leadActivitySnapshot = await getDoc(leadActivityDocRef);
      const { activity, actid } = leadActivitySnapshot.data();
      setActivity(activity);
      setSactid(actid);
      if (!activity || actid !== 1991) {
        setSignupOpen(true);
      }
    } catch (error) {
      console.error('Error checking LeadActivity document:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadActivityDocRef = doc(fireDB, 'leadActivity', 'm8mTyrerAF9YXUfu1WcC');
        const leadActivitySnapshot = await getDoc(leadActivityDocRef);
        const { activity, actid } = leadActivitySnapshot.data();
        setActivity(activity)
        setSactid(actid);

        if (activity && actid === 1991) {
          console.log('fetched');
        } else {
          console.log('false fetched');
          // setSignupOpen(true);
        }

        const userDataArray = [];

        for (const item of pinCodeArray) {
          const adminsQuerySnapshot1 = await getDocs(
            query(UserDataCollectionRef, where('uid', '==', item.puid))
          );

          adminsQuerySnapshot1.forEach((doc) => {
            userDataArray.push({ id: doc.id, ...doc.data() });
          });
        }

        setUserData(userDataArray);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, [pinCodeArray]);

  return (
    <section className=" body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
          Result For
          </h1>
          <p>Find your agreement partner from our experienced partners</p>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>
        <div className="flex flex-wrap -m-4">
  {pinCodeArray.map((item, index) => (
    <div key={index} className="p-4 md:w-1/3">
      <div className={`h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${mode === 'dark' ? 'bg-gray-800' : ''}`}>
        <div className="p-5 border-t-2">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
            {userData.length > 0 && userData[index] && userData[index].uid === item.puid ? (
              <div>
              {userData[index].name}
              </div>
            ) : null}
          </h2>
          <h3 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
            {userData.length > 0 && userData[index] && userData[index].uid === item.puid ? (
              <div>
              {userData[index].address}
              </div>
            ) : null}
          </h3>
          {/* <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
            {userData.length > 0 && userData[index] && userData[index].uid === item.puid ? (
              <div>
                <a
                  href={sactivity === true && sactid === 1991 ? `https://www.google.com/maps?q=${userData[index].latitude},${userData[index].longitude}` : null}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={sactivity === true && sactid === 1991 ? null : handleClick}
                  className="text-yellow-500 hover:underline"
                >
                  Get Directions
                </a>
              </div>
            ) : null}
          </h1> */}
          <p className="leading-relaxed mb-3">
            {/* Additional information goes here */}
          </p>
          <div className="flex justify-around mt-4"> {userData.length > 0 && userData[index] && userData[index].uid === item.puid ? (
              <div>
                <a
                  href={sactivity === true && sactid === 1991 ? `https://www.google.com/maps?q=${userData[index].latitude},${userData[index].longitude}` : null}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={sactivity === true && sactid === 1991 ? null : handleClick}
                  className="text-yellow-500 hover:underline"
                >
            <button type="button" className={`focus:outline-none text-black bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-400 font-medium rounded-lg text-sm px-4 py-2 ${mode === 'dark' ? 'border-yellow-600' : ''}`}>
            Get Directions
            </button>
            </ a>
            </ div>
            ) : null}
            <MdOutgoingMail size={35}/>
            <button type="button" className={`focus:outline-none text-black bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-400 font-medium rounded-lg text-sm px-4 py-2 ${mode === 'dark' ? 'border-yellow-600' : ''}`}>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


        <Transition.Root show={signupOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={toggleSignup}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <Signup onClose={toggleSignup} /> {/* Pass onClose function to close the modal */}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </section>
  );
}

export default ProductCard;
