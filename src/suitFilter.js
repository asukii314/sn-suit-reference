import { Component } from 'react';
import './suitFilter.css';
import FilterBox from './filterBox';

export default class SuitFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            Rarity: {
                R: false,
                SR: false,
                SSR: false,
                UR: false
            },
            Attribute: {
                Cool: false,
                Elegant: false,
                Fresh: false,
                Sexy: false,
                Sweet: false
            }
        };
    }

    updateFilter = (category, option, value) => {
        return this.setState({
            [category]: {
                ...this.state[category],
                [option]: value
            }
        }, this.filterSuits)
    }

    filterSuits = () => {
        const filteredCategories = Object.keys(this.state).filter((category) =>
            Object.values(this.state[category]).some((val) => !!val)
        )
        const res = filteredCategories.reduce((suits, category) => {
            const appliedFilters = Object.keys(this.state[category]).filter((val) =>
                this.state[category][val]
            ).map((v) => v.toLowerCase());
            return suits.filter((suit) => {
                const suitVal = suit[category.toLowerCase()].toLowerCase();
                return appliedFilters.includes(suitVal);
            })
        }, this.props.suits);
        this.props.updateFilteredSuits(res);
    }

    renderFilters = () => {
        return Object.keys(this.state).map((category) => {
            return (
                <FilterBox
                    category={category}
                    key={category}
                    options={Object.keys(this.state[category])}
                    onChange={this.updateFilter.bind(this,category)}
                />
            )
        })
    }

    render() {
        return (
            <div className='suit-filter-container'>
                <div className='filter-title'>Filters</div>
                {this.renderFilters()}
            </div>
        );
    }
}
