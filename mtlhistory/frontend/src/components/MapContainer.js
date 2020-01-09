import React, { Component, Fragment } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import MapMarkers from './MapMarkers'
//https://react-google-maps-api-docs.netlify.com/

//it seems wrapping markers in fragments will make them not appear on the map

import { connect } from 'react-redux'
import { getMemories, getMemoryForm } from '../actions/memories'
import { getPanorama } from '../actions/streetview'
import {
    toggleInfoWindow, toggleShowPanorama, setActiveMarker, setSelectedPlace
} from '../actions/dashboard'


//can set marker properly at the app state level, but for some reason is not immediately updated here
//

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
        this.props.getMemories();
        //loads google's api
        this.props.getPanorama();

        //trying this out
        this.props.getMemoryForm()

        console.log("mounted")
        console.log(this.props.match.path)

    }


    //props, marker, e
    onMarkerClick = (properties, marker, e) => {

        this.props.setActiveMarker(marker)
        //for some reason active marker doesn't show up here.

        this.props.setSelectedPlace(properties)
        //this.props.toggleInfoWindow(

        this.setState(prevState => ({
            ...prevState,
            showingInfoWindow: !prevState.showingInfoWindow
        }))
        //active marker is not defined
    }

    onMapClicked = (props) => {
        //closes the info window
        if (this.props.showInfoWindow) {
            this.props.toggleInfoWindow()
        }
    };


    displayMarkers = () => {
        console.log("this.props.memories_list")
        console.log(this.props.memories_list)

        //the problem is that the new memory you create will show up as "undefined in this list", why is that?
        //almost like memories is not fully updated. But isn't that what redux is supposed to take care of?


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

        //this.setState({mapDiv: this.mapDiv.current,            panDiv: this.panDiv.current,        });

        ReactDOM.render(React.Children.only(content), document.getElementById("InfoWindowContent"));

        //var map = new google.maps.Map(            document.getElementById('map'), {center: coordinates,            zoom: 14        });

        const panorama = new window.google.maps.StreetViewPanorama(
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


        return this.props.panoramaReady ? (
            <div className="mapContainerStyle">
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
                            //this.props.dashboard.showingInfoWindow
                            //this.state.showingInfoWindow
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
    getMemories, getPanorama, toggleInfoWindow, toggleShowPanorama, setActiveMarker,
    setSelectedPlace, getMemoryForm
})((GoogleApiWrapper({
    apiKey: 'AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk'
}))(MapContainer))

