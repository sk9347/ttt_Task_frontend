import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Spinner from '../utils/spinner';
const UserList = lazy(() => import('./UserList')); 

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiCall = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      setUserData(response.data);
      setLoading(false); 
    } catch (err) {
      console.error(err);
      setLoading(false); 
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleCreate = async (newUser) => {
    if (!newUser.userName || !newUser.email || !newUser.password) {
      alert('All fields are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/createUser', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUserData([...userData, response.data]);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleUpdate = async (updatedUser) => {
    if (!updatedUser.userName && !updatedUser.email && !updatedUser.password) {
      alert('No fields to update');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/users/${editingUser._id}`, updatedUser);
      setUserData(userData.map(user => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      setUserData(userData.filter(user => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='mt-10'>
      <h1 className='font-bold text-lg text-center'>Users</h1>
      <UserForm
        user={editingUser}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        onCancel={() => setEditingUser(null)}
      />
      
      {loading ? (
       <Spinner/>
      ) : (
        <Suspense fallback={<Spinner/>}>
          <UserList
            users={userData}
            onEdit={(user) => setEditingUser(user)}
            onDelete={handleDelete}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Users;
