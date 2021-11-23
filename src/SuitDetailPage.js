import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {fetchSuitByName} from './fetchSuitInfo';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import './suitDetailPage.css';

function renderSuitImageTile(imgType, suitImgUrl, reflectionImgUrl) {
    return (
        <div className='suit-img-tile' key={imgType}>
            <div className='suit-tile-title'>{imgType}</div>
            <div className='suit-tile-img-wrapper'>
                <ZoomableImage
                    className='tile-img suit'
                    src={suitImgUrl}
                    alt={imgType}
                />
                {reflectionImgUrl && <ZoomableImage
                    className='tile-img reflection'
                    src={reflectionImgUrl}
                    alt='reflection'
                    />}
            </div>
        </div>
    );
}

function renderAllSuitImageTiles(suit) {
    return Object.entries(suit.images)
        .filter(([imgType, imgUrl]) => !!imgUrl)
        .map(([imgType, imgUrl]) => {
            // filter out case where "promo" image is just a copy of another img type
            if(imgType === 'promo' && Object.values(suit.images).slice(1).includes(imgUrl)) {
                return null;
            }
            return renderSuitImageTile(imgType, imgUrl, suit.reflection?.images?.[imgType])
        });
}

function renderSuitIcons(suit) {
    return (
        <div className='suit-detail-icon-container horizontal'>
            <div className='suit-source full'>{suit.source.subtype ? `${suit.source.type} · ${suit.source.subtype}` : suit.source.type}</div>
            <img src={`rarity/${suit.rarity.toLowerCase()}.png`} className='suit-icon plain' alt='rarity' />
            {suit.attribute && <img src={`attribute/${suit.attribute.toLowerCase()}.png`} className='suit-icon' alt='rarity' />}
        </div>
    );
}

export default function SuitDetailPage() {
    let [suit, setSuit] = useState(0);
    let { suitId } = useParams();

    useEffect(() => {
        if(!suit) {
            fetchSuitByName(suitId.replace(/-/g, ' '))
            .then(setSuit)
        }
    })

    if(!suit) return null;
    return (
        <div>
            <div className='suit-detail-info-container'>
                <div className='suit-title-container'>
                    {renderSuitIcons(suit)}
                    <div className='suit-detail-header-container'>
                        <div className='suit-title full'>{`${suit.designer} · ${suit.name}`}</div>
                    </div>
                </div>
                <ReflectionInfo
                    iconUrl={suit.reflection.images?.icon}
                    CoR={suit.reflection?.CoR}
                />
            </div>

            <div className='suit-img-tiles-container'>
                {renderAllSuitImageTiles(suit)}
            </div>

        </div>
    );

}