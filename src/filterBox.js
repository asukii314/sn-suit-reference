import { Component } from 'react';
import './filterBox.css';

export default class FilterBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: true
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
            Object.keys(this.props.options).map((option) => {
            return (
                <div className='filter-option' key={`${option}-container`}>
                    <input type='checkbox' key={`${option}-checkbox`} checked={this.props.options[option]} onChange={this.toggleCheckbox.bind(this,option)}/>
                    <img className='filter-icon' key={`${option}-icon`} src={`${this.props.category.toLowerCase()}/${option.toLowerCase()}.png`} />
                    <div className='filter-label' key={`${option}-label`}>{option}</div>
                </div>
            );
        })
    )
    }


    render() {
        return (
            <div className='filter-box-container' >
            <div className='filter-box-title' onClick={this.toggleExpand}>
                <div>{this.props.category}</div>
                <div style={{fontWeight: 'normal', fontSize: '10px'}}>{this.state.expanded ? '∧' : '∨'}</div>
            </div>

                {this.state.expanded && (<div className='filter-option-container'>{this.showOptions()}</div>)}
            </div>
        );
    }
}
