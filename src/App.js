import './App.css';
import SuitPage from './suitPage';
import SuitDetailPage from './SuitDetailPage';
import {Routes} from "react-router";
import {HashRouter as Router, Route} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import Navbar from './Navbar';
import ContactPage from './ContactPage';
import CreditsPage from './CreditsPage';
import PrivacyPolicy from './PrivacyPolicy';
import Wishlist from './Wishlist';
import Closet from './Closet';

function App() {

    // hack around a bug in the facebook login redirect handler
    if (window.location.hash && window.location.hash === '#_=_') {
        window.location.hash = '';
    }

  return (
      <Auth0Provider
        domain='dev-semwqhjw.us.auth0.com'
        clientId='96kzE3AqjHdAz8fzOJvTuENJO7AQj0wb'
        redirectUri={window.location.origin.includes('localhost') ? window.location.origin : 'https://asukii314.github.io/sn-suit-reference/#/' }
      >
        <Router>
            <div className="App">
                <header className="App-header">
                <Navbar />
                <img className='hack' src='./menu.png' />
                    <Routes>
                        <Route exact path="/" element={<SuitPage />} />
                        <Route path=":suitId" element={<SuitDetailPage />} />
                        <Route path="/credits" element={<CreditsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/wishlist/:userid" element={<Wishlist />} />
                        <Route path="/closet/:userid" element={<Closet />} />
                    </Routes>
                </header>
            </div>
        </Router>
    </Auth0Provider>
  );
}

export default App;
