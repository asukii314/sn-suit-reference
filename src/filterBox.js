import { Component } from 'react';
import './filterBox.css';

export default class FilterBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        };
    }

    toggleExpand = () => {
        this.setState({expanded: !this.state.expanded})
    }

    toggleCheckbox = (option, parent, e) => {
        this.props.onChange(this.props.category, (this.props.category === parent ? null : parent), option, e.target.checked)
    }

    showChildren = (option) => {
        if (!this.props.subcategories?.[option] || !this.props.checked[option]){
            return null;
        } else {
            return (
                <div className='child-option-container'>
                    {this.showOptions(
                        Object.keys(this.props.subcategories[option]),
                        this.props.subcategories[option],
                        option
                    )}
                </div>
            )

        }
    }

    showOptions = (options, status, parent) => {
        return (
            options.map((option) => {
            return (
                <div key={`${option}-wrapper`}>
                    <div className='filter-option' key={`${option}-container`}>
                        <input
                            type='checkbox'
                            key={`${option}-checkbox`}
                            checked={status[option]}
                            onChange={this.toggleCheckbox.bind(this,option, parent)}
                        />
                        {this.props.hasIcons && <img
                            className='filter-icon'
                            key={`${option}-icon`}
                            alt={`${option}-icon`}
                            src={`${this.props.category.toLowerCase()}/${option.toLowerCase()}.png`}
                        />}
                        <div className='filter-label' key={`${option}-label`}>{option}</div>
                    </div>
                    {this.showChildren(option)}
                </div>
            );
        })
    )
    }

    showAllOptions = () => {
        return this.showOptions(
            Object.keys(this.props.checked),
            this.props.checked,
            this.props.category
        );
    }

    // todo - make this care about subcategories
    getNumAppliedFilters = () => {
        return Object.values(this.props.checked).filter(c => c).length;
    }

    render() {
        return (
            <div className='filter-box-container' >
            <div className='filter-box-title' onClick={this.toggleExpand}>
                <div className='title-text-wrapper'>
                    <div>{this.props.category}</div>
                    {this.getNumAppliedFilters() > 0 && <div className='applied-filters'>{this.getNumAppliedFilters()}</div>}
                </div>
                <div style={{fontWeight: 'normal', fontSize: '10px'}}>{this.state.expanded ? '∧' : '∨'}</div>
            </div>

                {this.state.expanded && (<div className='filter-option-container'>{this.showAllOptions()}</div>)}
            </div>
        );
    }
}
