import './App.css';
import Home from './componenets/Home/Home';
import Record from './componenets/workout/pages/Record';
import { ModeContextProvider } from './context/mode-context';

function App() {
  return (
    <ModeContextProvider>
      <Home />
      <Record />
    </ModeContextProvider>
  );
}

export default App;
