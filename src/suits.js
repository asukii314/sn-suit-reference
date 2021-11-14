import { Component } from 'react';
import SuitDetail from './suitDetail';
import 'whatwg-fetch';
import './suits.css';

export default class SuitCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            suits: [],
            activeSuit: null
        };
    }
    componentDidMount() {
        window.fetch('https://sheets.googleapis.com/v4/spreadsheets/1XkJ4QD8pzoOwL97lFtTSAv2fOb3DikNQYDNkXn6LL9Y/values/Suits?key=AIzaSyBXC3NZmF3G0LK50YSS4EY4yxb3W7AJa80')
            .then(r => r.json())
            .then(res => {
                let suits = [];

                for(let i = 1; i < res.values.length; i++) {
                    suits.push({
                        name: res.values[i][0],
                        awakenedName: res.values[i][1],
                        designer: res.values[i][5],
                        rarity: res.values[i][2],
                        attribute: res.values[i][3],
                        images: {
                            promo: res.values[i][11],
                            detail: res.values[i][12],
                            original: res.values[i][13],
                            awakened: res.values[i][14]
                        },
                        source: {
                            type: res.values[i][7],
                            eventName: res.values[i][8]
                        },
                        availability: {
                            TW: true,
                            JP: res.values[i][9] === 'TRUE',
                            EN: res.values[i][10] === 'TRUE'
                        },
                        metadata: {
                            nation: res.values[i][4],
                            archive: res.values[i][6]
                        }
                    });
                }
                this.setState({suits});
            })
    }

    renderSuitCard = (suit, idx) => {
        return (
            <div className='suit-card' key={idx} onClick={this.setActiveSuit.bind(this,suit)}>
                <img src={suit.images.promo} className='suit-img' alt={suit.name}/>
                <p className='suit-name'> {suit.name} </p>
            </div>
        )
    }

    setActiveSuit = (activeSuit) => {
        if(this.state.activeSuit === activeSuit) {
            this.setState({activeSuit: null});
        } else {
            this.setState({activeSuit});
        }
    }

    closePane = () => {
        this.setState({activeSuit: null});
    }

    render() {
        if(!this.state.suits) return null;
        return (
          <div className='suit-cards-container'>
            <SuitDetail suit={this.state.activeSuit} closePane={this.closePane}/>
            {this.state.suits.map(this.renderSuitCard)}
          </div>
        );
    }
}
