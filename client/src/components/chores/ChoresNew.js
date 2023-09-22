import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { fetchCreateNewChore } from '../../managers/choresManager.js';
import { useNavigate } from 'react-router-dom';

export const ChoresNew = () => {
  const [newChore, setNewChore] = useState({
    name: '',
    difficulty: '',
    choreFrequencyDays: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewChore({
      ...newChore,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (newChore.name && newChore.difficulty && newChore.choreFrequencyDays) {
      fetchCreateNewChore(newChore).then(() => navigate('/chores'));
    }
  };

  return (
    <>
      <div className="container">
        <br />
        <h2>Create a new chore:</h2>
        <br />
        <Form>
          <FormGroup>
            <Label htmlFor="name">Chore Name:</Label>
            <Input
              name="name"
              id="name"
              value={newChore.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="difficulty">Chore Difficulty:</Label>
            <Input
              type="number"
              min="1"
              max="5"
              name="difficulty"
              id="difficulty"
              value={newChore.difficulty}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="choreFrequencyDays">Chore Frequency - Days:</Label>
            <Input
              type="number"
              min="1"
              name="choreFrequencyDays"
              id="choreFrequencyDays"
              value={newChore.choreFrequencyDays}
              onChange={handleChange}
            />
          </FormGroup>
          <Button
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};
