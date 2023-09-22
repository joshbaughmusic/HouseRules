import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleChore } from '../../managers/choresManager.js';
import { Button, Table } from 'reactstrap';

export const ChoresDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const navigate = useNavigate();

  const getSingleChore = () => {
    fetchSingleChore(id).then(setChore);
  };

  useEffect(() => {
    getSingleChore();
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
        <br />
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
        </Table>
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
                  <p>
                    {`${cc.userProfile.firstName} ${cc.userProfile.lastName}`}
                  </p>
                }
                <td>{new Date(cc.completedOn).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
