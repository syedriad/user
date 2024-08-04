import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, logout } from './auth/auth';
import {auth} from "./auth/firebaseConfig"

import UserList from './components/UserList';
import UserDetail from './components/UserDetails';
import Login from './components/Login';
// import 'datatables.net-dt/css/jquery.dataTables.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsAuthChecked(true);  // Ensure that the auth state check is complete
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setSelectedUser(null);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  // Render a loading state until auth state is checked
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {currentUser ? (
        <>
          <button className='p-2 bg-red-400 rounded-lg mt-2 ml-5'  onClick={handleLogout}>Logout</button>
          <UserList onSelectUser={setSelectedUser} />
          <UserDetail user={selectedUser} currentUser={currentUser} />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
