import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className='flex bg-slate-400 p-4 mb-4'>
      <div>
        <h1>Name: {user.userName}</h1>
        <h2>Email: {user.email}</h2>
      </div>
      <div className='ml-auto'>
        <button
          onClick={() => onEdit(user)}
          className='bg-blue-500 text-white p-2 rounded'>
          Edit
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className='bg-red-500 text-white p-2 rounded ml-2'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
