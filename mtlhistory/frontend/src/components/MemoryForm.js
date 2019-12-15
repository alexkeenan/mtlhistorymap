import React, { Component, Fragment } from 'react'
import { getCategories, addMemory } from '../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MemoryForm extends React.Component {
    constructor(props) {
        super(props);
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
        };

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    onSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.photo);
    }

    componentDidMount() {
        console.log("mounted")
        this.props.getCategories()
        console.log(this.props.categories)
    }

    onChange(e) {
        e.preventDefault();

        let target = e.target
        let name = target.name
        let value = null

        console.log("target")
        console.log(target)

        console.log("name")
        console.log(name)


        if (name === "photo") {
            console.log("name")
            value = target.files[0]
        }
        else {
            value = target.value
        }

        this.setState({ [name]: value })

        if (name === "photo") {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    photoPreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(value)
        }
    }

    render() {

        console.log('this.state.photo')
        console.log(this.state.photo)

        const { title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, category } = this.state

        let { photoPreviewUrl } = this.state;
        let $photoPreview = null;

        if (photoPreviewUrl) {
            $photoPreview = (<img src={photoPreviewUrl} />);
        } else {
            $photoPreview = (<div className="previewText">Please select an Image for Preview</div>);
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

                            <div className="imgPreview">
                                {$photoPreview}
                            </div>
                            <div >
                                <input
                                    className="form-control"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={this.onChange}
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
