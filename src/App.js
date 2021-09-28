import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ModeContextProvider } from './context/mode-context';
import MainPage from './components/Home/MainPage';

import Auth from './components/User/Auth';
import Photo from './components/User/Photo';
import Record from './components/Workout/Record';
// import Modal from './shared/UIElement/Modal';
// import SecondLayout from './components/User/SecondLayout';

function App() {
  return (
    <Router>
      <Switch>
        <ModeContextProvider>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/auth'>
            <Auth />
          </Route>
          <Route path='/record'>
            <Record />
          </Route>
          <Route path='/photo'>
            <Photo />
          </Route>
          {/* <Modal /> */}
          {/* <SecondLayout /> */}
        </ModeContextProvider>
      </Switch>
    </Router>
  );
}
export default App;
