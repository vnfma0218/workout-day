import './App.css';
import { ModeContextProvider } from './context/mode-context';
import MainPage from './components/Home/MainPage';

// import Auth from './components/User/Auth';
// import Modal from './shared/UIElement/Modal';
// import Photo from './components/User/Photo';
// import SecondLayout from './components/User/SecondLayout';

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
