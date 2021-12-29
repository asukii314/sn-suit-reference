import SuitDetail from './suitDetail';
import SuitCards from './suits';
import SuitFilter from './suitFilter';
import fetchAllSuits from './fetchSuitInfo';
import { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import 'whatwg-fetch';
import './suits.css';

export default function WishlistPage () {
    let [suits, setSuits] = useState([]);
    let [favourites, setFavourites] = useState([]);
    let [ownedSuits, setOwnedSuits] = useState([]);
    let [filteredSuits, setFilteredSuits] = useState([]);
    let [activeSuit, setActiveSuit] = useState(null);
    const { user } = useAuth0();
    const { userid } = useParams();
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;
    let [filterPaneOpen, setFilterPaneOpen] = useState(!isMobile);

    useEffect(() => {
        if(!suits.length) {
            Promise.all([
                fetchAllSuits(),
                window.fetch(`https://sn-suit-reference-api.herokuapp.com/owned/${userid}`)
                    .then(r => r.json())
            ]).then((values) => {
                const [allSuits, owned] = values;
                const closet = allSuits.filter(suit => owned.includes(suit.id));
                setSuits(closet);
                setFilteredSuits(closet);

                if(user?.sub) {
                    if(user?.sub === userid) {
                        Promise.all([
                            setOwnedSuits(owned),
                            window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${user?.sub}`)
                                .then(r => r.json())
                                .then(setFavourites)
                        ])
                    } else {
                        Promise.all([
                            window.fetch(`https://sn-suit-reference-api.herokuapp.com/owned/${user.sub}`)
                                .then(r => r.json())
                                .then(setOwnedSuits),
                            window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${user?.sub}`)
                                .then(r => r.json())
                                .then(setFavourites)
                        ])
                    }
                }
            })
        }
    })

    const addFavourite = (suit,e) => {
        if(e) e.stopPropagation();

        if(!suit || !user?.sub) return;
        setFavourites([...favourites, suit.id])

        const suitIdx = suits.map(suit => suit.id).indexOf(suit.id);
        if (suitIdx > -1) {
            let copy = [...suits];
            copy[suitIdx] = {
                ...suits[suitIdx],
                likes: suits[suitIdx].likes + 1
            }
            setSuits(copy);
            if(activeSuit?.id === suit.id) {
                setActiveSuit(copy[suitIdx])
            }
        }

        const filteredSuitIdx = filteredSuits.map(suit => suit.id).indexOf(suit.id);
        if (filteredSuitIdx > -1) {
            let copy = [...filteredSuits];
            copy[filteredSuitIdx] = {
                ...filteredSuits[filteredSuitIdx],
                likes: filteredSuits[filteredSuitIdx].likes + 1
            }
            setFilteredSuits(copy);
        }

        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.sub}/${suit.id}`,
            {method: 'PUT'}
        )
    }

    const removeFavourite = (suit,e) => {
        if(e) e.stopPropagation();
        if(!suit || !user?.sub) return;
        const index = favourites.indexOf(suit.id);
        if (index > -1) {
            let copy = [...favourites];
            copy.splice(index, 1)
            setFavourites(copy);
        }

        const suitIdx = suits.map(suit => suit.id).indexOf(suit.id);
        if (suitIdx > -1) {
            let copy = [...suits];
            copy[suitIdx] = {
                ...suits[suitIdx],
                likes: suits[suitIdx].likes - 1
            }
            setSuits(copy);
            if(activeSuit?.id === suit.id) {
                setActiveSuit(copy[suitIdx])
            }
        }

        const filteredSuitIdx = filteredSuits.map(suit => suit.id).indexOf(suit.id);
        if (filteredSuitIdx > -1) {
            let copy = [...filteredSuits];
            copy[filteredSuitIdx] = {
                ...filteredSuits[filteredSuitIdx],
                likes: filteredSuits[filteredSuitIdx].likes - 1
            }
            setFilteredSuits(copy);
        }
        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.sub}/${suit.id}`,
            {method: 'DELETE'}
        );
    }

    const setOwned = (suit,e) => {
        if(e) e.stopPropagation();
        if(!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        if(!suit || !user?.sub) return;
        setOwnedSuits([...ownedSuits, suit.id])
        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/owned/${user.sub}/${suit.id}`,
            {method: 'PUT'}
        )
    }

    const setNotOwned = (suit,e) => {
        if(e) e.stopPropagation();
        if(!suit || !user?.sub) return;

        const index = ownedSuits.indexOf(suit.id);
        if (index > -1) {
            let copy = [...ownedSuits];
            copy.splice(index, 1)
            setOwnedSuits(copy);
        }

        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/owned/${user.sub}/${suit.id}`,
            {method: 'DELETE'}
        );
    }


    const escFunction = useCallback((event) => {
      if (event.keyCode === 27) {
        closePane();
      }
    }, []);
    useEffect(() => {
      document.addEventListener("keydown", escFunction);
      return () => {
        document.removeEventListener("keydown", escFunction);
      };
    }, [escFunction]);

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
            <SuitFilter
                suits={suits}
                updateFilteredSuits={setFilteredSuits}
                expanded={filterPaneOpen}
                toggleFilterPane={toggleFilterPane}
                setActiveSuit={onSuitClick}
            />
            <div className='suit-page-main-content'>
                <SuitDetail
                    suit={activeSuit}
                    closePane={closePane}
                    nextSuit={nextSuit}
                    isFavourited={favourites.includes(activeSuit?.id) || false}
                    favourite={addFavourite}
                    unfavourite={removeFavourite}
                    isOwned={ownedSuits.includes(activeSuit?.id) || false}
                    setOwned={setOwned}
                    setNotOwned={setNotOwned}
                />
                <SuitCards
                    suits={filteredSuits}
                    activeSuit={activeSuit}
                    setActiveSuit={onSuitClick}
                    nextSuit={nextSuit}
                    favouriteSuits={favourites}
                    favourite={addFavourite}
                    unfavourite={removeFavourite}
                    ownedSuits={ownedSuits}
                    setOwned={setOwned}
                    setNotOwned={setNotOwned}
                />
            </div>
      </div>
    );
}
