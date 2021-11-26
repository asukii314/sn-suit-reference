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
        if(!this.props.iconUrl?.length) return (
            <div className='reflection-info-card' >
                <div className='reflection-card-column'>
                    <div className="CoR-title">Skill Info</div>
                    <div className="CoR-description" style={{marginTop: '5px', color: 'darkgray'}}><i>(no skill info found)</i></div>
                </div>
            </div>
        );
        return (
            <div className='reflection-info-card'>
                <div className='reflection-card-column'>
                    <div className="CoR-title">Skill Info</div>
                    <img className='reflection-icon' src={this.props.iconUrl} alt='reflection-icon' />
                </div>
                <div className='reflection-card-column'>
                    <div className="level-input">
                        <button className='CoR-level-change' onClick={this.decrement}>-</button>
                        <div className='CoR-level'>{`Lvl ${this.state.level}`}</div>
                        <button className='CoR-level-change' onClick={this.increment}>+</button>
                    </div>
                    <div className="CoR-description" dangerouslySetInnerHTML={{__html: this.props.CoR[this.state.level]}}></div>
                </div>
            </div>
        );
    }
}
