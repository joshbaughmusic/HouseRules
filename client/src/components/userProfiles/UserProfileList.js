import React, { useEffect, useState, Fragment } from 'react';
import { fetchUserProfiles } from '../../managers/userProfilesManager.js';
import { UserProfileCard } from './UserProfileCard.js';

export const UserProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    fetchUserProfiles().then(setUserProfiles);
  };

  useEffect(() => {
    getUserProfiles();
  }, []);

  if (!userProfiles) {
    return null;
  }

  return (
    <>
      <div className="container">
        {userProfiles.map((userProfile, index) => (
            <UserProfileCard
              key={index}
              userProfile={userProfile}
            />
          
        ))}
      </div>
    </>
  );
};
