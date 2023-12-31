import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleUserProfile } from '../../managers/userProfilesManager.js';
import { Table } from 'reactstrap';

export const UserProfileDetails = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});

  const getSingleUserProfile = () => {
    fetchSingleUserProfile(id).then(setUserProfile);
  };

  useEffect(() => {
    getSingleUserProfile();
  }, []);

  const calculateFilledStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    return stars;
  };
  const calculateEmptyStars = (num) => {
    const number = 5 - num;
    if (number == 0) {
      return '';
    } else {
      const stars = [];
      for (let i = 0; i < number; i++) {
        stars.push(<span key={i}>&#9734;</span>);
      }
      return stars;
    }
  };

  return (
    <>
      <div className="container">
        <br />
        <h2>
          {userProfile.firstName} {userProfile.lastName} Details:
        </h2>
        <Table>
          <thead>
            <tr>
              <td>Address</td>
              <td>Email</td>
              {userProfile.username ? <td>User Name</td> : ''}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userProfile.address}</td>
              <td>{userProfile.email}</td>
              {userProfile.username ? <td>{userProfile.username}</td> : ''}
            </tr>
          </tbody>
        </Table>
        <br />
        <h4>Chore Assignments:</h4>
        <Table>
          <thead>
            <tr>
              <td>Chore</td>
              <td>Difficulty</td>
              <td>Frequency</td>
            </tr>
          </thead>
          <tbody>
            {userProfile.choreAssignments?.map((ca, index) => (
              <tr key={index}>
                <td>{ca.chore.name}</td>
                <td>
                  {calculateFilledStars(ca.chore.difficulty)}
                  {calculateEmptyStars(ca.chore.difficulty)}
                </td>
                <td>Every {ca.chore.choreFrequencyDays} days</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <h4>Chore Completions:</h4>
        <Table>
          <thead>
            <tr>
              <td>Chore</td>
              <td>Completed On</td>
            </tr>
          </thead>
          <tbody>
            {userProfile.choreCompletions?.map((cc, index) => (
              <tr key={index}>
                <td>{cc.chore.name}</td>
                <td>{new Date(cc.completedOn).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
