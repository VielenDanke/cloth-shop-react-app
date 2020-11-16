import React, {Component} from 'react'
import {connect} from 'react-redux'
import {categoryLoaded} from "../../actions"

class CategoryList extends Component {

    componentDidMount() {
        const {categoryLoaded, categoryService} = this.props

        categoryService.getAllCategories()
            .then(res => categoryLoaded(res))
    }

    render() {
        const {categories} = this.props

        return (
            <ul>
                {
                    categories.map(cat => {
                        return (
                            <li key={cat.id}>{cat.category}</li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = {
    categoryLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)