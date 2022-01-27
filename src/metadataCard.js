import './eventCard.css'

export default function metadataCard({ attribute, rarity, nation, archive }) {
    return (
        <div className='event-card-container'>
            <div className="event-title">Suit Info</div>
            <div className="metadata-list">
                {(rarity && <div className='metadata-list-item'>
                    <img src={`rarity/${rarity.toLowerCase()}.png`} className='suit-icon' alt={rarity} />
                    <b>{rarity}</b> <i>(rarity)</i>
                </div>)}
                {(attribute && <div className='metadata-list-item'>
                    <img src={`attribute/${attribute.toLowerCase()}.png`} className='suit-icon' alt={attribute} />
                    <b>{attribute}</b> <i>(attribute)</i>
                </div>)}
                {(nation && <div className='metadata-list-item'>
                    <img src={`nation/${nation.toLowerCase()}.png`} className='suit-icon' alt={nation} />
                    <b>{nation}</b> <i>(nation)</i>
                </div>)}
                {(archive && archive !== '(N/A - no reflection)' && <div className='metadata-list-item'>
                    <b className='indent'>{archive}</b> <i>(archive)</i>
                </div>)}
            </div>
        </div>
    );
}
