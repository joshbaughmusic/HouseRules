import { Route, Routes } from 'react-router-dom';

import { AuthorizedRoute } from './auth/AuthorizedRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import { Home } from './Home.js';
import { UserProfileList } from './userProfiles/UserProfileList.js';
import { UserProfileDetails } from './userProfiles/UserProfileDetails.js';
import { ChoresList } from './chores/ChoresList.js';
import { ChoresDetails } from './chores/ChoresDetails.js';
import { ChoresNew } from './chores/ChoresNew.js';
import { MyProfile } from './userProfiles/MyProfile.js';

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="myprofile"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyProfile loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="userprofiles"
          element={
            <AuthorizedRoute
              roles={['Admin']}
              loggedInUser={loggedInUser}
            >
              <UserProfileList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="userprofiles/:id"
          element={
            <AuthorizedRoute
              roles={['Admin']}
              loggedInUser={loggedInUser}
            >
              <UserProfileDetails />
            </AuthorizedRoute>
          }
        />
        <Route path="chores">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <ChoresList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <ChoresDetails loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
          <Route
            path="new"
            element={
              <AuthorizedRoute
                roles={['Admin']}
                loggedInUser={loggedInUser}
              >
                <ChoresNew loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route
        path="*"
        element={<p>Whoops, nothing here...</p>}
      />
    </Routes>
  );
}
