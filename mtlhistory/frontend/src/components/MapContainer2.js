import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const options = {

}

export default class MapContainer extends Component {
    render() {
        const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: 'AIzaSyBMNy2d4VK0AWVfUSDYe3luvrFykVhNsZk'// ,

        })

        return (
            <GoogleMap>

            </GoogleMap>
        )
    }
}
