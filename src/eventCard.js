import './eventCard.css'

function renderEventSuit(suit) {
    return (
        <li className='suit-link'>
            <div><a className='inline' href={suit.detailPageUrl}>{suit.name}</a> - {suit.rarity} {suit.type}</div>
        </li>
    );
}

export default function eventCard({ event }) {
    let sortedSuits = (event.suits?.length ? [...event.suits] : []);
    sortedSuits.sort(function(a,b) {
        if(a.rarity === b.rarity) return 0;
        return (a.rarity < b.rarity ? +1 : -1)
    })
    return (
        <div className='event-card-container'>
            <div className="event-title">Source: {event.name}</div>
            <div className="event-subtitle">{event.type}</div>
            <ul>
                {sortedSuits.map(renderEventSuit)}
            </ul>
        </div>
    );
}
