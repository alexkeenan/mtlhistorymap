import React, { Component, Fragment } from 'react'
import FrontPageMap from './FrontPageMap'
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

        if (this.props.dashboard.googleApiLoaded) {

            var locations = [
                { lat: -31.563910, lng: 147.154312 },
                { lat: -33.718234, lng: 150.363181 },
                { lat: -33.727111, lng: 150.371124 },
                { lat: -33.848588, lng: 151.209834 },
                { lat: -33.851702, lng: 151.216968 },
                { lat: -34.671264, lng: 150.863657 },
                { lat: -35.304724, lng: 148.662905 },
                { lat: -36.817685, lng: 175.699196 },
                { lat: -36.828611, lng: 175.790222 },
                { lat: -37.750000, lng: 145.116667 },
                { lat: -37.759859, lng: 145.128708 },
                { lat: -37.765015, lng: 145.133858 },
                { lat: -37.770104, lng: 145.143299 },
                { lat: -37.773700, lng: 145.145187 },
                { lat: -37.774785, lng: 145.137978 },
                { lat: -37.819616, lng: 144.968119 },
                { lat: -38.330766, lng: 144.695692 },
                { lat: -39.927193, lng: 175.053218 },
                { lat: -41.330162, lng: 174.865694 },
                { lat: -42.734358, lng: 147.439506 },
                { lat: -42.734358, lng: 147.501315 },
                { lat: -42.735258, lng: 147.438000 },
                { lat: -43.999792, lng: 170.463352 }
            ]

            var markers = locations.map(function (location, i) {
                return new google.maps.Marker({
                    position: location,
                });
            });

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

            console.log("markerCluster")
            console.log(markerCluster)
        }

    }

    togglePanorama = (e) => {
        this.props.toggleShowPanorama()
    }

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

