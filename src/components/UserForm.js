import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });

  useEffect(() => {
    if (user) {
      setFormData({ userName: user.userName, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className='mt-4'>
      <h1 className='font-extrabold' >{user ? 'Edit User' : 'Create New User'}</h1>
      <input
        type='text'
        name='userName'
        placeholder='UserName'
        value={formData.userName}
        onChange={handleChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        className='bg-green-500 text-white p-2 rounded mt-2'>
        {user ? 'Update' : 'Create User'}
      </button>
      <button
        onClick={onCancel}
        className='bg-gray-500 text-white p-2 rounded mt-2 ml-2'>
        Cancel
      </button>
    </div>
  );
};

export default UserForm;
