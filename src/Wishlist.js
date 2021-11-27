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
    let [filteredSuits, setFilteredSuits] = useState([]);
    let [activeSuit, setActiveSuit] = useState(null);
    let [filterPaneOpen, setFilterPaneOpen] = useState(false);
    let [fetchedFavourites, setFetchedFavourites] = useState(false);
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const { userid } = useParams();

    useEffect(() => {
        if(!suits.length) {
            Promise.all([
                fetchAllSuits(),
                window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${userid}`)
                    .then(r => r.json())
            ]).then((values) => {
                const [allSuits, favourites] = values;
                const faveSuits = allSuits.filter(suit => favourites.includes(suit.id));
                console.log('s',faveSuits)
                setSuits(faveSuits);
                setFilteredSuits(faveSuits);
                if(user?.sub.split("|")[1] === userid) {
                    setFavourites(favourites);
                } else if(user?.sub) {
                    window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${user?.sub.split("|")[1]}`)
                        .then(r => r.json())
                        .then(setFavourites)
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
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.sub.split("|")[1]}/${suit.id}`,
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
            `https://sn-suit-reference-api.herokuapp.com/favourites/${user.sub.split("|")[1]}/${suit.id}`,
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
