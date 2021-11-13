import './App.css';
import SuitCards from './suits';
import {Routes} from "react-router";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    // console.log(suitCards);

  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<SuitCards />} />
                </Routes>
            </header>
        </div>
    </Router>
  );
}

export default App;
