import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ModeContextProvider } from './context/mode-context';

import Auth from './components/User/Auth';
import MainPage from './components/Home/MainPage';
import UserInfo from './components/User/UserInfo';
import UpdateUserInfo from './components/User/UpdateUserInfo';
import SecondLayout from './components/User/SecondLayout';
import { AuthProvider } from './context/auth-context';
import Chart from './components/Workout/Chart';
import DietPhoto from './components/User/DietPhoto';
import Record from './components/Workout/Record';
import Calendar from './components/Workout/Calendar';
import MainHeader from './shared/Navigation/MainHeader';
import CalendarGuide from './components/Workout/CalendarGuide';
import RecordGuide from './components/Workout/RecordGuide';
import UserInfoGuide from './components/User/UserInfoGuide';
function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <ModeContextProvider>
            <MainHeader />
            <Route path='/' exact>
              <MainPage />
            </Route>
            <Route path='/record/guide' exact>
              <RecordGuide />
            </Route>
            <Route path='/record' exact>
              <Record />
            </Route>
            <Route path='/calendar/guide' exact>
              <CalendarGuide />
            </Route>
            <Route path='/calendar' exact>
              <Calendar />
            </Route>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/userinfo/guide' exact>
              <UserInfoGuide />
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
            <Route path='/diet'>
              <DietPhoto />
            </Route>
            <Route path='/chart'>
              <Chart />
            </Route>
          </ModeContextProvider>
        </AuthProvider>
      </Switch>
    </Router>
  );
}
export default App;
