import './App.css';
import Home from './components/Home/Home';

import { ModeContextProvider } from './context/mode-context';
import MainHeader from './shared/Navigation/MainHeader';
import Auth from './components/User/Auth';
import Record from './components/Workout/Record';
// import Photo from './components/User/PhotoLayout/Photo';

function App() {
  return (
    <ModeContextProvider>
      <MainHeader />
      <Home />
      <Auth />
      <Record />
      {/* <Photo /> */}
    </ModeContextProvider>
  );
}

export default App;
