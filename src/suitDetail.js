import { useState, useEffect } from 'react';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import VideoEmbed from './VideoEmbed';
import EventCard from './eventCard';
import ArrowKeysReact from 'arrow-keys-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './suitDetail.css';

export default function SuitDetail({
    suit,
    nextSuit,
    isFavourited,
    favourite,
    unfavourite,
    isOwned,
    setOwned,
    setNotOwned,
    closePane,
    isMobile,
}) {

    let [activeImgType, setActiveImgType] = useState("promo");
    ArrowKeysReact.config({
      left: () => nextSuit({forward: false}),
      right: () => nextSuit({forward: true})
    });

    useEffect(() => {
        if(!suit) return;
        if( (activeImgType === 'video' && !suit.video) ||
            (activeImgType !== 'video' && !suit.images[activeImgType])
        ) {
            setActiveImgType("promo");
        }
    })

    const renderSuitImageButton = (btnImgType) => {
        const cn = 'suit-detail-type-button' + (btnImgType === activeImgType ? ' selected' : '');
        return (
            <button
                className={cn}
                key={btnImgType}
                onClick={() => setActiveImgType(btnImgType)}
            >{btnImgType[0].toUpperCase() + btnImgType.substring(1)}
            </button>
        );
    }

    const renderSuitImageButtons = () => {
        return (
            <div className='suit-image-buttons-container'>
                {Object.entries(suit.images)
                    .filter(([imgType, imgUrl]) => !!imgUrl)
                    .map(([imgType, imgUrl]) => {
                        return renderSuitImageButton(imgType);
                    }
                )}
                {suit.video && renderSuitImageButton('video')}
            </div>
        )
    }

    const getSuitSourceString = () => {
        let string = (
            suit.source.subtype
                ? suit.source.subtype[0].toUpperCase() + suit.source.subtype.substring(1)
                : suit.source.type
        );

        const verboseEventTypes = [
            'Single SSR',
            'Double SSR',
            'Single UR',
            'Double UR'
        ];
        if(suit.source.subtype === 'event' && verboseEventTypes.includes(suit.source.event?.type)) {
            string = `${suit.source.event.type} event`
        }
        if(suit.source.subtype === 'collab' && verboseEventTypes.includes(suit.source.event?.type)) {
            string = `${suit.source.event.type} collab`
        }

        return string;
    }

    const renderSuitImages = (reflectionImgUrl) => {
        return (
            <div className='suit-detail-left-column'>
            <div className='suit-detail-img-container'>
                {activeImgType === 'video' &&
                    <VideoEmbed url={suit.video}/>
                }
                {activeImgType !== 'video' && <ZoomableImage
                    className='suit-detail-img'
                    src={suit.images[activeImgType]}
                    alt={activeImgType}
                />}
                {reflectionImgUrl && <ZoomableImage
                    className='suit-detail-img'
                    src={reflectionImgUrl}
                    alt='reflection'
                />}
                </div>
                <div className='favourite-icon-container detail'>
                    <div className='suit-attribute-icons'>
                        <img src={`rarity/${suit.rarity.toLowerCase()}.png`} className='suit-icon detail' alt='rarity' />
                        <div className='suit-attribute-label'>{suit.rarity}</div>
                        {suit.attribute && <img src={`attribute/${suit.attribute.toLowerCase()}.png`} className='suit-icon detail' alt='rarity' />}
                        {suit.attribute && <div className='suit-attribute-label'>{suit.attribute}</div>}
                    </div>
                    <div className='suit-likes-container'>
                        <div className='suit-attribute-label favourites light'>{isOwned ? 'Owned' : 'Not Owned'}</div>
                        {!isOwned && <img
                            src='tick-empty.png'
                            className='action-bar-icon owned-icon detail shadowed'
                            alt='mark as owned'
                            onClick={(e) => setOwned(suit,e)}
                        />}
                        {isOwned &&
                            <img src='tick-filled.png'
                            className='action-bar-icon owned-icon detail shadowed'
                            alt='unmark as owned'
                            onClick={(e) => setNotOwned(suit,e)}
                            />}
                        <div className='suit-attribute-label favourites'>{suit.likes}</div>
                        {!isFavourited && <img
                            src='heart_outline.png'
                            className='action-bar-icon detail unfavourited'
                            alt='favourite'
                            onClick={() => favourite(suit)}
                        />}
                        {isFavourited && <img
                            src='heart_red.png'
                            className='action-bar-icon detail favourited'
                            alt='unfavourite'
                            onClick={() => unfavourite(suit)}
                        />}

                    </div>
                </div>
            </div>
        );
    }

    const renderSuitInfoCards = () => {
        if(isMobile) {
            return (
                <div className='suit-detail-infocard-container'>
                <Carousel
                    className='carousel'
                    showStatus={false}
                    showThumbs={false}
                    useKeyboardArrows={false}
                >
                    <EventCard
                        event={suit.source?.event}
                        sourceType={getSuitSourceString()}
                    />
                    <ReflectionInfo
                        exists={suit.archive !== '(N/A - no reflection)'}
                        iconUrl={suit.reflection?.images?.icon}
                        CoR={suit.reflection?.CoR}
                    />
                </Carousel>
                </div>
            );
        } else {
            return (
                <div className='suit-detail-infocard-container'>
                    <EventCard
                        event={suit.source?.event}
                        sourceType={getSuitSourceString()}
                    />
                    <ReflectionInfo
                        exists={suit.archive !== '(N/A - no reflection)'}
                        iconUrl={suit.reflection?.images?.icon}
                        CoR={suit.reflection?.CoR}
                    />
                </div>
            );
        }
    }

    if(suit) {
        const reflectionImgUrl = suit.reflection?.images?.[activeImgType];
        return (
            <div className='suit-detail-container' {/*...SwipeReact.events*/ ...ArrowKeysReact.events} tabIndex="1">
                <button className='suit-detail-close-button' onClick={closePane}>❌</button>
                {renderSuitImages(reflectionImgUrl)}
                <div className='suit-title-block'>
                    <div className='suit-title'>{`${suit.designer} · ${(activeImgType === 'awakened' && suit.awakenedName !== '') ? suit.awakenedName : suit.name}`}</div>
                    {renderSuitImageButtons()}
                    {renderSuitInfoCards()}
                </div>
            </div>
        );
    }
    return null;

}
