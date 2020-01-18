import React, { Component, Fragment, useEffect, useState, useRef } from 'react'

import { Marker } from 'google-maps-react';

class MapMarkers extends Component {

    render() {
        return (
            <>
                {this.props.memories.map((memory, id) => (
                    <Marker ref={target} key={id} id={id} position={{
                        lat: parseFloat(memory.latitude),
                        lng: parseFloat(memory.longitude)
                    }}
                        onClick={() => setShow(!show)} />
                ))}
            </>
        )
    }
}

export default MapMarkers;