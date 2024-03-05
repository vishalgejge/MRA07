import React, { useState, useEffect } from 'react';
import { auth, fireDB } from '../../../../firebase/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUser2(user);  
      console.log('->', user?.email);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loading || !user || !userEmail || !oldPassword || !newPassword || !confirmPassword) {
        console.error('Invalid form data.');
        return;
      }

      if (newPassword !== confirmPassword) {
        console.error('New password and confirm password do not match.');
        return;
      }

      // Update the password in Firebase Authentication
      const authInstance = getAuth();
      const user = authInstance.currentUser;

      if (!user) {
        console.error('User not authenticated.');
        return;
      }

      const credentials = EmailAuthProvider.credential(userEmail, oldPassword);
      await reauthenticateWithCredential(user, credentials);


      // Now, update the password in the "admins" collection in Firestore
      const adminsCollection = collection(fireDB, 'admins');
      const userDocQuery = query(adminsCollection, where('email', '==', userEmail));
      const querySnapshot = await getDocs(userDocQuery);

      if (!querySnapshot.empty) {
        const userId = userID;
        await updateDoc(doc(adminsCollection, userId), { password: newPassword });
      
        // Optional: You can also update the state or perform any other actions here.
      }

      // Clear password fields after successful update
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Optionally, you can redirect the user or display a success message.
    } catch (error) {
      console.error('Error updating password:', error.message);
      // Handle errors, e.g., display an error message to the user.
    }
  };


  return (
    <div className="card-body p-4">
      <div className="tab-content">
        <div className="tab-pane fade active show" id="ngb-nav-1" role="tabpanel" aria-labelledby="ngb-nav-1">
          <form noValidate onSubmit={handleSubmit} className="row g-2">
            <div className="col-lg-4">
              <div>
                <label htmlFor="oldPasswordInput" className="form-label text-sm font-semibold text-slate-800">
                  Old Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div>
                <label htmlFor="newPasswordInput" className="form-label text-sm font-semibold text-slate-800">
                  New Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div>
                <label htmlFor="confirmPasswordInput" className="form-label text-sm font-semibold text-slate-800">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="text-end">
                <button type="submit" className="btn btn-success bg-gray-400 text-white border-none">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
