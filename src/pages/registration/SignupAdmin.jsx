import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function SignupAdmin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d{10}$/;
        return re.test(phoneNumber);
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;

        switch (strength) {
            case 0:
            case 1:
                return "Very Weak";
            case 2:
                return "Weak";
            case 3:
                return "Medium";
            case 4:
                return "Strong";
            case 5:
                return "Very Strong";
            default:
                return "";
        }
    };

    const signupAdmin = async () => {
        setLoading(true);

        if (!name || !email || !password || !mobile || !address || !latitude || !longitude) {
            setLoading(false);
            return toast.error("All fields are required.");
        }

        if (!validateEmail(email)) {
            setLoading(false);
            return toast.error("Invalid email address.");
        }

        if (!validatePhoneNumber(mobile)) {
            setLoading(false);
            return toast.error("Invalid phone number.");
        }

        if (passwordStrength === "Very Weak" || passwordStrength === "Weak") {
            setLoading(false);
            return toast.error("Password is too weak.");
        }

        try {
            const admins = await createUserWithEmailAndPassword(auth, email, password);

            const admin = {
                name: name,
                uid: admins.user.uid,
                email: admins.user.email,
                mobile: mobile,
                address: address,
                role: 'vendor',
                permit: false,
                latitude: latitude,
                longitude: longitude,
                time: Timestamp.now(),
            };

            const adminRef = collection(fireDB, "admins");
            await addDoc(adminRef, admin);
            toast.success("Signup Successfully");
            navigate('/loginVendor');
            setName("");
            setEmail("");
            setPassword("");
            setMobile("");
            setAddress("");
            setLatitude("");
            setLongitude("");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                    toast.error("Error getting location");
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {loading && <Loader />}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Signup</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="input"
                    placeholder="Password"
                />
                {passwordStrength && <p className="text-sm text-gray-600">Password Strength: {passwordStrength}</p>}
                <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="input"
                    placeholder="Mobile"
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                    placeholder="Address"
                />
                <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="input"
                    placeholder="Latitude"
                />
                <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="input"
                    placeholder="Longitude"
                />
                <div className="flex justify-between mt-4">
                    <button onClick={getLocation} className="btn-green">Get My Location</button>
                    <button onClick={signupAdmin} className="btn-red">Signup</button>
                </div>
                <div className="flex justify-center mt-4">
                    <p className="text-gray-800 text-sm">
                        Have an account <Link to="/loginVendor" className="text-green-800">Login Vendor</Link>
                    </p>
                </div>
                <div className="flex justify-center mt-2">
                    <p className="text-gray-800 text-sm">
                        Go to <Link to="/" className="text-green-800">home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupAdmin;
