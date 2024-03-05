import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/firebaseConfig';

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserData = async (email) => {
    const userRef = collection(fireDB, 'admins');
    const querySnapshot = await getDocs(query(userRef, where('email', '==', email)));

    if (querySnapshot.size > 0) {
      return querySnapshot.docs[0].data();
    }

    return null;
  };
  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(email);
  
      console.log('User Data:', userData);
  
      if (userData && userData.permit && userData.role === 'admin') {
        console.log('Redirecting to admin dashboard...');
        localStorage.setItem('user', JSON.stringify(result));
        toast.success('Signin Successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        
        navigate('/dashboard');
      } else {
        toast.error('Only Admin can login...', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        console.error('Invalid user or role');
      }
    } catch (error) {
      toast.error('Signin Failed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      console.error('Signin error:', error.message);
    }
    setLoading(false);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl '>
        <div className=''>
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Login Admin</h1>
        </div>
        <div>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button
            onClick={signin}
            className='bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'
          >
            Login
          </button>
        </div>
        <div className='flex justify-center mb-3'>
        <Link className='bg-blue-300 w-2/3 text-black text-center font-bold  px-2 py-2 rounded-lg' to={'/loginVendor'}>
        
            Login Partner
            </Link>
        </div>
        <div>
          <h2 className='text-white'>
            Don't have an account{' '}
            <Link className='text-yellow-500 font-bold' to={'/signupAdmin'}>
              Signup
            </Link>
          </h2>
        </div>
          <h2 className='text-white'>
            Forgot Password{' '}
            <Link className='text-yellow-500 font-bold' to={'/resetpass'}>
              Click Here
            </Link>
          </h2>
        </div>
      </div>
  );
}

export default LoginAdmin;