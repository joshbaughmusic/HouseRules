import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { fetchUpdateChore } from '../../managers/choresManager.js';

export const ChoreEdit = ({ chore, getSingleChore }) => {
  const [updatedChore, setUpdatedChore] = useState({
    id: chore.id,
    name: chore.name,
    difficulty: chore.difficulty,
    choreFrequencyDays: chore.choreFrequencyDays
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    setUpdatedChore({
      ...updatedChore,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    fetchUpdateChore(updatedChore).then(() => getSingleChore()).then(() => toggle());
  };

  return (
    <>
      <Button
        color="primary"
        onClick={toggle}
      >
        Edit Chore
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Edit Chore:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="name"
                value={updatedChore.name}
                onChange={handleChange}
              />
              <Label>Difficulty</Label>
              <Input
                name="difficulty"
                type="number"
                min="1"
                max="5"
                value={updatedChore.difficulty}
                onChange={handleChange}
              />
              <Label>Frequency</Label>
              <Input
                name="choreFrequencyDays"
                type="number"
                min="1"
                max="14"
                value={updatedChore.choreFrequencyDays}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
          <Button
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};
