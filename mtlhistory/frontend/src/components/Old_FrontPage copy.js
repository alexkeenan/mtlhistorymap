import React, { Component, Fragment } from 'react'
import FrontPageMap from './Old_FrontPageMap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { getMemories, emptyMemories } from '../actions/memories'
import { getGoogleAPI } from '../actions/dashboard'
import {
    toggleInfoWindow, toggleShowPanorama, setActiveMarker, setSelectedPlace
} from '../actions/dashboard'
//import { MarkerClusterer } from './MarkerClusterer'
class FrontPage extends Component {

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
    }

    componentDidUpdate() {
        console.log("COMPONENT UPDATING")

        /*
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        */

        if (this.props.dashboard.googleApiLoaded) {
            var markers = this.props.memories_list.map((memory, index) => {

                /*
                return new google.maps.Marker({
                    name: memory.title,
                    address: memory.camera_address,
                    key: index,
                    id: index,
                    position: {
                        lat: memory.latitude,
                        lng: memory.longitude
                    },
                    pov: {
                        heading: memory.heading,
                        pitch: memory.pitch
                    },
                    //zoom: memory.zoom,
                    click: this.onMarkerClick
                })

                */


                return new google.maps.Marker({
                    position: {
                        lat: memory.latitude,
                        lng: memory.longitude
                    },
                    label: memory.title,
                });


            })

        }

        if (this.props.dashboard.mapSet) {
            console.log("detected mapSet")
            var map = this.props.dashboard.map
        }

        if (this.props.dashboard.clustersLoaded && this.props.dashboard.mapSet) {
            console.log("markerclusterer set")

            console.log("markers")
            console.log(markers)

            console.log("map")
            console.log(map)

            var markerCluster = new MarkerClusterer(map, markers,
                { imagePath: 'https://mtlhistory-files.s3.amazonaws.com/media/mapicons/m' });
        }



    }

    onMarkerClick = (properties, marker, e) => {
        this.props.setActiveMarker(marker)
        this.props.setSelectedPlace(properties)
        this.setState(prevState => ({
            ...prevState,
            showingInfoWindow: !prevState.showingInfoWindow
        }))
    }




    /*
    displayMarkers = () => {

        return this.props.memories_list.map((memory, index) => {
            new google.maps.Marker({
                name: memory.title,
                address: memory.camera_address,
                key: index,
                id: index,
                position: {
                    lat: memory.latitude,
                    lng: memory.longitude
                },
                pov: {
                    heading: memory.heading,
                    pitch: memory.pitch
                },
                zoom: memory.zoom,
                onClick: this.onMarkerClick
            })

        })
    }

    */



    togglePanorama = (e) => {
        this.props.toggleShowPanorama()

    }


    onInfoWindowOpen(props, e) {
        var { lat, lng } = this.props.dashboard.selectedPlace.position
        var { heading, pitch } = this.props.dashboard.selectedPlace.pov
        var zoom = this.props.dashboard.selectedPlace.zoom
        console.log(zoom)
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


    /*
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
    */


    render() {





        return (
            <Fragment>
                <div className="mapContainerStyle">

                    <FrontPageMap />

                </div>

            </Fragment >

        )


    }
}


const mapStateToProps = state => ({
    dashboard: state.dashboard,
    memories_list: state.memories.memories,
    googleApiLoaded: state.dashboard.googleApiLoaded
})


export default connect(mapStateToProps, {
    getGoogleAPI, getMemories, emptyMemories, toggleInfoWindow, toggleShowPanorama, setActiveMarker,
    setSelectedPlace
})(FrontPage)

