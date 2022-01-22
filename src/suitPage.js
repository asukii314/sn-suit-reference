import SuitDetail from './suitDetail';
import SuitCards from './suits';
import SuitFilter from './suitFilter';
import fetchAllSuits from './fetchSuitInfo';
import { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import 'whatwg-fetch';
import './suits.css';

export default function SuitPanel() {
    let [suits, setSuits] = useState([]);
    let [favourites, setFavourites] = useState([]);
    let [ownedSuits, setOwnedSuits] = useState([]);
    let [filteredSuits, setFilteredSuits] = useState([]);
    let [activeSuit, setActiveSuit] = useState(null);
    let [fetchedFavourites, setFetchedFavourites] = useState(false);
    let [isDescending, setIsDescending] = useState(true);
    let [sortType, setSortType] = useState('Alphabetical')
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowSizeChange);
    //     return () => {
    //         window.removeEventListener('resize', handleWindowSizeChange);
    //     }
    // }, []);
    // const isMobile = width <= 768;
    const isMobile = true;

    let [filterPaneOpen, setFilterPaneOpen] = useState(!isMobile);

    useEffect(() => {
        if(!suits.length) {
            fetchAllSuits().then(suits => {
                setSuits(suits);
                setFilteredSuits(suits);
            })
        }
        if(isAuthenticated && favourites.length === 0  && !fetchedFavourites) {
            setFetchedFavourites(true);
            Promise.all([
                window.fetch(`https://sn-suit-reference-api.herokuapp.com/favourites/${user.sub}`)
                    .then(r => r.json())
                    .then(res => setFavourites(res)),

                window.fetch(`https://sn-suit-reference-api.herokuapp.com/owned/${user.sub}`)
                    .then(r => r.json())
                    .then(res => setOwnedSuits(res)),
            ])
        }
        if(suits.length > 0 && ownedSuits.length > 0 && suits[0].owned === undefined) {
            setSuits(suits.map(suit => {
                return {
                    ...suit,
                    owned: ownedSuits.includes(suit.id)
                }
            }));
            setFilteredSuits(filteredSuits.map(suit => {
                return {
                    ...suit,
                    owned: ownedSuits.includes(suit.id)
                }
            }));
        }
    })

    const addFavourite = (suit,e) => {
        if(e) e.stopPropagation();
        if(!isAuthenticated) {
            loginWithRedirect();
            return;
        }
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

    const addOwnedSuit = (suit,e) => {
        if(e) e.stopPropagation();
        if(!isAuthenticated) {
            loginWithRedirect();
            return;
        }
        if(!suit || !user?.sub) return;
        setOwnedSuits([...ownedSuits, suit.id])

        const idx = suits.findIndex(s => s.id === suit.id);
        const suitsCopy = [...suits];
        suitsCopy[idx] = {
            ...suits[idx],
            owned: true
        };
        setSuits(suitsCopy);

        window.fetch(
            `https://sn-suit-reference-api.herokuapp.com/owned/${user.sub}/${suit.id}`,
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

    const removeOwnedSuit = (suit,e) => {
        if(e) e.stopPropagation();
        if(!suit || !user?.sub) return;

        const index = ownedSuits.indexOf(suit.id);
        if (index > -1) {
            let copy = [...ownedSuits];
            copy.splice(index, 1)
            setOwnedSuits(copy);
        }

        const idx = suits.findIndex(s => s.id === suit.id);
        const suitsCopy = [...suits];
        suitsCopy[idx] = {
            ...suits[idx],
            owned: false
        };
        setSuits(suitsCopy);

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

    const updateSortType = (newSortType) => {
        const suitsCopy = [...suits];
        const filteredSuitsCopy = [...suits];

        if(newSortType === sortType) {
            suitsCopy.reverse();
            setSuits(suitsCopy);
            filteredSuitsCopy.reverse();
            setFilteredSuits(filteredSuitsCopy);
            setIsDescending(!isDescending);
            return;
        }
        setSortType(newSortType);
        setIsDescending(true);
        switch(newSortType) {
            case '# of Likes':
                suitsCopy.sort((a, b) => b.likes - a.likes);
                setSuits(suitsCopy);
                filteredSuitsCopy.sort((a, b) => b.likes - a.likes);
                setFilteredSuits(filteredSuitsCopy);
                break;

            case 'Alphabetical':
                suitsCopy.sort((a, b) => b.name.toUpperCase() < a.name.toUpperCase() ? 1 : -1);
                setSuits(suitsCopy);
                filteredSuitsCopy.sort((a, b) => b.name.toUpperCase() < a.name.toUpperCase() ? 1 : -1);
                setFilteredSuits(filteredSuitsCopy);
                break;

            case '1st Release (TW)':
                const releaseSortFn = (a, b) => {
                    const datestr_a = a.source?.event?.releases?.TW?.[0]?.start;
                    const datestr_b = b.source?.event?.releases?.TW?.[0]?.start;
                    if(!datestr_a && !datestr_b) return 0;
                    if(!datestr_a) return 1;
                    if(!datestr_b) return -1;
                    return Date.parse(datestr_b) - Date.parse(datestr_a);
                }
                suitsCopy.sort(releaseSortFn);
                setSuits(suitsCopy);
                filteredSuitsCopy.sort(releaseSortFn);
                setFilteredSuits(filteredSuitsCopy);
                break;
        }
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
                isMobile={isMobile}
                sortTypes={['Alphabetical', '# of Likes', '1st Release (TW)']}
                activeSortType={sortType}
                isDescending={isDescending}
                setSortType={updateSortType}
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
                    setOwned={addOwnedSuit}
                    setNotOwned={removeOwnedSuit}
                    isMobile={isMobile}
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
                    setOwned={addOwnedSuit}
                    setNotOwned={removeOwnedSuit}
                    filterPaneOpen={activeSuit !== null}
                />
            </div>
      </div>
    );
}
