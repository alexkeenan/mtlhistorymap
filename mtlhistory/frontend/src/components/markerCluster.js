import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//https://github.com/fullstackreact/google-maps-react/issues/31

const markerCluster = (props) => {
    const { map, google, markers, click } = props

    useEffect(() => {

        if (map && markers) {

            var mapMarkers = markers.map((memory, index) => {


                const entry = new google.maps.Marker({
                    markerposition: {
                        lat: memory.latitude,
                        lng: memory.longitude
                    },
                    position: {
                        lat: memory.latitude,
                        lng: memory.longitude
                    },
                    name: memory.title,
                    address: memory.camera_address,
                    key: index,
                    id: index,
                    pov: {
                        heading: memory.heading,
                        pitch: memory.pitch
                    },
                    zoom: memory.zoom,
                })

                //http://www.howtocreate.co.uk/referencedvariables.html
                //https://stackoverflow.com/questions/373157/how-can-i-pass-a-reference-to-a-function-with-parameters
                //https://javascript.info/currying-partials

                entry.addListener("click", () => {
                    click(entry)
                })

                return entry
            })

            const clusterer = new MarkerClusterer(map, mapMarkers, { imagePath: 'https://mtlhistory-files.s3.amazonaws.com/media/mapicons/m' })

            return () => {
                //console.log('Cleaning up markers')
                clusterer.clearMarkers()
            }
        }
    }, [map, google, markers])

    return (null)

}


export default markerCluster
