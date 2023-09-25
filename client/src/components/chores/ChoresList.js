import { useEffect, useState } from 'react';
import {
  fetchDeleteChore,
  fetchChores,
  fetchCompleteChore,
} from '../../managers/choresManager.js';
import { Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const ChoresList = ({ loggedInUser }) => {
  const [chores, setChores] = useState([]);
  const navigate = useNavigate();

  const getChores = () => {
    fetchChores().then(setChores);
  };

  useEffect(() => {
    getChores();
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

  const deletChore = (e) => {
    fetchDeleteChore(e.target.value).then(() => getChores());
  };

  const handleComplete = (e) => {
    const newCompletion = {
      choreId: e.target.value,
      userProfileId: loggedInUser.id,
    };
    fetchCompleteChore(newCompletion).then(() => getChores());
  };

  return (
    <>
      <div className="container">
        {loggedInUser.roles.includes('Admin') && (
          <>
            <br />
            <Button
              color="primary"
              onClick={() => navigate('new')}
            >
              Add New Chore
            </Button>
            <br />
            <br />
          </>
        )}

        <h2>All Chores:</h2>
        <Table>
          <thead>
            <tr>
              <td>Chore</td>
              <td>Difficulty</td>
              <td>Frequency</td>
              {loggedInUser.roles.includes('Admin') && <td></td>}
              {loggedInUser.roles.includes('Admin') && <td></td>}
            </tr>
          </thead>
          <tbody>
            {chores.map((c, index) => (
              <tr key={index}>
                {c.overdue ? (
                  <td>
                    <span className="overdue">{c.name}</span>
                  </td>
                ) : (
                  <td>{c.name}</td>
                )}
                <td>
                  {calculateFilledStars(c.difficulty)}
                  {calculateEmptyStars(c.difficulty)}
                </td>
                <td>Every {c.choreFrequencyDays} days</td>
                <td>
                  <Button
                    value={c.id}
                    color="primary"
                    onClick={handleComplete}
                  >
                    Complete
                  </Button>
                </td>
                {loggedInUser.roles.includes('Admin') && (
                  <>
                    <td>
                      <Button
                        value={c.id}
                        color="primary"
                        onClick={() => navigate(`${c.id}`)}
                      >
                        Details
                      </Button>
                    </td>
                    <td>
                      <Button
                        value={c.id}
                        color="danger"
                        onClick={deletChore}
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
