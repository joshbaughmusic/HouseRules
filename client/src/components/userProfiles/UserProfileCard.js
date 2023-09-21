import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';

export const UserProfileCard = ({ userProfile }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: '18rem',
      }}
    >
      <CardBody>
        <CardTitle tag="h5">
          {userProfile.firstName} {userProfile.lastName}
        </CardTitle>
        <ul>
          <li>
            <CardText>
              <strong>Address:</strong> <span>{userProfile.address}</span>
            </CardText>
          </li>
          <li>
            <CardText>
              <strong>Email:</strong> <span>{userProfile.email}</span>
            </CardText>
          </li>
          {userProfile.username && (
            <li>
              <CardText>
                <strong>Username:</strong> <span>{userProfile.username}</span>
              </CardText>
            </li>
          )}
        </ul>
        <Button
          color="primary"
          onClick={() => navigate(`${userProfile.id}`)}
        >
          Details
        </Button>
      </CardBody>
    </Card>
  );
};
