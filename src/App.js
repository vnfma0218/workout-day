import './App.css';
import Home from './componenets/Home/Home';
import Auth from './componenets/User/Auth';
import { ModeContextProvider } from './context/mode-context';
import MainHeader from './shared/Navigation/MainHeader';

function App() {
  return (
    <ModeContextProvider>
      <div>
        <MainHeader />
        <Home />
        <Auth />
      </div>
    </ModeContextProvider>
  );
}

export default App;
