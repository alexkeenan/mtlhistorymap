import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import MarkerCluster from './markerCluster'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux'
import { getMemories, emptyMemories } from '../actions/memories'
import { getGoogleAPI, getCluster } from '../actions/dashboard'
import { getPanorama } from '../actions/streetview'
import {
    toggleInfoWindow, toggleShowPanorama, setActiveMarker, setSelectedPlace
} from '../actions/dashboard'

//can set marker properly at the app state level, but for some reason is not immediately updated here
//https://react-google-maps-api-docs.netlify.com/

//https://github.com/fullstackreact/google-maps-react/issues/31
//it seems wrapping markers in fragments will make them not appear on the map


class MapContainer extends Component {

    // https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
        }
    }

    componentDidMount() {
        this.props.emptyMemories();
        this.props.getMemories();

        if (!this.props.dashboard.googleApiLoaded) {

            this.props.getGoogleAPI()
        }


        if (!this.props.dashboard.clustersLoaded) {
            this.props.getCluster()
        }



    }

    onMarkerClick = (properties, marker, e) => {
        this.props.setActiveMarker(properties)
        this.props.setSelectedPlace(properties)
        this.setState(prevState => ({
            ...prevState,
            showingInfoWindow: !prevState.showingInfoWindow
        }))
    }

    onMapClicked = (props) => {
        if (this.props.showInfoWindow) {
            this.props.toggleInfoWindow()
        }
    };


    togglePanorama = (e) => {
        this.props.toggleShowPanorama()

    }


    onInfoWindowOpen = () => {

        var { lat, lng } = this.props.dashboard.selectedPlace.markerposition
        var { heading, pitch } = this.props.dashboard.selectedPlace.pov
        var zoom = this.props.dashboard.selectedPlace.zoom

        const coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
        const markerId = this.props.dashboard.selectedPlace.id
        const photoSrc = this.props.memories_list[markerId].photo
        const memory_description = this.props.memories_list[markerId].description
        const content = (
            <div className="FrontPageInfoWindow">
                <h3 > {this.props.dashboard.selectedPlace.name}</h3>
                <div id="infoWindowContent">
                    <div id="memory">
                        <img src={photoSrc} width="100%" height="100%"></img>
                    </div>
                    <div id="pano"></div>
                    <div id="memory_description">{memory_description}</div>
                </div>

            </div>
        )

        //ReactDOM.render(React.Children.only(content), document.getElementById("InfoWindowContent"));
        ReactDOM.render(content, document.getElementById("InfoWindowContent"));

        var panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
            position: coordinates,
            pov: {
                heading: heading, pitch: pitch
            },
            zoom: zoom
        });

    }




    render() {

        return (this.props.dashboard.googleApiLoaded && this.props.dashboard.clustersLoaded) ? (

            <div className="mapContainerStyle">
                <Map id='mapcontainer'
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={8}
                    initialCenter={{ lat: 45.5017, lng: - 73.58781 }
                    }
                >

                    <MarkerCluster
                        markers={this.props.memories_list}
                        click={this.onMarkerClick}
                    />

                    <InfoWindow
                        marker={this.props.dashboard.activeMarker}
                        visible={
                            true
                        }
                        maxWidth="800px"
                        onOpen={this.onInfoWindowOpen}
                    >

                        <div id="InfoWindowContent" />

                    </InfoWindow>
                </Map >
            </div >

        ) : (null)
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    mapSet: state.dashboard.mapSet,
    memories_list: state.memories.memories,
})

export default connect(mapStateToProps, {
    getPanorama, getMemories, emptyMemories, toggleInfoWindow, toggleShowPanorama, setActiveMarker, getGoogleAPI, getCluster,
    setSelectedPlace
})((GoogleApiWrapper({
    apiKey: 'AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk'
}))(MapContainer))


