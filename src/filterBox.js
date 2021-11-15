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

    toggleCheckbox = (option, e) => {
        this.props.onChange(option, e.target.checked)
    }

    showOptions = () => {
        return (
            this.props.options.map((option) => {
            return (
                <div className='filter-option' key={`${option}-container`}>
                    <input type='checkbox' key={`${option}-checkbox`} onChange={this.toggleCheckbox.bind(this,option)}/>
                    <div className='filter-label' key={`${option}-label`}>{option}</div>
                </div>
            );
        })
    )
    }


    render() {
        return (
            <div className='filter-box-container' >
            <div className='filter-box-title' onClick={this.toggleExpand}>{this.props.category}</div>
                {this.state.expanded && (<div className='filter-option-container'>{this.showOptions()}</div>)}
            </div>
        );
    }
}
