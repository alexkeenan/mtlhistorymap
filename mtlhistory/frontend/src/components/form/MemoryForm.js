import React, { Component, Fragment } from 'react'
import { getCategories, addMemory, getMemoryForm } from '../../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MemoryStreetView from './MemoryStreetView'

/*

glitchy mess, infinite loops, sometimes functions are recgonized, sometimes they're not

review component did update, and check code from leadmanager as well. 
https://reactjs.org/docs/react-component.html

*/


class MemoryForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.props.memoryFormVars.file
        console.log('handle uploading-', this.props.memoryFormVars.photo);
    }

    componentDidMount() {
        console.log("mounted")
        this.props.getCategories()
        this.props.getMemoryForm()


    }


    onChange(e) {
        e.preventDefault();

        let target = e.target
        let name = target.name
        let value = null

        if (name === "photo") {
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

        const {
            title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch, zoom,
            dateofmemory, category
        } = this.props.memoryFormVars

        const coordinates = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

        let { photoPreviewUrl } = this.props.memoryFormVars;
        let $photoPreview = null;

        if (photoPreviewUrl) {
            $photoPreview = (<img src={photoPreviewUrl} width="100%" height="100%" />);
        } else {
            $photoPreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (

            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h2>Add Memory</h2>
                    <div id="infoWindowContent">
                        <div id="memory">
                            {$photoPreview}
                        </div>

                        <MemoryStreetView coordinates={coordinates} />

                    </div >

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image</label>

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
                                value={this.props.memoryFormVars.address}
                            />
                        </div>
                        <div className="form-group">
                            <label>Longitude </label>
                            <input
                                className="form-control"
                                type="number"
                                name="longitude"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.longitude}
                            />
                        </div>
                        <div className="form-group">
                            <label>Latitude</label>
                            <input
                                className="form-control"
                                type="number"
                                name="latitude"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.latitude}
                            />
                        </div>
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                className="form-control"
                                type="number"
                                name="heading"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.heading}
                            />
                        </div>
                        <div className="form-group">
                            <label>Pitch</label>
                            <input
                                className="form-control"
                                type="number"
                                name="pitch"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.pitch}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Memory</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dateofmemory"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.dateofmemory}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="message"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.description}
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
            </Fragment >



        )
    }


}
const mapStateToProps = state => ({
    categories: state.memories.categories,
    user: state.auth.user,
    memoryFormVars: state.memories.memoryFormVars
})



export default connect(mapStateToProps, { getCategories, addMemory, getMemoryForm })(MemoryForm)
