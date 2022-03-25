import { useState, useEffect } from 'react';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import VideoEmbed from './VideoEmbed';
import EventCard from './eventCard';
import EventDateCard from './eventDateCard';
import MetadataCard from './metadataCard';
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
    isAwakened,
    setAwakened,
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
        const verboseEventSubtypes = [
            'memory stairway',
            'welfare',
            'gleam',
            'arena',
            'recharge',
        ]
        if(suit.source.subtype === 'event' && verboseEventTypes.includes(suit.source.event?.type)) {
            string = `${suit.source.event.type} event`
        }
        if(suit.source.subtype === 'collab' && verboseEventTypes.includes(suit.source.event?.type)) {
            string = `${suit.source.event.type} collab`
        }
        if(verboseEventSubtypes.includes(suit.source.subtype)) {
            string = `${string} suit`
        }
        if(suit.source.subtype === 'permanent') {
            string = 'Permanent pavillion suit'
        }

        return string;
    }

    const renderActionBar = () => {
        return (
            <div className='favourite-icon-container detail'>
                <div className='labelled-action-container'>
                    <div className='suit-attribute-label favourites light'>
                        {isAwakened ? 'Owned · Awakened' :
                            isOwned ? 'Owned · Unawakened' : 'Not Owned'}
                    </div>
                    {!isOwned && !isAwakened && <img
                        src='tick-empty.png'
                        className='action-bar-icon owned-icon detail shadowed'
                        alt='Mark as owned'
                        title='Mark as owned'
                        onClick={(e) => setOwned(suit,e)}
                    />}
                    {isOwned && !isAwakened &&
                        <img src='tick-filled.png'
                        className='action-bar-icon owned-icon detail shadowed green'
                        alt='Mark as awakened'
                        title='Mark as awakened'
                        onClick={(e) => setAwakened(suit,e)}
                    />}
                    {isAwakened &&
                        <img src='tick-filled.png'
                        className='action-bar-icon owned-icon detail shadowed gold'
                        alt='Unmark as owned'
                        title='Unmark as owned'
                        onClick={(e) => setNotOwned(suit,e)}
                    />}
                </div>
                <div className='labelled-action-container'>
                    <div className='suit-attribute-label favourites'>{suit.likes}</div>
                    {!isFavourited && <img
                        src='heart_outline.png'
                        className='action-bar-icon detail unfavourited'
                        alt='Favourite'
                        title='Favourite'
                        onClick={() => favourite(suit)}
                    />}
                    {isFavourited && <img
                        src='heart_red.png'
                        className='action-bar-icon detail favourited'
                        alt='Unfavourite'
                        title='Unfavourite'
                        onClick={() => unfavourite(suit)}
                    />}
                </div>
            </div>
        )
    }

    const renderSuitImages = (reflectionImgUrl) => {
        return (
            <div className='suit-detail-left-column'>
            {renderActionBar()}
            <div className='suit-detail-img-container'>
                {renderSuitImageButtons()}
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
                    <MetadataCard
                        attribute={suit.attribute}
                        rarity={suit.rarity}
                        nation={suit.nation}
                        archive={suit.archive}
                    />
                    <EventDateCard
                        releases={suit.source?.event?.releases}
                        eventType={suit.source?.event?.type}
                        sourceType={suit.source.type}
                        sourceSubype={suit.source.subtype}
                    />
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
                    <EventDateCard
                        releases={suit.source?.event?.releases}
                        eventType={suit.source?.event?.type}
                        sourceType={suit.source.type}
                        sourceSubype={suit.source.subtype}
                    />
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
                <input type='image' className='suit-select-arrow previous' src='./down-arrow.png' onClick={() => nextSuit({forward: false})}/>
                <button className='suit-detail-close-button' onClick={closePane}>❌</button>
                <div className='suit-surtitle'>{getSuitSourceString()}</div>
                <div className='suit-title'>{`${suit.designer} · ${(activeImgType === 'awakened' && suit.awakenedName !== '') ? suit.awakenedName : suit.name}`}</div>
                <div className='suit-subtitle'>{suit.source?.eventName === suit.name ? '' : suit.source?.eventName}</div>
                {renderSuitImages(reflectionImgUrl)}
                {renderSuitInfoCards()}
                <input type='image' className='suit-select-arrow next' src='./down-arrow.png' onClick={() => nextSuit({forward: true})}/>
            </div>
        );
    }
    return null;

}
