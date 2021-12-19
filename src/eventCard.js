import './eventCard.css'

function renderEventSuit(suit) {
    return (
        <li className='suit-link'>
            <div><a className='inline' href={suit.detailPageUrl/*.replace('https://asukii314.github.io/sn-suit-reference','')*/}>{suit.name}</a> - {suit.rarity} {suit.type}</div>
        </li>
    );
}

export default function eventCard({ event, sourceType }) {
    let sortedSuits = (event.suits?.length ? [...event.suits] : []);
    sortedSuits.sort(function(a,b) {
        if(a.rarity === b.rarity) return 0;
        return (a.rarity < b.rarity ? +1 : -1)
    })
    return (
        <div className='event-card-container'>
            <div className="event-title">{sourceType}</div>
            <div className="event-subtitle">{event.name}</div>
            <ul>
                {sortedSuits.map(renderEventSuit)}
            </ul>
        </div>
    );
}
