import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ModeContextProvider } from './context/mode-context';

import Auth from './components/User/Auth';
import MainPage from './components/Home/MainPage';
import UserInfo from './components/User/UserInfo';
import UpdateUserInfo from './components/User/UpdateUserInfo';
import SecondLayout from './components/User/SecondLayout';
import { AuthProvider } from './context/auth-context';

// import Modal from './shared/UIElement/Modal';
// import SecondLayout from './components/User/SecondLayout';

function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <ModeContextProvider>
            <Route path='/' exact>
              <MainPage />
            </Route>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/userinfo/edit' exact>
              <UpdateUserInfo />
            </Route>
            <Route path='/userinfo' exact>
              <UserInfo />
            </Route>
            <Route path='/photo'>
              <SecondLayout />
            </Route>
            {/* <Modal /> */}
            {/* <SecondLayout /> */}
          </ModeContextProvider>
        </AuthProvider>
      </Switch>
    </Router>
  );
}
export default App;
