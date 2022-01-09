import { Component } from 'react';
import './zoomableImage.css';

export default class SuitDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            zoomed: false,
            loading: true,
        };
    }

    toggleZoom = () => {
        this.setState({zoomed: !this.state.zoomed})
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.src !== nextProps.src) {
            this.setState({loading: true})
        }
    }

    render() {
        return (
            <div className='zoomable-img-wrapper'>
                <div
                    className={this.state.zoomed ? 'dark-background' : ''}
                    onClick={this.toggleZoom}
                />
                {!this.state.zoomed && (
                    <div>
                         <img src='zoom-in-button.png' className='zoom-in-button-background' alt='click to zoom' onClick={this.toggleZoom} />
                         <img src='zoom-in-button.png' className='zoom-in-button' alt='click to zoom' onClick={this.toggleZoom} />
                     </div>
                 )}

                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <img
                        className={`${this.props.className}${this.state.loading ? ' loading' : ''} zoomed-out`}
                        src={this.props.src}
                        alt={this.props.alt}
                        onClick={this.toggleZoom}
                        onLoad={() => this.setState({loading: false})}
                    />
                    {this.state.loading && <div id="loading-spinner" />}
                </div>
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
