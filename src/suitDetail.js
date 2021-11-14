import { Component } from 'react';
import './suitDetail.css';

export default class SuitDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgType: "promo",
            zoom: "zoomed-out"
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
                    <button className={cn} onClick={this.updateImgType.bind(this, imgType)}>{imgType[0].toUpperCase() + imgType.substring(1)}</button>
                );

            });
    }

    toggleZoom = () => {
        if(this.state.zoom === "zoomed-out") {
            this.setState({zoom: "zoomed-in"});
        } else {
            this.setState({zoom: "zoomed-out"});
        }
    }

    render() {
        if(this.props.suit) {
            return (
              <div className={'suit-detail-container ' + this.state.zoom}>
              <div className='suit-detail-type-button-container'>
                  <div className='suit-title'>{this.props.suit.name}</div>
                  {this.renderSuitImageButtons()}
                  <button className='suit-detail-type-button' onClick={this.props.closePane}>❌</button>
              </div>
                <div className='suit-detail-img-container'>
                    <img className={'suit-detail-img ' + this.state.zoom} src={this.props.suit.images[this.state.imgType]} alt={this.state.imgType} onClick={this.toggleZoom}/>
                </div>

              </div>
            );
        }
        return null;
    }
}
