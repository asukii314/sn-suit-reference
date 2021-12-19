import 'whatwg-fetch';

export default function fetchAllSuits() {
    return window.fetch('https://sn-suit-reference-api.herokuapp.com/suits')
        .then(r => r.json())
}

// maybe figure out if the sheets api has a less hacky way to do this, but ehhhh
export function fetchSuitByName(suitName) {
    return fetchAllSuits().then(
        suits => suits.filter(suit => suit.name.toLowerCase() === suitName.toLowerCase())?.[0]
    )
}
