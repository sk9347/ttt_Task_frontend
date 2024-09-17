import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className='mt-10'>
      {users.length > 0 ? (
        users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
