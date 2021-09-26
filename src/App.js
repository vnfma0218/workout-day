import './App.css';
// import Home from './components/Home/Home';
// import Record from './components/workout/Record';

// import Auth from './components/User/Auth';
import { ModeContextProvider } from './context/mode-context';
// import UserInfo from './components/User/UserInfo';
// import Modal from './shared/UIElement/Modal';
// import Photo from './components/User/Photo';
// import SecondLayout from './components/User/SecondLayout';
import MainPage from './components/Home/MainPage';

function App() {
  return (
    <ModeContextProvider>
      <MainPage />
      {/* <Modal /> */}
      {/* <Record /> */}
      {/* <Photo /> */}
      {/* <SecondLayout /> */}
    </ModeContextProvider>
  );
}
export default App;
