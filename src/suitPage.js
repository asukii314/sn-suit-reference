import { Component } from 'react';
import SuitDetail from './suitDetail';
import SuitCards from './suits';
import 'whatwg-fetch';
import './suits.css';

export default class SuitPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            suits: [],
            activeSuit: null
        };
    }
    componentDidMount() {
            window.fetch('https://sheets.googleapis.com/v4/spreadsheets/1XkJ4QD8pzoOwL97lFtTSAv2fOb3DikNQYDNkXn6LL9Y/values/Reflections?key=AIzaSyBXC3NZmF3G0LK50YSS4EY4yxb3W7AJa80')
            .then(r => r.json())
            .then(res => {
                let reflections = {};

                for(let i = 1; i < res.values.length; i++) {
                    const skills_a = res.values[i][9].split('\n');
                    const skills_b = res.values[i][10].split('\n')
                    reflections[res.values[i][1]] = {
                        // name: res.values[i][0],
                        // suitName: res.values[i][1],
                        tier: res.values[i][2],
                        images: {
                            icon: res.values[i][3],
                            original: res.values[i][4],
                            awakened: res.values[i][5]
                        },
                        CoR: [
                            null,
                            res.values[i][7].replace('A%', `<b style="color:#d1668f">${skills_a[0]}</b>`).replace('B%', `<b style="color:#d1668f">${skills_b[0]}</b>`).replace('\n\n', ' · '),
                            res.values[i][7].replace('A%', `<b style="color:#d1668f">${skills_a[1]}</b>`).replace('B%', `<b style="color:#d1668f">${skills_b[1]}</b>`).replace('\n\n', ' · '),
                            res.values[i][7].replace('A%', `<b style="color:#d1668f">${skills_a[2]}</b>`).replace('B%', `<b style="color:#d1668f">${skills_b[2]}</b>`).replace('\n\n', ' · '),
                            res.values[i][7].replace('A%', `<b style="color:#d1668f">${skills_a[3]}</b>`).replace('B%', `<b style="color:#d1668f">${skills_b[3]}</b>`).replace('\n\n', ' · '),
                            res.values[i][7].replace('A%', `<b style="color:#d1668f">${skills_a[4]}</b>`).replace('B%', `<b style="color:#d1668f">${skills_b[4]}</b>`).replace('\n\n', ' · ')
                        ]
                    };
                }
                return reflections;
            })
            .then((reflections) => {
                window.fetch('https://sheets.googleapis.com/v4/spreadsheets/1XkJ4QD8pzoOwL97lFtTSAv2fOb3DikNQYDNkXn6LL9Y/values/Suits?key=AIzaSyBXC3NZmF3G0LK50YSS4EY4yxb3W7AJa80')
                .then(r => r.json())
                .then(res => {
                    let suits = [];
                    for(let i = 1; i < res.values.length; i++) {
                        suits.push({
                            name: res.values[i][0],
                            awakenedName: res.values[i][1],
                            reflection: {
                                name: res.values[i][5],
                                ...reflections[res.values[i][0]]
                            },
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
            })
    }

    setActiveSuit = (suit) => {
        if(this.state.activeSuit === suit) {
            this.closePane();
        } else {
            this.setState({activeSuit: suit});
        }
    }

    closePane = () => {
        this.setState({activeSuit: null});
    }

    render() {
        if(!this.state.suits) return null;
        return (
            <div>
                <SuitDetail
                    suit={this.state.activeSuit}
                    closePane={this.closePane}
                />
                <SuitCards
                    suits={this.state.suits}
                    activeSuit={this.state.activeSuit}
                    setActiveSuit={this.setActiveSuit}
                />
          </div>
        );
    }
}
