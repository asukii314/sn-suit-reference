import './App.css';
import SuitPage from './suitPage';
import SuitDetailPage from './SuitDetailPage';
import {Routes} from "react-router";
import {HashRouter as Router, Route} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";

function App() {

    // hack around a bug in the facebook login redirect handler
    if (window.location.hash && window.location.hash === '#_=_') {
        window.location.hash = '';
    }

  return (
      <Auth0Provider
        domain='dev-semwqhjw.us.auth0.com'
        clientId='96kzE3AqjHdAz8fzOJvTuENJO7AQj0wb'
        redirectUri={window.location.origin}
      >
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route exact path="/" element={<SuitPage />} />
                        <Route path=":suitId" element={<SuitDetailPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    </Auth0Provider>
  );
}

export default App;
