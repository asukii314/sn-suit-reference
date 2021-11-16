import { Component } from 'react';
import './suitFilter.css';
import FilterBox from './filterBox';

export default class SuitFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            filters: {
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
                },
                'Source Type': {
                    Pavillion: false,
                    Crafting: false,
                    Free: false,
                    Paid: false
                }
            }
        };
        this.metadata = {
            Rarity: {
                paths: ['rarity'],
                hasIcons: true,
            },
            Attribute: {
                paths: ['attribute'],
                hasIcons: true,
            },
            'Source Type': {
                paths: ['source', 'type'],
                hasIcons: false
            }
        }
    }

    getNestedValue = (obj, path) => {
        let res = obj;
        for(const step of path){
            res = res?.[step];
        }
        return res;
    }

    updateFilter = (category, option, value) => {
        return this.setState({
            filters: {
                ...this.state.filters,
                [category]: {
                    ...this.state.filters[category],
                    [option]: value
                }
            }

        }, this.filterSuits)
    }

    filterSuits = () => {
        const filteredCategories = Object.keys(this.state.filters).filter((category) =>
            Object.values(this.state.filters[category]).some((val) => !!val)
        )
        const res = filteredCategories.reduce((suits, category) => {
            const appliedFilters = Object.keys(this.state.filters[category]).filter((val) =>
                this.state.filters[category][val]
            ).map((v) => v.toLowerCase());
            return suits.filter((suit) => {
                const suitVal = this.getNestedValue(suit, this.metadata[category].paths).toLowerCase();
                return appliedFilters.includes(suitVal);
            })
        }, this.props.suits);
        this.props.updateFilteredSuits(res);
    }

    renderFilters = () => {
        return Object.keys(this.state.filters).map((category) => {
            return (
                <FilterBox
                    category={category}
                    key={category}
                    options={this.state.filters[category]}
                    onChange={this.updateFilter.bind(this,category)}
                    hasIcons={this.metadata[category].hasIcons}
                />
            )
        })
    }

    render() {
        return (
            <div className='suit-filter-container'>
                <div className='toggle-filter-btn' onClick={this.props.toggleFilterPane}>
                    <img className='toggle-filter-icon' src='filter-icon.png' />
                    <div className='toggle-filter-label'>{this.props.expanded ? 'Hide Filters' : 'Show Filters'}</div>
                </div>
                {this.props.expanded && <div className='filter-title'>Filters</div>}
                {this.props.expanded && this.renderFilters()}
            </div>
        );
    }
}
