import './App.css';
import Home from './components/Home/Home';
import Record from './components/workout/pages/Record';

import Auth from './components/user/Auth';
import { ModeContextProvider } from './context/mode-context';
import MainHeader from './shared/Navigation/MainHeader';
import UserInfo from './components/user/UserInfo';
import Modal from './shared/UIElement/Modal';
import Photo from './components/user/Photo';
import SecondLayout from './components/user/SecondLayout';

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
