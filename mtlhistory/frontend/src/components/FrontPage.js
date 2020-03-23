import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import MarkerCluster from './markerCluster'
import MemoryFilter from './MemoryFilter'

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux'
import { getMemories, emptyMemories, filterMemories } from '../actions/memories'
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
        this.props.getMemories(); //pulls all memories from the database

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
        const photoSrc = this.props.memories.visibleMemories[markerId].photo
        const memory_description = this.props.memories.visibleMemories[markerId].description
        const content = (
            <div className="FrontPageInfoWindow">
                <h3 > {this.props.dashboard.selectedPlace.name}</h3>
                <div id="infoWindowContent" className="row">

                    <div className="col-sm-12">
                        <img className="col-sm-6" id="memory" src={photoSrc} ></img>

                        <div className="col-sm-6" id="pano"></div>
                    </div>
                    <div className="row">
                        <div id="memory_description" className="col-sm-12">{memory_description}</div>
                    </div>
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

        const containerStyle = { position: 'absolute', width: '100%', height: '89.5%' }

        // controls for the map

        // mapTypeId: mapTypeIds[mapTypeFromProps],
        //     center: center,
        //         zoom: this.props.zoom,
        //             maxZoom: this.props.maxZoom,
        //                 minZoom: this.props.minZoom,
        //                     clickableIcons: !!this.props.clickableIcons,
        //                         disableDefaultUI: this.props.disableDefaultUI,
        //                             zoomControl: this.props.zoomControl,
        //                                 mapTypeControl: this.props.mapTypeControl,
        //                                     scaleControl: this.props.scaleControl,
        //                                         streetViewControl: this.props.streetViewControl,
        //                                             panControl: this.props.panControl,
        //                                                 rotateControl: this.props.rotateControl,
        //                                                     fullscreenControl: this.props.fullscreenControl,
        //                                                         scrollwheel: this.props.scrollwheel,
        //                                                             draggable: this.props.draggable,
        //                                                                 keyboardShortcuts: this.props.keyboardShortcuts,
        //                                                                     disableDoubleClickZoom: this.props.disableDoubleClickZoom,
        //                                                                         noClear: this.props.noClear,
        //                                                                             styles: this.props.styles,
        //                                                                                 gestureHandling: this.props.gestureHandling


        console.log("RENDERING")
        console.log("this.props.memories.visibleMemories", this.props.memories.visibleMemories)
        return (this.props.dashboard.googleApiLoaded && this.props.dashboard.clustersLoaded) ? (

            <div className="mapContainerStyle">
                <Map id='mapcontainer'
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={8}
                    initialCenter={{ lat: 45.5017, lng: - 73.58781 }}
                    streetViewControl={false}
                    disableDefaultUI={true}
                    mapTypeControl={false}
                    containerStyle={containerStyle}
                >

                    <MarkerCluster
                        markers={this.props.memories.visibleMemories}
                        click={this.onMarkerClick}
                    />

                    <InfoWindow
                        className="col-sm-8"
                        marker={this.props.dashboard.activeMarker}
                        visible={
                            true
                        }
                        maxWidth="800px"
                        maxHeight="800px"
                        onOpen={this.onInfoWindowOpen}
                    >

                        <div id="InfoWindowContent" />

                    </InfoWindow>




                </Map >

                <MemoryFilter />
            </div >

        ) : (null)
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    mapSet: state.dashboard.mapSet,
    memories: state.memories,

})

export default connect(mapStateToProps, {
    getPanorama, getMemories, emptyMemories, toggleInfoWindow, toggleShowPanorama, setActiveMarker, getGoogleAPI, getCluster, filterMemories,
    setSelectedPlace
})((GoogleApiWrapper({
    apiKey:
        process.env.API_KEY
    //'AIzaSyBo5X5wnWjZuNrmmAnIon65aH2lcAbgDIU'
}))(MapContainer))


