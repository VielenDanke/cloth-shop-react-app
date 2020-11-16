import React, {Component} from 'react'
import {connect} from 'react-redux'
import {categoryLoaded} from "../../actions"
import {Route, Link} from 'react-router-dom'
import ClothList from '../cloth-list'

class CategoryList extends Component {

    componentDidMount() {
        const {categoryLoaded, categoryService} = this.props

        categoryService.getAllCategories()
            .then(res => categoryLoaded(res))
    }

    render() {
        const {categories, clothService} = this.props

        return (
            <ul>
                {
                    categories.map(cat => {
                        return (
                            <li key={cat.id}>
                                <Route path={`/categories/${cat.category}`}>
                                    <ClothList fetchedClothList={clothService.getClothesByCategory(`${cat.category}`)}/>
                                </Route>
                                <Link to={`/categories/${cat.category}`}>{cat.category}</Link>
                            </li>
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