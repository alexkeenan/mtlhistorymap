import React, { Component, Fragment } from 'react'
import { FixedSizeList } from 'react-window';
//once the memories are in the state, you can decided which ones are visible with this little form
import { connect } from 'react-redux'

import { getCategories, filterMemories, checkUncheckCategory } from '../actions/memories'

export class MemoryFilter extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            filters: []
        })
    }

    componentDidMount() {
        this.props.getCategories()


    }

    handleChange = (e) => {


        //if it's already there meaning we had unchecked it already, and now we've called it again, it's because we want to remove it from the filters. Unchecked ->
        if (this.state.filters.indexOf(e.target.name) >= 0) {
            var newFilters = this.state.filters.filter((name, index, array) => name != e.target.name)

        }
        //if we detect a click and it's not in our filters, than we're adding the filter to the list
        else {
            var newFilters = [...this.state.filters, e.target.name]
        }

        this.setState({ filters: newFilters })
        console.log("newFilters", newFilters)
        this.props.filterMemories(newFilters)

        this.props.checkUncheckCategory(e.target.name)

    }

    // Filters are all checked by default. When you click and remove the check, you are hiding them


    render() {


        // console.log("this.props.categories", this.props.categories)
        // console.log("this.props.categories TYPE", typeof this.props.categories)



        const Checkbox = props => (
            <input type="checkbox" {...props} />
        )




        // You cannot do a map of objects
        //https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays



        // < FixedSizeList
        //     height={75}
        //     itemCount={1000}
        //     itemSize={100}
        //     layout="vertical"
        //     width={300}
        // >

        //     {filtercheckboxes}

        // </FixedSizeList >

        // console.log("Object.keys(this.props.categories)")
        // console.log(Object.keys(this.props.categories))

        // console.log("Object.keys(this.props.categories).length")
        // console.log(Object.keys(this.props.categories).length)



        if (Object.keys(this.props.categories).length > 0) {
            return (
                <div className="mapfilter" >

                    {Object.keys(this.props.categories).map((key, index) => {

                        var each_category = this.props.categories[key]


                        return (
                            < div key={each_category.id} >
                                <Checkbox type="checkbox" id={each_category.id} key={each_category.id} name={each_category.category}
                                    onChange={this.handleChange} checked={each_category.checked}
                                />
                                <label >{each_category.category}</label>
                            </div >
                        )

                    })}

                </div>
            )
        }
        else {
            return null
        }

    }
}


const mapStateToProps = state => ({
    categories: state.memories.categories,
})

export default connect(mapStateToProps, {
    getCategories, filterMemories, checkUncheckCategory
})(MemoryFilter)