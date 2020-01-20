import React, { Component, Fragment } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import MapMarkers from './MapMarkers'
//https://react-google-maps-api-docs.netlify.com/

//it seems wrapping markers in fragments will make them not appear on the map

import { connect } from 'react-redux'
import { getMemories, emptyMemories } from '../actions/memories'
import { getPanorama } from '../actions/streetview'
import {
    toggleInfoWindow, toggleShowPanorama, setActiveMarker, setSelectedPlace
} from '../actions/dashboard'

//can set marker properly at the app state level, but for some reason is not immediately updated here

class MapContainer extends Component {

    // https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
        }
    }

    componentDidMount() {
        //gets the data for all memories
        this.props.emptyMemories();
        this.props.getMemories();
        //loads google's api, only need to do this once
        this.props.getPanorama();
        //console.log("mounted")
        //console.log(this.props.match.path)

    }

    onMarkerClick = (properties, marker, e) => {
        this.props.setActiveMarker(marker)
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


    displayMarkers = () => {

        return this.props.memories_list.map((memory, index) => {
            return (
                <Marker
                    name={memory.title}
                    address={memory.camera_address}
                    key={index}
                    id={index}
                    position={{
                        lat: memory.latitude,
                        lng: memory.longitude
                    }}
                    pov={{
                        heading: memory.heading,
                        pitch: memory.pitch
                    }}
                    zoom={memory.zoom}
                    onClick={this.onMarkerClick} />
            )

        })
    }

    togglePanorama = (e) => {
        this.props.toggleShowPanorama()

    }


    onInfoWindowOpen(props, e) {
        var { lat, lng } = this.props.dashboard.selectedPlace.position
        var { heading, pitch } = this.props.dashboard.selectedPlace.pov
        var zoom = this.props.dashboard.zoom
        const coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
        const markerId = this.props.dashboard.selectedPlace.id
        const photoSrc = this.props.memories_list[markerId].photo
        const memory_description = this.props.memories_list[markerId].description
        const content = (
            <div>
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

        ReactDOM.render(React.Children.only(content), document.getElementById("InfoWindowContent"));

        var panorama = new window.google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
            position: coordinates,
            pov: {
                heading: heading, pitch: pitch
            },
            zoom: zoom
        });


        panorama.addListener('position_changed', function () {
        });

        panorama.addListener('pov_changed', function () {
        });

        //map.setStreetView(panorama);

    }



    render() {

        return (this.props.panoramaReady && this.props.memories_list.length) ? (

            <div className="mapContainerStyle">
                {console.log("started whole map process")}
                <Map id='mapcontainer'
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={8}
                    initialCenter={{ lat: 45.5017, lng: - 73.58781 }
                    }
                >
                    {this.displayMarkers()}
                    <InfoWindow
                        marker={this.props.dashboard.activeMarker}
                        visible={
                            true
                        }
                        maxWidth="800px"
                        onOpen={e => {
                            this.onInfoWindowOpen(this.props, e);
                        }}
                    >

                        <div id="InfoWindowContent" />

                    </InfoWindow>
                </Map >
                {console.log("got to the end")}
            </div>

        ) : (null)


    }
}


const mapStateToProps = state => ({
    dashboard: state.dashboard,
    memories_list: state.memories.memories,
    panoramaReady: state.streetview.panoramaReady
})


export default connect(mapStateToProps, {
    getPanorama, getMemories, emptyMemories, toggleInfoWindow, toggleShowPanorama, setActiveMarker,
    setSelectedPlace
})((GoogleApiWrapper({
    apiKey: 'AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk'
}))(MapContainer))

