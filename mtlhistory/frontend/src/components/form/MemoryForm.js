import React, { Component, Fragment } from 'react'
import { getCategories, addMemory, getMemoryForm, updateMemoryForm } from '../../actions/memories'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MemoryStreetView from './MemoryStreetView'

import { Redirect } from 'react-router-dom'

/*

glitchy mess, infinite loops, sometimes functions are recgonized, sometimes they're not

review component did update, and check code from leadmanager as well. 
https://reactjs.org/docs/react-component.html

uploading images
https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833

you might have to setup another serializer just for the media stuff 
https://www.techiediaries.com/django-rest-image-file-upload-tutorial/



*/


class MemoryForm extends React.Component {


    onSubmit = e => {
        e.preventDefault();

        console.log("SUBMITTING")

        var camera_address = document.getElementById('camera_address').value

        const { title, description, photo, video, audio, old_address, longitude, latitude, heading, pitch, zoom, dateofmemory, owner, category } = this.props.memoryFormVars
        var memory = { title, description, camera_address, old_address, longitude, latitude, heading, pitch, zoom, dateofmemory, owner, category }


        //only add if user added it. These variables are not required. Even if I state them in the django model as not required, I still get problems for some reason

        photo !== null ? memory = { ...memory, photo } : null
        video !== null ? memory = { ...memory, video } : null
        audio !== null ? memory = { ...memory, audio } : null
        dateofmemory !== null ? memory = { ...memory, dateofmemory } : null

        console.log("memory SUBMITTED")
        console.log(memory)

        this.props.addMemory(memory)

        var resettedMemoryForm = {}
        Object.keys(this.props.memoryFormVars).map(key => {

            //I don't want to reset these, causes problems
            if (['map', 'panorama', 'category'].includes(key)) {
                resettedMemoryForm[key] = this.props.memoryFormVars[key]
            }
            else {
                resettedMemoryForm[key] = ""
            }

        })

        this.props.updateMemoryForm({
            ...resettedMemoryForm

        })
        /*
        */

    }
    onChange = e => {
        e.preventDefault();
        let target = e.target
        let name = target.name
        let value = null

        if (name === "photo") {
            value = target.files[0]
            let reader = new FileReader();

            reader.onloadend = () => {
                console.log("reader load ended")
                let photoPreviewUrl = reader.result

                this.props.updateMemoryForm({
                    ...this.props.memoryFormVars,
                    [name]: value,
                    photoPreviewUrl
                })
            }
            reader.readAsDataURL(value)

        }

        else {

            if (name === "category") {
                value = [...target.options].filter(o => o.selected).map(o => o.id)
            }

            else {
                if (name !== "camera_address") {
                    value = target.value
                }
            }

            this.props.updateMemoryForm({
                ...this.props.memoryFormVars,
                [name]: value
            })
        }

    }

    componentDidUpdate = () => {

        if (this.props.memoryFormVars.searchBox === "") {

            var searchBox = new google.maps.places.SearchBox(document.getElementById('camera_address'));
            var map = this.props.memoryFormVars.map
            var pano = this.props.memoryFormVars.panorama
            console.log("pano on update")
            console.log(pano)
            var pano_address = ""

            google.maps.event.addListener(searchBox, 'places_changed', () => {

                var place = searchBox.getPlaces()[0]

                if (!place.geometry) return;

                map.setCenter(place.geometry.location);
                pano.setPosition(place.geometry.location);
                map.setZoom(14);

            });

            this.props.updateMemoryForm({
                ...this.props.memoryFormVars,
                searchBox: searchBox

            })

            console.log("searchBox after first update")
            console.log(searchBox)


            google.maps.event.addListener(pano, 'position_changed', () => {

                //sketchy way of getting pano's address, did not find any other way online

                //there are at least two ways of it showing up. checking if method 1 is the case
                var short_address = document.getElementsByClassName("gm-iv-short-address-description")[0];

                if (typeof (short_address) != 'undefined' && short_address != null) {
                    var long_address = document.getElementsByClassName("gm-iv-long-address-description")[0].innerHTML
                    pano_address = short_address.innerHTML

                    if (long_address.trim().length > 0) {
                        pano_address += ", " + long_address
                    }


                }

                //method 2 if method 1 doesn't exist
                else {
                    var pano_address = document.getElementsByClassName("gm-iv-profile-link")[0].innerHTML
                }

                document.getElementById('camera_address').value = pano_address


            });

            google.maps.event.addListener(pano, 'pov_changed', () => {

                //sketchy way of getting pano's address, did not find any other way online

                var short_address = document.getElementsByClassName("gm-iv-short-address-description")[0];

                if (typeof (short_address) != 'undefined' && short_address != null) {

                    var long_address = document.getElementsByClassName("gm-iv-long-address-description")[0].innerHTML
                    pano_address = short_address.innerHTML

                    if (long_address.trim().length > 0) {

                        pano_address += ", " + long_address
                    }
                }

                //method 2 if method 1 doesn't exist
                else {

                    var pano_address = document.getElementsByClassName("gm-iv-profile-link")[0].innerHTML
                }

                document.getElementById('camera_address').value = pano_address





            });




        }

    }



    componentDidMount() {
        this.props.getMemoryForm()

        this.props.getCategories()
        console.log("memoryform mounting")


        var pano = this.props.memoryFormVars.panorama
        console.log("pano at the beginning")
        console.log(pano)


    }



    render() {


        //needed to use photoPreviewUrl2 because if I used photoPreviewUrl I would get an error saying I defined this thing twice
        let photoPreviewUrl2 = this.props.memoryFormVars.photoPreviewUrl;
        let $photoPreview = null;

        if (photoPreviewUrl2) {
            $photoPreview = (<img src={photoPreviewUrl2} width="100%" height="100%" />);
        } else {
            $photoPreview = (<div className="inputImagePlaceholder" >Please select an image for preview</div>);
        }

        //background image for input image placeholder
        var backgroundImageUrl = "/static/frontend/img/camera_logo.png'"
        const placeholderstyle = {
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundColor: "grey",
            color: "white",
        };


        return (

            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h2>Add Memory</h2>
                    <div id="infoWindowContent_input">
                        <MemoryStreetView />
                        <div id="memory_input" style={placeholderstyle}>
                            {$photoPreview}
                        </div>

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
                            <label>"Camera" Address (Address according to google maps)</label>
                            <input
                                className="form-control"
                                id="camera_address"
                                type="text"
                                name="camera_address"
                                onChange={this.onChange}
                            >

                            </input>
                        </div>
                        <div className="form-group">
                            <label>Address of memory (Address at the time)</label>
                            <input
                                className="form-control"
                                id="old_address"
                                type="text"
                                name="old_address"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.old_address}
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
                                name="description"
                                onChange={this.onChange}
                                value={this.props.memoryFormVars.description}
                            />
                        </div>

                        <div className="form-group">
                            <label>Memory Category</label>
                            <select multiple required name="categories" className="form-control"
                                type="text"
                                name="category"
                                onChange={this.onChange}>
                                {this.props.categories.map(each_category => (
                                    < option name="categories" id={each_category.id} value={each_category.category} > {each_category.category}</option>
                                ))}
                            </select>
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
    memoryFormVars: state.memories.memoryFormVars,
    memories: state.memories
})



export default connect(mapStateToProps, { getCategories, addMemory, getMemoryForm, updateMemoryForm })(MemoryForm)







