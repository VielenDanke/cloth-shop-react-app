import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Spinner} from 'reactstrap'
import WithClothService from "../hoc"
import ClothItem from "../cloth-item"
import {connect} from 'react-redux'

import "./clothList.css"

class ClothList extends Component {

    state = {
        clothes: [],
        loading: true,
        filterHeight: '',
        filterAge: '',
        filterColor: '',
        clothesHeightFilter: [],
        clothesAgeFilter: [],
        clothesColorFilter: []
    }

    componentDidMount() {
        this.fetchClose()
    }

    componentDidUpdate(prevProps, prevState) {
        const {loading} = this.state

        if (this.props.pathVariable !== prevProps.pathVariable) {
            this.fetchClose()
        }
        if (loading) {
            this.fetchClose()
        }
    }

    fetchClose = () => {
        const {clothService, gender, category} = this.props

        clothService.getClothesByCategoryAndSex(gender, category)
            .then(res => {
                const lineSizes = res.flatMap(item => item.lineSizes)
                const uniquHeightArray = [...new Set(lineSizes.map(item => item.height))]
                const uniqueAgeArray = [...new Set(lineSizes.map(item => item.age))]
                const uniqueColorArray = [...new Set(res.map(item => item.color))]
                this.setState({
                    clothes: res, 
                    loading: false,
                    clothesHeightFilter: uniquHeightArray,
                    clothesAgeFilter: uniqueAgeArray,
                    clothesColorFilter: uniqueColorArray
                })
            })
    }

    onClothDelete = (id, event) => {
        event.preventDefault()

        const {clothService, token} = this.props
        const {clothes} = this.state

        clothService.performDeleteRequest(`/clothes/${id}`, {"accessToken": token})
            .then(res => {
                const itemIndex = clothes.findIndex(item => item.id === id)

                this.setState({
                    clothes: [
                        clothes.slice(0, itemIndex),
                        clothes.slice(itemIndex + 1)
                    ],
                    loading: true
                })
            })
    }

    handleHeightChangeFilter = (event) => {
        this.setState({
            filterHeight: event.target.value
        })
    }

    handleAgeChangeFilter = (event) => {
        this.setState({
            filterAge: event.target.value
        })
    }

    searchCloth = (event) => {
        event.preventDefault()

        const {clothService, gender, category} = this.props
        const {filterAge, filterHeight, filterColor} = this.state

        let searchingObject = {
            gender: gender.toLowerCase(),
            category: category.toLowerCase()
        }

        if (filterHeight !== "all" && filterHeight !== "") {
            searchingObject = {
                ...searchingObject,
                height: filterHeight
            }
        }
        if (filterAge !== "all" && filterAge !== "") {
            searchingObject = {
                ...searchingObject,
                age: Number.parseInt(filterAge)
            }
        }
        if (filterColor !== "all" && filterColor !== "") {
            searchingObject = {
                ...searchingObject,
                color: filterColor.toLowerCase()
            }
        }
        clothService.performRequest(
                "POST", 
                {"Content-Type":"application/json"}, 
                searchingObject
            ).then(res => {
                this.setState({clothes: res})
            })
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }
    
    render() {
        const {clothes, loading, clothesHeightFilter, clothesAgeFilter, clothesColorFilter} = this.state

        const renderedUniqueHeightList = clothesHeightFilter.map(item => {
            return (
                <option value={item}>{item}</option>
            )
        })

        const renderedUniqueAgeList = clothesAgeFilter.map(item => {
            return (
                <option value={item}>{item}</option>
            )
        })

        const renderedUniqueColorList = clothesColorFilter.map(item => {
            return (
                <option value={item}>{item}</option>
            )
        })

        if (loading) {
            return <Spinner className="spinner__cloth-list"/>
        }
        const renderClothList = clothes.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <ClothItem clothItem={item} onClothDelete={this.onClothDelete}/>
                </ListGroupItem>
            )
        })
        return (
            <div>
                <div>
                    <label>
                        Height filter
                        <select value={this.state.filterHeight} onChange={this.handleHeightChangeFilter}>
                            <option value="all">All</option>
                            {renderedUniqueHeightList}
                        </select>
                    </label>
                    <label>
                        Age filter
                        <select value={this.state.filterAge} onChange={this.handleAgeChangeFilter}>
                            <option value="all">All</option>
                            {renderedUniqueAgeList}
                        </select>
                    </label>
                    <label>
                        Color to find
                        <select value={this.state.filterColor} onChange={this.handleColorChangeFilter}>
                            <option value="all">All</option>
                            {renderedUniqueColorList}
                        </select>
                    </label>
                    <form onSubmit={this.searchCloth}>
                        <button type="submit">Search</button>
                    </form>
                </div>
                <ListGroup>
                    {renderClothList}
                </ListGroup>
            </div>       
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default WithClothService()(connect(mapStateToProps)(ClothList))
