import { Component } from 'react';
import 'whatwg-fetch';
import './suits.css';

export default class SuitCards extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    onClick = (suit) => {
        this.props.setActiveSuit(suit);
    }

    renderSuitCard = (suit, idx) => {
        return (

            <div className={`suit-card${suit === this.props.activeSuit ? ' active' : ''}`} key={idx} onClick={this.onClick.bind(this,suit)}>
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
            <div className='suit-cards-container'>
                {this.props.suits.map(this.renderSuitCard)}
            </div>
        );
    }
}
