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
            <img
                className={this.props.className + (this.state.zoomed ? ' zoomed-in' : ' zoomed-out')}
                src={this.props.src}
                alt={this.props.alt}
                onClick={this.toggleZoom}
            />
        );
    }
}
