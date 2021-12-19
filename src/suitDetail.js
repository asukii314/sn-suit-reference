import { Component } from 'react';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import VideoEmbed from './VideoEmbed';
import EventCard from './eventCard';
import ArrowKeysReact from 'arrow-keys-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './suitDetail.css';

export default class SuitDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgType: "promo"
        };
        // SwipeReact.config({
        //   left: () => this.props.nextSuit({forward: true}),
        //   right: () => this.props.nextSuit({forward: false})
        // });
        ArrowKeysReact.config({
          left: () => this.props.nextSuit({forward: false}),
          right: () => this.props.nextSuit({forward: true})
        });
    }

    componentDidUpdate() {
        if(!this.props.suit) return;
        if( (this.state.imgType === 'video' && !this.props.suit.video) ||
            (this.state.imgType !== 'video' && !this.props.suit.images[this.state.imgType])) {
            this.setState({imgType: "promo"});
        }
    }

    updateImgType = (imgType) => {
        this.setState({imgType});
    }

    renderSuitImageButton = (imgType) => {
        const cn = 'suit-detail-type-button' + (imgType === this.state.imgType ? ' selected' : '');
        return (
            <button className={cn} key={imgType} onClick={this.updateImgType.bind(this, imgType)}>{imgType[0].toUpperCase() + imgType.substring(1)}</button>
        );
    }

    renderSuitImageButtons = () => {
        return (
            <div className='suit-image-buttons-container'>
                {Object.entries(this.props.suit.images)
                    .filter(([imgType, imgUrl]) => !!imgUrl)
                    .map(([imgType, imgUrl]) => {
                        return this.renderSuitImageButton(imgType);
                    }
                )}
                {this.props.suit.video && this.renderSuitImageButton('video')}
            </div>
        )
    }

    renderSuitSubtitle = () => {
        return (
            <div className='suit-subtitle-container'>
                {this.props.suit.source.subtype
                    ? `${this.props.suit.source.type} · ${this.props.suit.source.subtype}`
                    : this.props.suit.source.type
                }
            </div>
        );
    }

    renderSuitImages = (reflectionImgUrl) => {
        return (
            <div className='suit-detail-left-column'>
            <div className='suit-detail-img-container'>
                {this.state.imgType === 'video' &&
                    <VideoEmbed url={this.props.suit.video} autoplay={true} />
                }
                {this.state.imgType !== 'video' && <ZoomableImage
                    className='suit-detail-img'
                    src={this.props.suit.images[this.state.imgType]}
                    alt={this.state.imgType}
                />}
                {reflectionImgUrl && <ZoomableImage
                    className='suit-detail-img'
                    src={reflectionImgUrl}
                    alt='reflection'
                />}
                </div>
                <div className='favourite-icon-container detail'>
                    <div className='suit-attribute-icons'>
                        <img src={`rarity/${this.props.suit.rarity.toLowerCase()}.png`} className='suit-icon detail' alt='rarity' />
                        <div className='suit-attribute-label'>{this.props.suit.rarity}</div>
                        {this.props.suit.attribute && <img src={`attribute/${this.props.suit.attribute.toLowerCase()}.png`} className='suit-icon detail' alt='rarity' />}
                        {this.props.suit.attribute && <div className='suit-attribute-label'>{this.props.suit.attribute}</div>}
                    </div>
                    <div className='suit-likes-container'>
                        <div className='suit-attribute-label favourites'>{this.props.suit.likes}</div>
                        {!this.props.isFavourited && <img src='heart_outline.png' className='heart-icon detail unfavourited' alt='favourite' onClick={() => this.props.favourite(this.props.suit)}/>}
                        {this.props.isFavourited && <img src='heart_red.png' className='heart-icon detail favourited' alt='unfavourite' onClick={() => this.props.unfavourite(this.props.suit)}/>}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if(this.props.suit) {
            const reflectionImgUrl = this.props.suit.reflection?.images?.[this.state.imgType];
            return (
                <div className='suit-detail-container' {/*...SwipeReact.events*/ ...ArrowKeysReact.events} tabIndex="1">
                    <button className='suit-detail-close-button' onClick={this.props.closePane}>❌</button>
                    {this.renderSuitImages(reflectionImgUrl)}
                    <div className='suit-title-block'>
                        <div className='suit-title'>{`${this.props.suit.designer} · ${(this.state.imgType === 'awakened' && this.props.suit.awakenedName !== '') ? this.props.suit.awakenedName : this.props.suit.name}`}</div>
                        {this.renderSuitSubtitle()}
                        {this.renderSuitImageButtons()}
                        <div className='suit-detail-infocard-container'>
                            <Carousel
                                className='carousel'
                                showStatus={false}
                                showThumbs={false}
                                useKeyboardArrows={false}
                            >
                                <EventCard event={this.props.suit.source?.event} />
                                <ReflectionInfo
                                    exists={this.props.suit.archive !== '(N/A - no reflection)'}
                                    iconUrl={this.props.suit.reflection?.images?.icon}
                                    CoR={this.props.suit.reflection?.CoR}
                                />
                            </Carousel>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
