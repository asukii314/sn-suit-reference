import { Component } from 'react';
import ZoomableImage from './zoomableImage';
import ReflectionInfo from './reflectionInfo';
import './suitDetail.css';

export default class SuitDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgType: "promo"
        };
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
        return Object.entries(this.props.suit.images)
            .filter(([imgType, imgUrl]) => !!imgUrl)
            .map(([imgType, imgUrl]) => {
                const cn = 'suit-detail-type-button' + (imgType === this.state.imgType ? ' selected' : '');
                return (
                    <button className={cn} key={imgType} onClick={this.updateImgType.bind(this, imgType)}>{imgType[0].toUpperCase() + imgType.substring(1)}</button>
                );

            });
    }

    renderSuitIcons = () => {
        return (
            <div className='suit-detail-icon-container'>
                <img src={`rarity/${this.props.suit.rarity.toLowerCase()}.png`} className='suit-icon' alt='rarity' />
                {this.props.suit.attribute && <img src={`attribute/${this.props.suit.attribute.toLowerCase()}.png`} className='suit-icon' alt='rarity' />}
            </div>
        );
    }


    render() {
        if(this.props.suit) {
            const reflectionImgUrl = this.props.suit.reflection?.images?.[this.state.imgType];
            return (
                <div className={'suit-detail-container ' + this.state.zoom}>
                    <div className='suit-detail-type-button-container'>
                        <div className='suit-detail-header-container'>
                            {this.renderSuitIcons()}
                            <div className='suit-title'>{this.state.imgType === 'awakened' ? this.props.suit.awakenedName : this.props.suit.name}</div>
                        </div>
                        {this.renderSuitImageButtons()}
                        <button className='suit-detail-type-button' onClick={this.props.closePane}>❌</button>
                    </div>
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
                    <ReflectionInfo
                        iconUrl={this.props.suit.reflection.images?.icon}
                        CoR={this.props.suit.reflection?.CoR}
                    />
                </div>
            );
        }
        return null;
    }
}
