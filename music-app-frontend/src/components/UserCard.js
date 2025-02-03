import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="card-text">
          <strong>Points:</strong> {user.points}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
