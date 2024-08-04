import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetail = ({ user, currentUser }) => {
  const [role, setRole] = useState(user?.role || '');
  const [active, setActive] = useState(user?.active || false);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setActive(user.active);
    }
  }, [user]);

  const handleRoleChange = async (event) => {
    const newRole = event.target.value;
    if (currentUser.role !== 'super admin') {
      alert('You are not authorized for this action');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/users/${user._id}/role`, { role: newRole });
      setRole(newRole);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleActiveToggle = async () => {
    const newActiveStatus = !active;
    try {
      await axios.put(`http://localhost:5000/users/${user._id}/active`, { active: newActiveStatus });
      setActive(newActiveStatus);
      // Optionally update the user's activity history here
    } catch (error) {
      console.error('Error updating active status:', error);
    }
  };

  if (!user) {
    return <div className="p-4 text-gray-500">Select a user to see details</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <p className="mb-2"><strong>Name:</strong> {user.name}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Status:</strong> {active ? 'Active' : 'Inactive'}</p>
      <p className="mb-2">
        <strong>Role:</strong>
        {currentUser.role === 'super admin' ? (
          <select
            value={role}
            onChange={handleRoleChange}
            className="ml-2 p-1 border rounded"
          >
            <option value="super admin">Super Admin</option>
            <option value="system user">System User</option>
          </select>
        ) : (
          role
        )}
      </p>
      <button
        onClick={handleActiveToggle}
        className={`mt-4 px-4 py-2 rounded ${active ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {active ? 'Mark as Inactive' : 'Mark as Active'}
      </button>
    </div>
  );
};

export default UserDetail;
