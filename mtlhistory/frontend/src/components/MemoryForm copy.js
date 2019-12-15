import React, { Component, Fragment } from 'react'
import { getCategories, addMemory } from '../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//https://w3path.com/react-image-upload-or-file-upload-with-preview/

export class MemoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            photo: "",
            photoPreviewUrl: "",
            video: "",
            audio: "",
            address: "",
            longitude: -73.567244,
            latitude: 45.498223,
            heading: "",
            pitch: "",
            dateofmemory: "",
            owner: "",
            category: "",
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }



    componentDidMount() {
        console.log("mounted")
        this.props.getCategories()
        console.log(this.props.categories)
    }

    onChange = e => {
        e.preventDefault();
        let target = e.target
        let value = null

        if (target.name === "photo") {

            value = target.files[0]
        }
        else {
            value = target.value
        }

        let name = target.name
        this.setState({ [name]: value })

        if (target.name === "photo") {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    ...this.state,
                    photoPreviewUrl: reader.result
                });
            }
            console.log("value")
            console.log(value)
            reader.readAsDataURL(value)
        }

    }

    onSubmit = e => {
        e.preventDefault();
        const { title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, category } = this.state

        const user = this.props.user

        const memory = {
            title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, owner: owner, category
        };

        this.props.addMemory(memory);
        //might need a message saying memory was added
        this.setState({
            title: "",
            description: "",
            photo: "",
            video: "",
            audio: "",
            address: "",
            longitude: "",
            latitude: "",
            heading: "",
            pitch: "",
            dateofmemory: "",
            owner: "",
            category: "",
        });
    };


    /*
 
    onInfoWindowOpen(props, e) {
        var { lat, lng } = this.props.dashboard.selectedPlace.position
        const coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
 
        const markerId = this.props.dashboard.selectedPlace.id
 
        const photoSrc = this.props.memories[markerId].photo
        const content = (
            <div>
                <h3 > {this.props.dashboard.selectedPlace.name}</h3>
 
                <div id="infoWindowContent">
                    <div id="memory">
                        <img src={photoSrc} width="100%" height="100%"></img>
                    </div>
                    <div id="pano"></div>
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
                heading: 34, pitch: 10
            }
        });
 
        console.log(panorama)
 
        console.log('panorama.getPov()')
        console.log(panorama.getPov())
 
        console.log('panorama.getPosition()')
        console.log(panorama.getPosition())
 
        panorama.addListener('position_changed', function () {
            console.log(panorama.getPosition() + '')
        });
 
        panorama.addListener('pov_changed', function () {
            console.log('heading ' + panorama.getPov().heading + '')
            console.log('pitch ' + panorama.getPov().pitch + '')
            console.log('pitch ' + panorama.getPov().zoom + '')
        });
 
        */
    render() {
        const { title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, category } = this.state


        let $photoPreview = (<div className="previewText image-container">Please upload an old photo for Preview</div>);
        if (this.state.photoPreviewUrl) {
            $photoPreview = (<div className="image-container" ><img src={this.state.photoPreviewUrl} alt="icon" width="200" /> </div>)
        }


        return (
            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h2>Add Memory</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                onChange={this.onChange}
                                value={title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            {$photoPreview}

                            <div>

                                <img src={this.state.photoPreview}></img>

                            </div>
                            <div >
                                <input
                                    className="form-control"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={this.onChange}
                                    value={photo}
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                className="form-control"
                                type="text"
                                name="address"
                                onChange={this.onChange}
                                value={address}
                            />
                        </div>
                        <div className="form-group">
                            <label>Longitude </label>
                            <input
                                className="form-control"
                                type="number"
                                name="longitude"
                                onChange={this.onChange}
                                value={longitude}
                            />
                        </div>
                        <div className="form-group">
                            <label>Latitude</label>
                            <input
                                className="form-control"
                                type="number"
                                name="latitude"
                                onChange={this.onChange}
                                value={latitude}
                            />
                        </div>
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                className="form-control"
                                type="number"
                                name="heading"
                                onChange={this.onChange}
                                value={heading}
                            />
                        </div>
                        <div className="form-group">
                            <label>Pitch</label>
                            <input
                                className="form-control"
                                type="number"
                                name="pitch"
                                onChange={this.onChange}
                                value={pitch}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Memory</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dateofmemory"
                                onChange={this.onChange}
                                value={dateofmemory}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="message"
                                onChange={this.onChange}
                                value={description}
                            />
                        </div>

                        <div className="form-group">
                            {this.props.categories.map(category => {
                                <option name="categories" value={category}>{category}</option>
                            })}
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.memories.categories,
    user: state.auth.user
})

export default connect(mapStateToProps, { getCategories, addMemory })(MemoryForm)