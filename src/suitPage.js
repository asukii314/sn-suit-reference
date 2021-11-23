import { Component } from 'react';
import SuitDetail from './suitDetail';
import SuitCards from './suits';
import SuitFilter from './suitFilter';
import fetchAllSuits from './fetchSuitInfo';
import './suits.css';

export default class SuitPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            suits: [],
            filteredSuits: [],
            activeSuit: null,
            filterPaneOpen: false
        };
    }
    componentDidMount() {
        fetchAllSuits().then((suits) => {
            this.setState({
                suits: suits,
                filteredSuits: suits
            });
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

    updateFilteredSuits = (filteredSuits) => {
        this.setState({filteredSuits});
    }

    toggleFilterPane = () => {
        this.setState({filterPaneOpen: !this.state.filterPaneOpen});
    }

    nextSuit = ({forward=true}={}) => {
        if(!this.state.activeSuit) return;
        const curSuitIdx = this.state.filteredSuits.map(suit => suit.name).indexOf(this.state.activeSuit.name);
        const newSuitIdx = curSuitIdx + (forward ? 1 : -1);
        if(newSuitIdx < 0 || newSuitIdx >= this.state.filteredSuits.length) return;
        this.setActiveSuit(this.state.filteredSuits[newSuitIdx]);
    }

    render() {
        if(!this.state.suits) return null;
        return (
            <div>
                <SuitFilter
                    suits={this.state.suits}
                    updateFilteredSuits={this.updateFilteredSuits}
                    expanded={this.state.filterPaneOpen}
                    toggleFilterPane={this.toggleFilterPane}
                    setActiveSuit={this.setActiveSuit}
                />
                <div className={this.state.filterPaneOpen ? 'narrow' : 'wide'}>
                    <SuitDetail
                        suit={this.state.activeSuit}
                        closePane={this.closePane}
                        nextSuit={this.nextSuit}
                    />
                    <SuitCards
                        suits={this.state.filteredSuits}
                        activeSuit={this.state.activeSuit}
                        setActiveSuit={this.setActiveSuit}
                        nextSuit={this.nextSuit}
                    />
                </div>
          </div>
        );
    }
}
