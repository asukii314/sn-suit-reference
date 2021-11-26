import { Component } from 'react';
import './zoomableImage.css';

export default class SuitDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            zoomed: false
        };
    }

    toggleZoom = () => {
        this.setState({zoomed: !this.state.zoomed})
    }

    render() {
        return (
            <div className='zoomable-img-wrapper'>
                <div
                    className={this.state.zoomed ? 'dark-background' : ''}
                    onClick={this.toggleZoom}
                />
                <img
                    className={`${this.props.className} zoomed-out`}
                    src={this.props.src}
                    alt={this.props.alt}
                    onClick={this.toggleZoom}
                />
                {this.state.zoomed && <img
                    className={`${this.props.className} zoomed-in`}
                    src={this.props.src}
                    alt={this.props.alt}
                    onClick={this.toggleZoom}
                />}
            </div>
        );
    }
}
