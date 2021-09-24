import './App.css';
import Home from './components/Home/Home';
import Record from './components/Workout/Record';

import Auth from './components/User/Auth';
import { ModeContextProvider } from './context/mode-context';
import MainHeader from './shared/Navigation/MainHeader';
import UserInfo from './components/User/UserInfo';
import Modal from './shared/UIElement/Modal';
import Photo from './components/User/Photo';
import SecondLayout from './components/User/SecondLayout';

function App() {
  return (
    <ModeContextProvider>
      <MainHeader />
      <Modal />
      <Home />
      <Auth />
      <Record />
      <Photo />
      <SecondLayout />
      <UserInfo />
    </ModeContextProvider>
  );
}

export default App;
