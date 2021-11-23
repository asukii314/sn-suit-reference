import './App.css';
import SuitPage from './suitPage';
import SuitDetailPage from './SuitDetailPage';
import {Routes} from "react-router";
import {HashRouter as Router, Route} from "react-router-dom";

function App() {
    // console.log(suitCards);

  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<SuitPage />} />
                    <Route path=":suitId" element={<SuitDetailPage />} />
                </Routes>
            </header>
        </div>
    </Router>
  );
}

export default App;
