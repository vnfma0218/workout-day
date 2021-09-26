import './App.css';
import { ModeContextProvider } from './context/mode-context';
import MainPage from './shared/UIElement/MainPage';
// import Auth from './components/User/Auth';
// import Modal from './shared/UIElement/Modal';
// import Photo from './components/User/Photo';
// import SecondLayout from './components/User/SecondLayout';

function App() {
  return (
    <ModeContextProvider>
      <MainPage>
        {/* <Modal /> */}
        {/* <Auth /> */}
        {/* <Photo /> */}
        {/* <SecondLayout /> */}
      </MainPage>
    </ModeContextProvider>
  );
}

export default App;
