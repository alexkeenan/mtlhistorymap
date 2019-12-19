import React, { Component } from 'react'
import { getMemoryForm, updateMemoryForm } from '../../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class MemoryStreetView extends Component {
    constructor(props) {
        super(props)
        this.panDiv = React.createRef();
        this.mapChange = this.mapChange.bind(this);

    }

    //I never want google maps to rerender

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.memoryFormVars.counter == 0) {
            //console.log("counter ==0")
            //console.log("this.props.memoryFormVars.counter")
            //console.log(this.props.memoryFormVars.counter)
            return true
        }
        else {
            //console.log("counter !=0")
            //console.log("this.props.memoryFormVars.counter")
            //console.log(this.props.memoryFormVars.counter)
            return false;
        }
    }

    componentDidMount() {
        console.log("memory street view mounting")
        //console.log("this.props.memoryFormVars.counter")
        //console.log(this.props.memoryFormVars.counter)
        var oldcounter = this.props.memoryFormVars.counter
        this.props.updateMemoryForm({
            ...this.props.memoryFormVars,
            counter: oldcounter + 1
        })
    }

    mapChange = panorama => {
        var lat = panorama.getPosition().lat()
        var lng = panorama.getPosition().lng()
        var heading = panorama.getPov().heading
        var pitch = panorama.getPov().pitch
        var zoom = panorama.getPov().zoom



        console.log("before state change")
        console.log(this.props.memoryFormVars)


        this.props.updateMemoryForm({
            ...this.props.memoryFormVars,
            latitude: lat,
            longitude: lng,
            heading: heading,
            pitch: pitch,
            zoom: zoom
        })

    }




    render() {

        const coordinates = { lat: parseFloat(this.props.memoryFormVars.latitude), lng: parseFloat(this.props.memoryFormVars.longitude) };

        const panorama = new window.google.maps.StreetViewPanorama(
            this.panDiv.current,
            //document.getElementById('pano'), 
            {
                position: coordinates,

                pov: {
                    heading: this.props.memoryFormVars.heading,
                    pitch: this.props.memoryFormVars.pitch,
                    zoom: this.props.memoryFormVars.zoom
                },

                //position_changed: console.log("changed position")
            });


        panorama.addListener('position_changed', () => {

            console.log("pos listener firing")

            var lat = panorama.getPosition().lat()
            var lng = panorama.getPosition().lng()
            var heading = panorama.getPov().heading
            var pitch = panorama.getPov().pitch
            var zoom = panorama.getPov().zoom

            if (lat !== this.props.memoryFormVars.latitude ||
                lng !== this.props.memoryFormVars.longitude ||
                heading !== this.props.memoryFormVars.heading ||
                pitch !== this.props.memoryFormVars.pitch
                //|| zoom !== this.props.memoryFormVars.zoom

            ) {


                console.log("detected a real POS change")
                console.log("lat : " + lat + " state.lat " + this.props.memoryFormVars.latitude)
                console.log("lng : " + lng + " state.longitude " + this.props.memoryFormVars.longitude)
                console.log("heading : " + heading + " state.heading " + this.props.memoryFormVars.heading)
                console.log("pitch : " + pitch + " state.pitch " + this.props.memoryFormVars.pitch)
                console.log("zoom : " + zoom + " state.zoom " + this.props.memoryFormVars.zoom)


                console.log("counter :" + this.props.memoryFormVars.counter)
                if (this.props.memoryFormVars.counter < 5) {
                    this.mapChange(panorama)
                    console.log("state after")
                    console.log(this.props.memoryFormVars)
                }
                else {
                    console.log("prevented infinite loop")
                }


            }
            else {
                console.log("PREVENTED unnecessary change")
            }

        });

        panorama.addListener('pov_changed', () => {
            console.log("POV listener firing")

            var lat = panorama.getPosition().lat()
            var lng = panorama.getPosition().lng()
            var heading = panorama.getPov().heading
            var pitch = panorama.getPov().pitch
            var zoom = panorama.getPov().zoom

            if (lat !== this.props.memoryFormVars.latitude ||
                lng !== this.props.memoryFormVars.longitude ||
                heading !== this.props.memoryFormVars.heading ||
                pitch !== this.props.memoryFormVars.pitch
                //||zoom !== this.props.memoryFormVars.zoom
            ) {


                console.log("detected a real POV change")
                console.log("lat : " + lat + " state.lat " + this.props.memoryFormVars.latitude)
                console.log("lng : " + lng + " state.longitude " + this.props.memoryFormVars.longitude)
                console.log("heading : " + heading + " state.heading " + this.props.memoryFormVars.heading)
                console.log("pitch : " + pitch + " state.pitch " + this.props.memoryFormVars.pitch)
                console.log("zoom : " + zoom + " state.zoom " + this.props.memoryFormVars.zoom)


                console.log("counter :" + this.props.memoryFormVars.counter)
                if (this.props.memoryFormVars.counter < 5) {
                    this.mapChange(panorama)

                    console.log("state after")
                    console.log(this.props.memoryFormVars)

                }
                else {
                    console.log("prevented infinite loop")
                }
            }
            else {
                console.log("PREVENTED unnecessary change")
            }
        });


        return (

            <div id="pano" ref={this.panDiv}></div>

        )
    }
}

const mapStateToProps = state => ({
    memoryFormVars: state.memories.memoryFormVars
})


export default connect(mapStateToProps, { getMemoryForm, updateMemoryForm })(MemoryStreetView)

