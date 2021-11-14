import { Component } from 'react';
import './reflectionInfo.css';

export default class ReflectionInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 1
        };
    }

    decrement = () => {
        if(this.state.level > 1) {
            this.setState({ level: this.state.level - 1 })
        };
    }

    increment = () => {
        if(this.state.level < 5){
            this.setState({ level: this.state.level + 1 })
        }
    }

    render() {
        if(!this.props.iconUrl && !this.props.CoR) return null;
        return (
            <div className='reflection-info-card'>
                <img className='reflection-icon' src={this.props.iconUrl} alt='reflection-icon' />
                <div className="CoR-title">Call of Reflection</div>
                <div className="level-input">
                    <button className='CoR-level-change' onClick={this.decrement}>-</button>
                    <div className='CoR-level'>{`Level ${this.state.level}`}</div>
                    <button className='CoR-level-change' onClick={this.increment}>+</button>
                </div>
                <div class="CoR-description" dangerouslySetInnerHTML={{__html: this.props.CoR[this.state.level]}}></div>
            </div>
        );
    }
}
