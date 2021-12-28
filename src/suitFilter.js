import { Component } from 'react';
import './suitFilter.css';
import FilterBox from './filterBox';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const initialFilterState = {
    Rarity: {
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
    },
    Nation : {
        Apple: false,
        Cloud: false,
        Ninir: false,
        North: false,
        Pigeon: false,
        Ruin: false,
        Wasteland: false
    }
}

const initialChildFilterState = {
    Source: {
        Pavillion: {
            'Permanent': false,
            'Gleam': false,
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

export default class SuitFilter extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchByNameResults: null,
            searchByDesignerResults: null,
            filters: initialFilterState,
            childFilters: initialChildFilterState,
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
            Nation: {
                paths: ['nation'],
                hasIcons: true,
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

    filterSuits = ({triggerUpdate = true} = {}) => {
        const filteredCategories = Object.keys(this.state.filters).filter((category) =>
            Object.values(this.state.filters[category]).some((val) => !!val)
        )

        // check both search bars
        const searchedSuits = this.props.suits.filter((suit) => {
            if((this.state.searchByNameResults && !this.state.searchByNameResults.map(suit => suit.name).includes(suit.name)) ||
               (this.state.searchByDesignerResults && !this.state.searchByDesignerResults.map(suit => suit.name).includes(suit.name))) {
                   return false;
            }
            return true;
        })

        // check parent categories
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
        }, searchedSuits);
        if(triggerUpdate) {
            this.props.updateFilteredSuits(res);
        }
        return res;
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
                    isMobile={this.props.isMobile}
                />
            )
        })
    }

    handleSearch = (searchTerm, results) => {
        this.setState(
            {searchByNameResults: results},
            this.props.updateFilteredSuits(results)
        );
    }

    handleClear = () => {
        this.setState(
            {searchByNameResults: null},
            this.filterSuits
        );
    }

    handleSelect = (suit) => {
        this.handleSearch([suit]);
        this.props.setActiveSuit(suit);
    }

    handleDesignerSearch = (searchTerm, results) => {
        const designers = results.map(obj => obj.name);
        const filteredSuits =
            this.filterSuits({triggerUpdate: false})
                .filter(suit => designers.includes(suit.designer));

        this.setState(
            {searchByDesignerResults: filteredSuits},
            () => this.props.updateFilteredSuits(filteredSuits)
        );
    }

    handleDesignerSelect = (designerObj) => {
        this.handleDesignerSearch(null, [designerObj])
    }


    handleDesignerClear = () => {
        this.setState(
            {searchByDesignerResults: null},
            this.filterSuits
        );
    }

    renderSearchBars = () => {
        const designers = this.props.suits
            .map((suit) => suit.designer)
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter((name) => name.length > 0)
            .sort((a, b) => a.localeCompare(b))
            .map((name) => { return {name} })

        return (
            <div>
                {/*<div className='search-bar-wrapper first'>
                    <ReactSearchAutocomplete
                        items={this.props.suits}
                        placeholder='Search by suit name'
                        onSearch={this.handleSearch}
                        onSelect={this.handleSelect}
                        onClear={this.handleClear}
                        styling={{
                            fontSize: '11px',
                            height: '30px',
                            searchIconMargin: '0px 0px 0px 8px',
                        }}
                        useCaching={false}
                      />
                      </div>*/}
                      <div className='search-bar-wrapper'>
                      <ReactSearchAutocomplete
                          items={designers}
                          placeholder='Search by designer'
                          onSearch={this.handleDesignerSearch}
                          onSelect={this.handleDesignerSelect}
                          onClear={this.handleDesignerClear}
                          styling={{
                              fontSize: '11px',
                              height: '30px',
                              searchIconMargin: '0px 0px 0px 8px',
                              zIndex: 9 /* weird bug here;
                                            too high & it renders overtop of zoomed images with a higher z-index than itself,
                                            too low & list items render below the suit detail pane.
                                            leaving low for now but should investigate more later */
                          }}
                          useCaching={false}
                        />
                </div>
            </div>
        )
    }

    getNumAppliedFilters = () => {
        return Object.values(this.state.filters).map((categoryInfo) => {
            return Object.values(categoryInfo).filter(c => c).length
        }).reduce((sum, val) => sum + val, 0)
    }

    renderClearFiltersBtn = () => {
        return (
            <button
                className='clear-filters-btn'
                disabled={this.getNumAppliedFilters() === 0}
                onClick={(e) => {
                    e.stopPropagation();
                    this.setState({
                        filters: initialFilterState,
                        childFilters: initialChildFilterState
                    })
                }}
            >
            Clear Filters
            </button>
        )
    }

    render() {
        const numAppliedFilters = this.getNumAppliedFilters();
        return (
            <div className={`suit-filter-container ${this.props.expanded ? 'expanded' : 'collapsed'}`}>
                <div className='toggle-filter-btn' onClick={this.props.toggleFilterPane}>
                    <img
                        className={`toggle-filter-icon${this.props.expanded ? ' collapse' : ''}`}
                        alt='toggle-filter-view'
                        title={this.props.expanded ? 'Close filter pane' :'Open filter pane'}
                        src={this.props.expanded ? 'black-x-icon.png' :'filter-icon.png'}
                    />
                    <div className={`toggle-filter-label${this.props.expanded ? ' hidden' : ''}`}>Show Filters</div>
                    {numAppliedFilters > 0 && <div className={`applied-filters${this.props.expanded ? ' hidden' : ''}`}>{numAppliedFilters}</div>}
                    {numAppliedFilters > 0 && !this.props.expanded && this.renderClearFiltersBtn()}
                </div>
                <div className={this.props.expanded ? '' : 'hidden'}>
                    <div className='filter-fields-wrapper'>
                        {this.renderSearchBars()}
                        {this.renderFilters()}
                        {this.renderClearFiltersBtn()}
                    </div>
                </div>
            </div>
        );
    }
}
