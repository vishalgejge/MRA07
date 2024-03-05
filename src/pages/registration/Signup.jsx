import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/firebaseConfig';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import axios from 'axios';

function Signup({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNumber, setMobNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const sendOtp = async (mobNumber, generatedOtp) => {
    const apiUrl = `https://www.txtguru.in/imobile/api.php?username=tectigonitsolutions.com&password=61458510&source=TECTIT&dmobile=${mobNumber}&message=OTP ${generatedOtp} for customer registration Maharashtra Rent Agreement TECTIT&dlttempid=1507166029055621421`;
  
    try {
      const response = await axios.get(apiUrl);
      if (response.data && response.data.status === 'success') {
        toast.success('OTP sent successfully');
        return true;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      console.error('Full error object:', error);
      toast.error('Failed to send OTP. Please try again.');
      return false;
    }
  };

  

  const handleSendOtp = async () => {
    setLoading(true);
    const generatedOtp = generateOtp();
    const otpSent = await sendOtp(mobNumber, generatedOtp);
    if (otpSent) {
      setOtp(generatedOtp);
      setIsOtpSent(true);
    }
    setLoading(false);
  };

  const verifyOtp = () => {
    if (otp === enteredOtp) {
      toast.success('OTP verification successful');
      signup();
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const signup = async () => {
    setLoading(true);

    if (name === "" || mobNumber === "" || email === "") {
      setLoading(false);
      return toast.error("All fields are required");
    }

    try {
      const user = {
        name: name,
        email: email,
        number: mobNumber,
        otp: otp,
      };

      const userRef = collection(fireDB, "leads");
      await addDoc(userRef, user);

      const userRefa = doc(fireDB, 'leadActivity', 'm8mTyrerAF9YXUfu1WcC'); // Assuming 'm8mTyrerAF9YXUfu1WcC' is the document ID

      const data = {
        activity: true,
      };
      
      await updateDoc(userRefa, data);
      console.log('LeadActivity document updated successfully');

      console.log('Signup successful:', user);
      toast.success("Signup Successful");

      setName("");
      setEmail("");
      setMobNumber("");
      setOtp("");
      setIsOtpSent(false);
      setLoading(false);

      onClose(user);
    } catch (error) {
      console.error('Error inserting data:', error);
      setLoading(false);
      toast.error("Failed to insert data. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Signup</h1>
        </div>

        {!isOtpSent ? (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <input
                type="number"
                value={mobNumber}
                onChange={(e) => setMobNumber(e.target.value)}
                name="mobnumber"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Mobile Number"
              />
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={handleSendOtp}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-red"
                disabled={loading}
              >
                {loading ? <Loader /> : "Send OTP"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                name="otp"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Enter OTP"
              />
            </div>
            
            <div className="flex justify-center mb-4">
              <button
                onClick={verifyOtp}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-red"
                disabled={loading}
              >
                {loading ? <Loader /> : "Verify OTP"}
              </button>
            </div>
          </>
        )}

        <div className="text-gray-600 text-center">
          <p>
            Have an account?{' '}
            <Link className="text-red-500 font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
