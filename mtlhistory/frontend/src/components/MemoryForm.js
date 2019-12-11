import React, { Component, Fragment } from 'react'
import { getCategories, addMemory } from '../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class MemoryForm extends Component {
    state = {
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
    }


    componentDidMount() {
        console.log("mounted")
        this.props.getCategories()
        console.log(this.props.categories)
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

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
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            className="form-control"
                            type="text"
                            name="message"
                            onChange={this.onChange}
                            value={description}
                        />

                        <select multiple>
                            {categories_list}
                        </select>

                    </div>
    */


    render() {
        const { title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, category } = this.state


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
                            <input
                                className="form-control"
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={this.onChange}
                                value={photo}
                            />
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