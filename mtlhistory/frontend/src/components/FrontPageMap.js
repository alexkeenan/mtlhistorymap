import React, { Component, Fragment } from 'react'
import { setLatLng } from '../actions/dashboard'
import { connect } from 'react-redux'
import { getGoogleAPI, getCluster, setMap } from '../actions/dashboard'
import {
    toggleInfoWindow, toggleShowPanorama, setActiveMarker, setSelectedPlace
} from '../actions/dashboard'

//https://developers.google.com/maps/documentation/javascript/marker-clustering
//https://engineering.universe.com/building-a-google-map-in-react-b103b4ee97f1
//https://medium.com/p/b103b4ee97f1/responses/show

export class FrontPageMap extends Component {
    constructor(props) {
        super(props)
        this.googleMapRef = React.createRef();
    }


    createGoogleMap = () => {

        return new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 8,
            center: {
                lat: 45.5017,
                lng: - 73.58781
            }
        });
    }



    componentDidMount() {

        //even though google-map-react loads the api for its needs, I will need to use it directly
        //and need to know when it's finished loading
        if (!this.props.dashboard.googleApiLoaded) {
            this.props.getGoogleAPI()
        }


        if (!this.props.dashboard.clustersLoaded) {
            this.props.getCluster()
        }


    }

    componentDidUpdate() {
        if (!this.props.dashboard.mapSet && this.props.dashboard.googleApiLoaded) {
            this.googleMap = this.createGoogleMap();
            this.props.setMap(this.googleMap)
        }
    }



    render() {

        return (
            <Fragment>
                <div id="frontpagemap" ref={this.googleMapRef}>

                </div>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    mapSet: state.dashboard.mapSet
})


export default connect(mapStateToProps, {
    setLatLng, getGoogleAPI, getCluster, setMap, toggleInfoWindow
})(FrontPageMap)


