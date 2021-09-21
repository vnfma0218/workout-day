import './App.css';
import Home from './componenets/Home/Home';
import { ModeContextProvider } from './context/mode-context';

function App() {
  return (
    <ModeContextProvider>
      <div>
        <Home />
      </div>
    </ModeContextProvider>
  );
}

export default App;
