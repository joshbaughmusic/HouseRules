import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchAssignChore,
  fetchSingleChore,
  fetchUnassignChore,
} from '../../managers/choresManager.js';
import { Button, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { fetchUserProfiles } from '../../managers/userProfilesManager.js';
import { ChoreEdit } from './ChoreEdit.js';

export const ChoresDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState();
  const [userProfiles, setUserProfiles] = useState();
  const navigate = useNavigate();

  const getSingleChore = () => {
    fetchSingleChore(id).then(setChore);
  };

  const getUserProfiles = () => {
    fetchUserProfiles(id).then(setUserProfiles);
  };

  useEffect(() => {
    getSingleChore();
    getUserProfiles();
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

  const handleNewCheck = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const assignmentToSend = {
        choreId: chore.id,
        userProfileId: parseInt(e.target.value),
      };
      fetchAssignChore(assignmentToSend).then(() => getSingleChore());
    } else {
      const unassignmentToSend = {
        choreId: chore.id,
        userProfileId: parseInt(e.target.value),
      };
      fetchUnassignChore(unassignmentToSend).then(() => getSingleChore());
    }
  };

  if (!chore || !userProfiles) {
    return null;
  }

  return (
    <>
      <div className="container">
        <br />
        <ChoreEdit
          chore={chore}
          getSingleChore={getSingleChore}
        />
        <br />
        <br />
        <h2>{chore.name} Details:</h2>
        <Table>
          <thead>
            <tr>
              <td>Difficulty</td>
              <td>Frequency</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {calculateFilledStars(chore.difficulty)}
                {calculateEmptyStars(chore.difficulty)}
              </td>
              <td>Every {chore.choreFrequencyDays} days</td>
            </tr>
          </tbody>
        </Table>
        {/* <br />
        <h4>Chore Assignments:</h4>
        <Table>
          <thead>
            <tr>
              <td>Person</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {chore.choreAssignments?.map((ca, index) => (
              <tr key={index}>
                <td>
                  {`${ca.userProfile.firstName} ${ca.userProfile.lastName}`}
                </td>
                <td>
                  <Button
                    value={ca.userProfile.id}
                    color="primary"
                    onClick={() =>
                      navigate(`/userprofiles/${ca.userProfile.id}`)
                    }
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> */}
        <br />
        <h4>Chore Completions:</h4>
        <Table>
          <thead>
            <tr>
              <td>Person</td>
              <td>Completed On</td>
            </tr>
          </thead>
          <tbody>
            {chore.choreCompletions?.map((cc, index) => (
              <tr key={index}>
                {
                  <td>
                    {`${cc.userProfile.firstName} ${cc.userProfile.lastName}`}
                  </td>
                }
                <td>{new Date(cc.completedOn).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <h4>Chore Assignments:</h4>
        <Form>
          {userProfiles.map((up) => {
            return (
              <>
                <FormGroup>
                  <Label htmlFor={`up--${up.id}`}>
                    {`${up.firstName} ${up.lastName}`}
                  </Label>
                  <Input
                    name={`up--${up.id}`}
                    type="checkbox"
                    value={up.id}
                    checked={
                      !!chore.choreAssignments.find(
                        (ca) => ca.userProfileId == up.id
                      )
                    }
                    onChange={handleNewCheck}
                  />
                </FormGroup>
              </>
            );
          })}
        </Form>
      </div>
    </>
  );
};
