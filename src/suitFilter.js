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
                Source: {
                    Pavillion: false,
                    Crafting: false,
                    Free: false,
                    Paid: false,
                    'Other event type': false
                }
            },
            childFilters: {
                Source: {
                    Pavillion: {
                        'Permanent': false,
                        'Rotational': false,
                        'Event': false,
                        'Collab': false,
                    },
                    Crafting: {
                        'Lifetime': false,
                        'Chapter suit': false,
                        'Mind maze': false,
                        'Memory stairway': false,
                        'Other': false,
                    },
                    Free: {
                        'Arena': false,
                        'Pinnacle battle': false,
                        'Styling competition': false,
                        'Intel hub': false,
                        'Welfare': false,
                        'Other': false,
                    },
                    Paid: {
                        'Recharge': false,
                        'VIP level': false,
                        'Fashion plan': false,
                        'Purple diamonds': false,
                    }
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
            Source: {
                paths: ['source', 'type'],
                hasIcons: false,
                childPaths: ['source', 'subtype']
            },
        }
    }

    getNestedValue = (obj, path) => {
        let res = obj;
        for(const step of path){
            res = res?.[step];
        }
        return res;
    }

    updateFilter = (category, subcategory, option, value) => {
        if(subcategory === null) {
            return this.setState({
                filters: {
                    ...this.state.filters,
                    [category]: {
                        ...this.state.filters[category],
                        [option]: value
                    }
                }

            }, this.filterSuits)
        } else {
            return this.setState({
                childFilters: {
                    ...this.state.childFilters,
                    [category]: {
                        ...this.state.childFilters[category],
                        [subcategory]: {
                            ...this.state.childFilters[category][subcategory],
                            [option]: value
                        }
                    }
                }
            }, this.filterSuits)
        }
    }

    filterSuits = () => {
        const filteredCategories = Object.keys(this.state.filters).filter((category) =>
            Object.values(this.state.filters[category]).some((val) => !!val)
        )

        // parent categories
        const res = filteredCategories.reduce((suits, category) => {
            const appliedFilters = Object.keys(this.state.filters[category]).filter((val) =>
                this.state.filters[category][val]
            ).map((v) => v.toLowerCase());

            return suits.filter((suit) => {
                // can we rule out based on the parent categoories only?
                const suitVal = this.getNestedValue(suit, this.metadata[category].paths).toLowerCase();
                if(!appliedFilters.includes(suitVal)) return false;

                // check children
                if(this.state.childFilters[category]) {
                    let activeChildFilters = [], affectedParentFilters = [];
                    for (const subcategory of Object.keys(this.state.childFilters[category])) {
                        const selectedChildOptions = (
                            Object.keys(this.state.childFilters[category][subcategory])
                            .filter((option) => this.state.childFilters[category][subcategory][option])
                            .map(x => x.toLowerCase())
                        );

                        // affectedParentFilters -> if suit it from a category that hasn't been narrowed, don't force narrowing
                        if(selectedChildOptions.length > 0) {
                            activeChildFilters = activeChildFilters.concat(selectedChildOptions);
                            affectedParentFilters.push(subcategory.toLowerCase());
                        }
                    }

                    if(activeChildFilters.length > 0 && affectedParentFilters.includes(suitVal)) {
                        const suitSubVal = this.getNestedValue(suit, this.metadata[category].childPaths)?.toLowerCase();
                        if(!activeChildFilters.includes(suitSubVal)) {
                            return false;
                        }
                    }
                }

                return true;
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
                    checked={this.state.filters[category]}
                    subcategories={this.state.childFilters[category]}
                    onChange={this.updateFilter}
                    hasIcons={this.metadata[category].hasIcons}
                />
            )
        })
    }

    render() {
        return (
            <div className='suit-filter-container'>
                <div className='toggle-filter-btn' onClick={this.props.toggleFilterPane}>
                    <img className='toggle-filter-icon' alt='toggle-filters' src='filter-icon.png' />
                    <div className='toggle-filter-label'>{this.props.expanded ? 'Hide Filters' : 'Show Filters'}</div>
                </div>
                {this.props.expanded && <div className='filter-title'>Filters</div>}
                {this.props.expanded && this.renderFilters()}
            </div>
        );
    }
}
