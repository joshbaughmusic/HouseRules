import { useEffect, useState } from 'react';
import { fetchSingleUserProfile } from '../../managers/userProfilesManager.js';
import { Button, Table } from 'reactstrap';
import { fetchCompleteChore } from '../../managers/choresManager.js';

export const MyProfile = ({ loggedInUser }) => {
  const [userProfile, setUserProfile] = useState();

  const getSingleUserProfile = () => {
    fetchSingleUserProfile(loggedInUser.id).then(setUserProfile);
  };

  useEffect(() => {
    getSingleUserProfile();
  }, []);

  const handleComplete = (e) => {
    const newCompletion = {
      choreId: e.target.value,
      userProfileId: loggedInUser.id,
    };
    fetchCompleteChore(newCompletion).then(() => getSingleUserProfile());
  };

  if (!userProfile)
  {
    return null
  }
  return (
    <>
      <div className="container">
        <h2>My Due Chores:</h2>
        <Table>
            <thead>
                <tr>
                    <th>Chore</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                   userProfile.choreAssignments.map((ca, index) => {
                    return ca.chore.overdue ? (
                      <tr key={index}>
                        <td>{ca.chore.name}</td>
                        <td>
                          <Button
                            value={ca.chore.id}
                            color="primary"
                            onClick={handleComplete}
                          >
                            Complete
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      ''
                    );
                   })
                }
            </tbody>

        </Table>
      </div>
    </>
  );
};
