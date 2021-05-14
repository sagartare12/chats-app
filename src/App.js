import React from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import './styles/main.scss'
import './styles/utility.scss'
import { Switch , Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import PublicRoute from './components/PublicRoute'
import { ProfileProvider } from './context/profileContext'
function App() {
  return (
    <ProfileProvider>
      <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
      </Switch>
     </ProfileProvider>
  );
}

export default App;
