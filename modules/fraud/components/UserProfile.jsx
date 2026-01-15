
import React from 'react';

function UserProfile({ onProfileClick }) {
  return (
    <div className="card user-profile">
      
      <button className="button" onClick={onProfileClick}>
        View Profile
      </button>
    </div>
  );
}

export default UserProfile;
``
