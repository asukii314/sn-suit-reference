import { Component } from 'react';
import 'whatwg-fetch';
import './suits.css';
import ArrowKeysReact from 'arrow-keys-react';

export default class SuitCards extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        ArrowKeysReact.config({
          left: () => this.nextSuit({forward: false}),
          right: () => this.nextSuit({forward: true})
        });
    }

    nextSuit = ({forward=true}={}) => {
        if(!this.props.activeSuit) return;
        const curSuitIdx = this.props.suits.map(suit => suit.name).indexOf(this.props.activeSuit.name);
        const newSuitIdx = curSuitIdx + (forward ? 1 : -1);
        if(newSuitIdx < 0 || newSuitIdx >= this.props.suits.length) return;
        this.props.setActiveSuit(this.props.suits[newSuitIdx]);
    }

    onClick = (suit) => {
        this.props.setActiveSuit(suit);
    }

    renderSuitCard = (suit, idx) => {
        return (
            <div
                className={`suit-card${suit === this.props.activeSuit ? ' active' : ''}`}
                key={idx}
                onClick={this.onClick.bind(this,suit)}
                {...ArrowKeysReact.events} tabIndex="1"
            >
                <div className='suit-icon-container'>
                    <img src={`rarity/${suit.rarity.toLowerCase()}.png`} className='suit-icon' alt='rarity' />
                    {suit.attribute && <img src={`attribute/${suit.attribute.toLowerCase()}.png`} className='suit-icon' alt='rarity' />}
                </div>
                <img src={suit.images.promo} className='suit-img' alt={suit.name}/>
                <p className='suit-name'> {suit.name} </p>
            </div>
        )
    }

    setActiveSuit = (suit) => {
        this.props.setActiveSuit(suit);
    }

    render() {
        if(!this.props.suits) return null;
        return (
            <div className={`suit-cards-container ${this.props.layout}`}>
                {this.props.suits.map(this.renderSuitCard)}
            </div>
        );
    }
}
