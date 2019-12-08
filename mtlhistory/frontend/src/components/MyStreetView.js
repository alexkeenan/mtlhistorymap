
import React, { Component, Fragment } from 'react'

class MyStreetView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapIsReady: false,
        };
    }

    //answer to google maps in react
    //https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

    componentDidMount() {

        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk";
        script.async = true;
        script.addEventListener('load', () => {
            this.setState({ mapIsReady: true })
        })
        document.body.appendChild(script);

    }

    componentDidUpdate() {
        console.log("UPDATED")
        if (this.state.mapIsReady) {

            // Display the map
            //this.fenway = { lat: 42.345573, lng: -71.098326 };
            //this.map = new window.google.maps.Map(document.getElementById('map'), { center: { lat: -34.397, lng: 150.644 },zoom: 12,mapTypeId: 'roadmap',});

            this.panorama = new window.google.maps.StreetViewPanorama(document.getElementById('pano'), {
                position: this.fenway, pov: {
                    heading: 34, pitch: 10
                }
            });
            // You also can add markers on the map below
        }
    }


    render() {

        return (
            <div>
                <div id="pano"></div>
            </div>

        )

    }

}



export default MyStreetView