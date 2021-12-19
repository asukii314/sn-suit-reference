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
    closePane,
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

    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;

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

    const renderSuitSubtitle = () => {
        return (
            <div className='suit-subtitle-container'>
                {suit.source.subtype
                    ? `${suit.source.type} · ${suit.source.subtype}`
                    : suit.source.type
                }
            </div>
        );
    }

    const renderSuitImages = (reflectionImgUrl) => {
        return (
            <div className='suit-detail-left-column'>
            <div className='suit-detail-img-container'>
                {activeImgType === 'video' &&
                    <VideoEmbed url={suit.video} autoplay={true} />
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
                        <div className='suit-attribute-label favourites'>{suit.likes}</div>
                        {!isFavourited && <img src='heart_outline.png' className='heart-icon detail unfavourited' alt='favourite' onClick={() => favourite(suit)}/>}
                        {isFavourited && <img src='heart_red.png' className='heart-icon detail favourited' alt='unfavourite' onClick={() => unfavourite(suit)}/>}
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
                    <EventCard event={suit.source?.event} />
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
                    <EventCard event={suit.source?.event} />
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
                    {renderSuitSubtitle()}
                    {renderSuitImageButtons()}
                    {renderSuitInfoCards()}
                </div>
            </div>
        );
    }
    return null;

}
