import SuitDetail from './suitDetail';
import SuitCards from './suits';
import SuitFilter from './suitFilter';
import fetchAllSuits from './fetchSuitInfo';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import 'whatwg-fetch';
import './suits.css';

export default function SuitPanel() {
    let [suits, setSuits] = useState([]);
    let [favourites, setFavourites] = useState([]);
    let [filteredSuits, setFilteredSuits] = useState([]);
    let [activeSuit, setActiveSuit] = useState(null);
    let [filterPaneOpen, setFilterPaneOpen] = useState(false);
    let [fetchedFavourites, setFetchedFavourites] = useState(false);
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    useEffect(() => {
        if(!suits.length) {
            fetchAllSuits().then(suits => {
                setSuits(suits);
                setFilteredSuits(suits);
            })
        }
        if(isAuthenticated && favourites.length === 0  && !fetchedFavourites) {
            setFetchedFavourites(true);
            window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${user.email}`)
                .then(r => r.json())
                .then(res => setFavourites(res))
        }
    })

    const addFavourite = (suit,e) => {
        if(e) e.stopPropagation();
        if(!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        if(!suit || !user?.email) return;
        setFavourites([...favourites, suit.id])
        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.email}/${suit.id}`,
            {method: 'PUT'}
        )
    }

    const removeFavourite = (suit,e) => {
        if(e) e.stopPropagation();
        if(!suit || !user?.email) return;
        const index = favourites.indexOf(suit.id);
        if (index > -1) {
            let copy = [...favourites];
            copy.splice(index, 1)
            setFavourites(copy);
        }
        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.email}/${suit.id}`,
            {method: 'DELETE'}
        );
    }

    const onSuitClick = (suit) => {
        activeSuit === suit
            ? closePane()
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
            {isAuthenticated && <button onClick={() => logout({ returnTo: window.location.origin.includes('localhost') ? window.location.origin : 'https://asukii314.github.io/sn-suit-reference' })}>Log Out</button>}
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
                    isFavourited={favourites.includes(activeSuit?.id) || false}
                    favourite={addFavourite}
                    unfavourite={removeFavourite}
                />
                <SuitCards
                    suits={filteredSuits}
                    activeSuit={activeSuit}
                    setActiveSuit={onSuitClick}
                    nextSuit={nextSuit}
                    favouriteSuits={favourites}
                    favourite={addFavourite}
                    unfavourite={removeFavourite}
                />
            </div>
      </div>
    );
}