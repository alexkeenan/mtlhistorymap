import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div className="container">
                <br />
                My name is Alex Keenan, I'm a full stack developer with a background in data science.
        I always found it interesting to see how our neighbourhoods changed and the people along with it.
                For now I intend to just show side by side images of buildings, but in the future I'd like to bring in timelines, sound effects and maybe even music into the mix.
                This site was made with react.js and redux in the front-end with a django-REST-API in the backend. The site itself is hosted on aws.

                Feel free to contact me at alex.y.keenan@gmail.com should you have any questions.

                Cheers!
            </div >
        )
    }
}
