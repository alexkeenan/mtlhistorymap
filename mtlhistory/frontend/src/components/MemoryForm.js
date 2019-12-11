import React, { Component } from 'react'

export default class MemoryForm extends Component {
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



    render() {
        const { title, description, photo, video, audio,
            address, longitude, latitude, heading, pitch,
            dateofmemory, owner, category } = this.state

        return (
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
                        <label>Category</label>
                        <input
                            className="form-control"
                            type="text"
                            name="message"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
            </button>
                    </div>
                </form>
            </div>
        )
    }
}
