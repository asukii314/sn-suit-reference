import SuitDetail from './suitDetail';
import SuitCards from './suits';
import SuitFilter from './suitFilter';
import fetchAllSuits from './fetchSuitInfo';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './suits.css';

export default function SuitPanel() {
    let [suits, setSuits] = useState([]);
    let [filteredSuits, setFilteredSuits] = useState([]);
    let [activeSuit, setActiveSuit] = useState(null);
    let [filterPaneOpen, setFilterPaneOpen] = useState(false);
    const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

    useEffect(() => {
        if(!suits.length) {
            fetchAllSuits().then(suits => {
                setSuits(suits);
                setFilteredSuits(suits);
            })
        }
    })

    const onSuitClick = (suit) => {
        activeSuit === suit
            ? this.closePane()
            : setActiveSuit(suit);
    }

    const closePane = () => {
        setActiveSuit(null);
    }

    const toggleFilterPane = () => {
        setFilterPaneOpen(!filterPaneOpen);
    }

    const nextSuit = ({forward=true}={}) => {
        if(!activeSuit) return;
        const curSuitIdx = filteredSuits.map(suit => suit.name).indexOf(activeSuit.name);
        const newSuitIdx = curSuitIdx + (forward ? 1 : -1);
        if(newSuitIdx < 0 || newSuitIdx >= filteredSuits.length) return;
        setActiveSuit(filteredSuits[newSuitIdx]);
    }

    if(!suits) return null;
    return (
        <div>
            {!isAuthenticated && <button className='fb-login-button' onClick={() => loginWithRedirect()}/>}
            {isAuthenticated && <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>}
            <SuitFilter
                suits={suits}
                updateFilteredSuits={setFilteredSuits}
                expanded={filterPaneOpen}
                toggleFilterPane={toggleFilterPane}
                setActiveSuit={onSuitClick}
            />
            <div className={filterPaneOpen ? 'narrow' : 'wide'}>
                <SuitDetail
                    suit={activeSuit}
                    closePane={closePane}
                    nextSuit={nextSuit}
                />
                <SuitCards
                    suits={filteredSuits}
                    activeSuit={activeSuit}
                    setActiveSuit={onSuitClick}
                    nextSuit={nextSuit}
                />
            </div>
      </div>
    );
}
