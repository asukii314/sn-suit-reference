import { Component } from 'react';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import ArrowKeysReact from 'arrow-keys-react';
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
        if(!this.props.suit.images[this.state.imgType]) {
            this.setState({imgType: "promo"});
        }
    }

    updateImgType = (imgType) => {
        this.setState({imgType});
    }

    renderSuitImageButtons = () => {
        return (
            <div className='suit-image-buttons-container'>
                {Object.entries(this.props.suit.images)
                    .filter(([imgType, imgUrl]) => !!imgUrl)
                    .map(([imgType, imgUrl]) => {
                        const cn = 'suit-detail-type-button' + (imgType === this.state.imgType ? ' selected' : '');
                        return (
                            <button className={cn} key={imgType} onClick={this.updateImgType.bind(this, imgType)}>{imgType[0].toUpperCase() + imgType.substring(1)}</button>
                        );

                    }
                )}
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
                <div className='suit-detail-icon-container'>
                    <img src={`rarity/${this.props.suit.rarity.toLowerCase()}.png`} className='suit-icon' alt='rarity' />
                    {this.props.suit.attribute && <img src={`attribute/${this.props.suit.attribute.toLowerCase()}.png`} className='suit-icon' alt='rarity' />}
                </div>
            </div>
        );
    }

    renderSuitImages = (reflectionImgUrl) => {
        return (
            <div className='suit-detail-left-column'>
            <div className='suit-detail-img-container'>
                <ZoomableImage
                    className='suit-detail-img'
                    src={this.props.suit.images[this.state.imgType]}
                    alt={this.state.imgType}
                />
                {reflectionImgUrl && <ZoomableImage
                    className='suit-detail-img'
                    src={reflectionImgUrl}
                    alt='reflection'
                />}
                </div>
                <div className='favourite-icon-container'>
                    {!this.props.isFavourited && <img src='heart_outline.png' className='heart-icon detail unfavourited' alt='favourite' onClick={() => this.props.favourite(this.props.suit)}/>}
                    {this.props.isFavourited && <img src='heart_red.png' className='heart-icon detail favourited' alt='unfavourite' onClick={() => this.props.unfavourite(this.props.suit)}/>}
                </div>
            </div>
        );
    }

    // <ReflectionInfo
    //     iconUrl={this.props.suit.reflection.images?.icon}
    //     CoR={this.props.suit.reflection?.CoR}
    // />

    render() {
        if(this.props.suit) {
            const reflectionImgUrl = this.props.suit.reflection?.images?.[this.state.imgType];
            return (
                <div className='suit-detail-container' {/*...SwipeReact.events*/ ...ArrowKeysReact.events} tabIndex="1">
                    {this.renderSuitImages(reflectionImgUrl)}
                    <div className='suit-title-block'>
                        <div className='suit-title'>{`${this.props.suit.designer} · ${(this.state.imgType === 'awakened' && this.props.suit.awakenedName !== '') ? this.props.suit.awakenedName : this.props.suit.name}`}</div>
                        {this.renderSuitSubtitle()}
                        {this.renderSuitImageButtons()}
                    </div>
                </div>
            );
        }
        return null;
    }
}
