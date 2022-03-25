import { Component } from 'react';
import 'whatwg-fetch';
import './suits.css';
import ArrowKeysReact from 'arrow-keys-react';
import SwipeReact from 'swipe-react';

export default class SuitCards extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        ArrowKeysReact.config({
            left: () => this.props.nextSuit({forward: false}),
            right: () => this.props.nextSuit({forward: true})
        });
        SwipeReact.config({
            left: () => this.props.nextSuit({forward: false}),
            right: () => this.props.nextSuit({forward: true})
        });
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
                {...SwipeReact.events}
            >
                <div className='suit-icon-container'>
                    <div className='favourite-icon-container'>

                        {/* Favourite icon */}
                        <div className='favourite-icon-with-label'>
                            {!this.props.favouriteSuits?.includes(suit.id) && <img
                                src='heart_black.png'
                                className='action-bar-icon unfavourited suit-icon shadowed'
                                alt='Favourite'
                                title='Favourite'
                                onClick={(e) => this.props.favourite(suit,e)}
                            />}
                            {this.props.favouriteSuits?.includes(suit.id) && <img
                                src='heart_red.png'
                                className='action-bar-icon favourited suit-icon shadowed'
                                alt='Unfavourite'
                                title='Unfavourite'
                                onClick={(e) => this.props.unfavourite(suit,e)}
                                />}
                            <div className='icon-label'>{this.props.favouriteSuits?.includes(suit.id) ? 'Saved to wishlist' : 'Not on wishlist'}</div>
                        </div>

                        {/* Owned icon */}
                        <div className='favourite-icon-with-label'>
                            {!this.props.ownedSuits?.includes(suit.id) && !this.props.awakenedSuits?.includes(suit.id) &&
                                <img src='tick-empty.png'
                                className='action-bar-icon owned-icon suit-icon shadowed'
                                alt='Mark as owned'
                                title='Mark as owned'
                                onClick={(e) => this.props.setOwned(suit,e)}
                            />}
                            {this.props.ownedSuits?.includes(suit.id) && !this.props.awakenedSuits?.includes(suit.id) &&
                                <img src='tick-filled.png'
                                className='action-bar-icon owned-icon suit-icon shadowed green'
                                alt='Mark as awakened'
                                title='Mark as awakened'
                                onClick={(e) => this.props.setAwakened(suit,e)}
                            />}
                            {this.props.awakenedSuits?.includes(suit.id) &&
                                <img src='tick-filled.png'
                                className='action-bar-icon owned-icon suit-icon shadowed gold'
                                alt='Unmark as owned'
                                title='Unmark as owned'
                                onClick={(e) => this.props.setNotOwned(suit,e)}
                            />}
                            <div className='icon-label'>{this.props.awakenedSuits?.includes(suit.id)
                                ? 'Owned · Awakened'
                                : this.props.ownedSuits?.includes(suit.id)
                                    ? 'Owned · Unawakened'
                                    : 'Not owned'}</div>
                        </div>

                        {/* Rarity icon */}
                        {suit.rarity && <div className='favourite-icon-with-label'>
                            <img src={`rarity/${suit.rarity.toLowerCase()}.png`} className='suit-icon shadowed' alt='rarity' />
                            <div className='icon-label'>{suit.rarity.toUpperCase()} rarity</div>
                        </div>}

                        {/* Attribute icon */}
                        {suit.attribute && <div className='favourite-icon-with-label'>
                            {suit.attribute && <img src={`attribute/${suit.attribute.toLowerCase()}.png`} className='suit-icon' alt='attribute' />}
                            <div className='icon-label'>{suit.attribute} attribute</div>
                        </div>}

                        {/* Nation icon */}
                        {suit.nation && <div className='favourite-icon-with-label'>
                            {suit.nation && <img src={`nation/${suit.nation.toLowerCase()}.png`} className='suit-icon' alt='nation' />}
                            <div className='icon-label'>{suit.nation} nation</div>
                        </div>}
                    </div>
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
            <div className={`suit-cards-container${this.props.suits.length ? ' loaded' : ''}${this.props.filterPaneOpen ? ' pane-open' : ' pane-closed'}`}>
                {this.props.suits.map(this.renderSuitCard)}
            </div>
        );
    }
}
