import './eventCard.css'

function renderEventSuit(suit) {
    return (
        <li className='suit-link'>
            <div><a className='inline' href={suit.detailPageUrl}>{suit.name}</a> - {suit.rarity} {suit.type}</div>
        </li>
    );
}

export default function eventCard({ event }) {
    return (
        <div className='event-card-container'>
            <div className="event-title">Source: {event.name}</div>
            <div className="event-subtitle">{event.type}</div>
            <ul>
                {event.suits && event.suits.map(renderEventSuit)}
            </ul>
        </div>
    );
}
