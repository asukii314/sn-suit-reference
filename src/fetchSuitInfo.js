import 'whatwg-fetch';

export default function fetchAllSuits() {
    return window.fetch('https://sn-suit-reference-api.herokuapp.com/suits')
        .then(r => r.json())
}

export function fetchSuitById(suitId) {
    return window.fetch(`https://sn-suit-reference-api.herokuapp.com/suits/${suitId}`)
        .then(r => r.json())
}
