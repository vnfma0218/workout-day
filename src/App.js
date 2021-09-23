import './App.css';
import Home from './componenets/Home/Home';
import Record from './componenets/workout/pages/Record';

import Auth from './componenets/User/Auth';
import { ModeContextProvider } from './context/mode-context';
import MainHeader from './shared/Navigation/MainHeader';
import Photo from './componenets/User/PhotoLayout/Photo';

function App() {
  return (
    <ModeContextProvider>
      <MainHeader />
      <Home />
      <Auth />
      <Record />
      <Photo />
    </ModeContextProvider>
  );
}

export default App;
