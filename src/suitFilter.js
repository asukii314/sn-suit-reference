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
        this.setState({
            [category]: {
                ...this.state[category],
                [option]: value
            }
        });
    }

    renderFilters = () => {
        return Object.keys(this.state).map((category) => {
            return (
                <FilterBox category={category} key={category} options={Object.keys(this.state[category])} onChange={this.updateFilter.bind(this,category)}/>
            )
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className='suit-filter-container'>
                <div className='filter-title'>Filters</div>
                {this.renderFilters()}
            </div>
        );
    }
}
